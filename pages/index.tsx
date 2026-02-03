import { useState, useEffect, useCallback } from 'react';
import { ethers, ContractFactory, BrowserProvider, JsonRpcSigner } from 'ethers';
import { TEMPO_CHAIN, generateUniqueName, generateUniqueSymbol, SIMPLE_NFT_BYTECODE, SIMPLE_TOKEN_BYTECODE } from '@/lib/contracts';

type ContractType = 'nft' | 'token';

interface Transaction {
  hash: string;
  address: string;
  name: string;
  type: ContractType;
  status: 'pending' | 'confirmed' | 'failed';
}

// Simple contract ABIs for deployment
const SIMPLE_ABI = ['constructor(string name, string symbol)'];

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string>('');
  const [chainId, setChainId] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<ContractType>('nft');
  const [contractCount, setContractCount] = useState<number>(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [currentDeploy, setCurrentDeploy] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');

  const isCorrectChain = chainId === TEMPO_CHAIN.chainId;

  // Auto-connect wallet on mount
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const web3Provider = new BrowserProvider((window as any).ethereum);
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            const web3Signer = await web3Provider.getSigner();
            const addr = await web3Signer.getAddress();
            const network = await web3Provider.getNetwork();
            
            setProvider(web3Provider);
            setSigner(web3Signer);
            setAddress(addr);
            setChainId(Number(network.chainId));
          } else {
            // Prompt connection
            connectWallet();
          }
        } catch (err) {
          console.error('Auto-connect failed:', err);
          connectWallet();
        }
      }
    };
    
    autoConnect();
  }, []);

  // Listen for account/chain changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress('');
          setSigner(null);
        }
      };
      
      const handleChainChanged = () => {
        window.location.reload();
      };
      
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setError('Please install MetaMask or Rabby wallet');
      return;
    }
    
    setIsConnecting(true);
    setError('');
    
    try {
      const ethereum = (window as any).ethereum;
      await ethereum.request({ method: 'eth_requestAccounts' });
      
      const web3Provider = new BrowserProvider(ethereum);
      const web3Signer = await web3Provider.getSigner();
      const addr = await web3Signer.getAddress();
      const network = await web3Provider.getNetwork();
      
      setProvider(web3Provider);
      setSigner(web3Signer);
      setAddress(addr);
      setChainId(Number(network.chainId));
      
      // Try to switch to Tempo network
      if (Number(network.chainId) !== TEMPO_CHAIN.chainId) {
        await switchToTempo();
      }
    } catch (err: any) {
      console.error('Connect error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const switchToTempo = async () => {
    if (!(window as any).ethereum) return;
    
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: TEMPO_CHAIN.chainIdHex }],
      });
    } catch (switchError: any) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: TEMPO_CHAIN.chainIdHex,
              chainName: TEMPO_CHAIN.name,
              nativeCurrency: TEMPO_CHAIN.currency,
              rpcUrls: [TEMPO_CHAIN.rpcUrl],
              blockExplorerUrls: [TEMPO_CHAIN.explorer],
            }],
          });
        } catch (addError: any) {
          setError('Failed to add Tempo network: ' + addError.message);
        }
      } else {
        setError('Failed to switch network: ' + switchError.message);
      }
    }
  };

  const deployContracts = async () => {
    if (!signer || !isCorrectChain) {
      setError('Please connect wallet and switch to Tempo network');
      return;
    }
    
    setIsDeploying(true);
    setError('');
    setCurrentDeploy(0);
    
    const bytecode = activeTab === 'nft' ? SIMPLE_NFT_BYTECODE : SIMPLE_TOKEN_BYTECODE;
    
    for (let i = 0; i < contractCount; i++) {
      setCurrentDeploy(i + 1);
      
      const name = generateUniqueName(i + 1);
      const symbol = generateUniqueSymbol(i + 1);
      
      try {
        // Create contract factory
        const factory = new ContractFactory(SIMPLE_ABI, bytecode, signer);
        
        // Deploy - this will prompt Rabby for approval
        const contract = await factory.deploy(name, symbol);
        
        const tx: Transaction = {
          hash: contract.deploymentTransaction()?.hash || '',
          address: '',
          name: `${name} (${symbol})`,
          type: activeTab,
          status: 'pending'
        };
        
        setTransactions(prev => [tx, ...prev]);
        
        // Wait for deployment
        await contract.waitForDeployment();
        const deployedAddress = await contract.getAddress();
        
        // Update transaction with deployed address
        setTransactions(prev => prev.map(t => 
          t.hash === tx.hash 
            ? { ...t, address: deployedAddress, status: 'confirmed' as const }
            : t
        ));
        
      } catch (err: any) {
        console.error(`Deploy ${i + 1} failed:`, err);
        
        // Check if user rejected
        if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
          setError('User rejected transaction');
          break;
        }
        
        setTransactions(prev => [{
          hash: '',
          address: '',
          name: `${name} (${symbol})`,
          type: activeTab,
          status: 'failed'
        }, ...prev]);
      }
    }
    
    setIsDeploying(false);
    setCurrentDeploy(0);
  };

  const completedCount = transactions.filter(t => t.status === 'confirmed').length;
  
  const openExplorer = (hash: string) => {
    window.open(`${TEMPO_CHAIN.explorer}/tx/${hash}`, '_blank');
  };
  
  const openAddressExplorer = () => {
    if (address) {
      window.open(`${TEMPO_CHAIN.explorer}/address/${address}`, '_blank');
    }
  };

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Tempo Contract Deployer
            </h1>
            <p className="text-gray-400 mt-1">Deploy NFT & Token contracts on Tempo Moderato</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Explorer Tab */}
            {address && (
              <button
                onClick={openAddressExplorer}
                className="px-4 py-2 rounded-lg bg-tempo-card border border-tempo-border hover:border-tempo-primary transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Explorer
              </button>
            )}
            
            {/* Wallet Button */}
            {address ? (
              <div className="flex items-center gap-2">
                {!isCorrectChain && (
                  <button
                    onClick={switchToTempo}
                    className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30 transition-all"
                  >
                    Switch Network
                  </button>
                )}
                <div className="px-4 py-2 rounded-lg glass-card flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isCorrectChain ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  <span className="font-mono text-sm">{shortAddress}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <div className="spinner" />
                    Connecting...
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Faucet Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <a
          href="https://docs.tempo.xyz/quickstart/faucet"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full p-3 rounded-lg bg-gradient-to-r from-tempo-primary/10 to-tempo-secondary/10 border border-tempo-primary/30 hover:border-tempo-primary/60 transition-all text-center"
        >
          <span className="text-tempo-primary">💧 Need testnet funds?</span>
          <span className="text-gray-300 ml-2">Get USD from the Tempo Faucet →</span>
        </a>
      </div>
      
      {/* Main Card */}
      <main className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-tempo-border">
            <button
              onClick={() => setActiveTab('nft')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'nft' ? 'tab-active text-tempo-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">🖼️</span> NFT Section
            </button>
            <button
              onClick={() => setActiveTab('token')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'token' ? 'tab-active text-tempo-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">🪙</span> Token Section
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Contract Count Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Number of {activeTab === 'nft' ? 'NFT' : 'Token'} contracts to deploy (1-100)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={contractCount}
                  onChange={(e) => setContractCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="input-field w-32 px-4 py-3 rounded-lg text-center text-xl font-mono"
                />
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={contractCount}
                  onChange={(e) => setContractCount(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-tempo-card rounded-lg appearance-none cursor-pointer accent-tempo-primary"
                />
              </div>
            </div>
            
            {/* Deploy Info */}
            <div className="mb-6 p-4 rounded-lg bg-tempo-darker border border-tempo-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Contract Type:</span>
                <span className="text-white font-semibold">
                  {activeTab === 'nft' ? 'ERC-721 NFT' : 'ERC-20 Token'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Contracts to Deploy:</span>
                <span className="text-tempo-primary font-semibold">{contractCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Network:</span>
                <span className="text-white font-semibold">Tempo Moderato (Chain ID: 42431)</span>
              </div>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                {error}
              </div>
            )}
            
            {/* Deploy Button */}
            <button
              onClick={deployContracts}
              disabled={!address || !isCorrectChain || isDeploying}
              className="btn-primary w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3"
            >
              {isDeploying ? (
                <>
                  <div className="spinner" />
                  Deploying {currentDeploy} of {contractCount}...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Deploy {contractCount} {activeTab === 'nft' ? 'NFT' : 'Token'} Contract{contractCount > 1 ? 's' : ''}
                </>
              )}
            </button>
            
            <p className="text-center text-gray-500 text-sm mt-3">
              Each contract requires manual approval in your wallet
            </p>
          </div>
        </div>
        
        {/* Transaction History */}
        {transactions.length > 0 && (
          <div className="mt-6 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Deployment History</h2>
              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                ✓ {completedCount} Completed
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {transactions.map((tx, i) => (
                <div key={i} className="tx-item p-4 rounded-lg bg-tempo-darker border border-tempo-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tx.type === 'nft' ? '🖼️' : '🪙'}</span>
                    <div>
                      <p className="font-semibold text-white">{tx.name}</p>
                      {tx.address && (
                        <p className="text-xs text-gray-400 font-mono">{tx.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {tx.status === 'pending' && (
                      <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">
                        Pending...
                      </span>
                    )}
                    {tx.status === 'confirmed' && (
                      <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                        ✓ Confirmed
                      </span>
                    )}
                    {tx.status === 'failed' && (
                      <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">
                        ✗ Failed
                      </span>
                    )}
                    {tx.hash && (
                      <button
                        onClick={() => openExplorer(tx.hash)}
                        className="text-tempo-primary hover:text-white transition-colors"
                        title="View on Explorer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer / Credit */}
        <div className="mt-12 text-center">
          <a
            href="https://t.me/thomas_young"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <p className="text-lg font-semibold gradient-text group-hover:opacity-80 transition-opacity">
              BUILT BY THOMAS YOUNG
            </p>
            <p className="text-sm text-gray-500 mt-1">Click to connect on Telegram</p>
          </a>
        </div>
        
        {/* Network Info */}
        <div className="mt-8 text-center text-xs text-gray-600">
          <p>Tempo Moderato Testnet • Chain ID: 42431 • RPC: rpc.moderato.tempo.xyz</p>
        </div>
      </main>
    </div>
  );
}
