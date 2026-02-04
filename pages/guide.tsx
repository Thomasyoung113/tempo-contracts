import { useState } from 'react';
import Link from 'next/link';

type Section = 'getting-started' | 'wallet' | 'faucet' | 'deploying' | 'contracts' | 'tempo' | 'faq' | 'troubleshooting';

export default function Guide() {
  const [activeSection, setActiveSection] = useState<Section>('getting-started');

  const sections: { id: Section; title: string; icon: string }[] = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'wallet', title: 'Wallet Setup', icon: '👛' },
    { id: 'faucet', title: 'Getting Testnet USD', icon: '💧' },
    { id: 'deploying', title: 'Deploying Contracts', icon: '📜' },
    { id: 'contracts', title: 'Understanding Contracts', icon: '🔧' },
    { id: 'tempo', title: 'About Tempo', icon: '⚡' },
    { id: 'faq', title: 'FAQ', icon: '❓' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-tempo-border bg-tempo-darker/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">⬅️</span>
            <div>
              <h1 className="text-xl font-bold gradient-text">Tempo Contract Deployer</h1>
              <p className="text-xs text-gray-400">Back to App</p>
            </div>
          </Link>
          <div className="px-4 py-2 rounded-lg bg-tempo-primary/20 border border-tempo-primary/50">
            <span className="text-tempo-primary font-semibold">📖 Guide & Tutorial</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-tempo-primary/20 text-tempo-primary border border-tempo-primary/50'
                      : 'text-gray-400 hover:text-white hover:bg-tempo-card'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-tempo-primary/10 to-tempo-secondary/10 border border-tempo-primary/30">
              <p className="text-sm text-gray-300 mb-3">Ready to deploy?</p>
              <Link
                href="/"
                className="btn-primary block text-center px-4 py-2 rounded-lg font-semibold text-sm"
              >
                🚀 Launch App
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-tempo-darker border-t border-tempo-border p-2 z-50">
          <div className="flex overflow-x-auto gap-2 pb-safe">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`shrink-0 px-3 py-2 rounded-lg text-sm ${
                  activeSection === section.id
                    ? 'bg-tempo-primary/20 text-tempo-primary'
                    : 'text-gray-400'
                }`}
              >
                {section.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {/* Getting Started */}
          {activeSection === 'getting-started' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Getting Started</h2>
                <p className="text-gray-300 text-lg">
                  Welcome to the Tempo Contract Deployer! This tool makes it incredibly easy to deploy
                  smart contracts on the Tempo Moderato testnet. No coding required.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">⚡ Quick Start (3 Steps)</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-white">Connect your wallet</p>
                      <p className="text-gray-400 text-sm">MetaMask or Rabby wallet supported. The app will auto-switch to Tempo network.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-white">Get testnet USD from faucet</p>
                      <p className="text-gray-400 text-sm">Visit the Tempo faucet to receive free USD tokens for gas fees.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-white">Deploy contracts</p>
                      <p className="text-gray-400 text-sm">Choose NFT or Token, set quantity (1-100), and hit deploy!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-tempo-card border border-tempo-border">
                  <div className="text-3xl mb-2">🖼️</div>
                  <h4 className="font-bold text-white mb-1">NFT Contracts</h4>
                  <p className="text-gray-400 text-sm">Deploy ERC-721 style NFT contracts for digital collectibles and unique tokens.</p>
                </div>
                <div className="p-4 rounded-lg bg-tempo-card border border-tempo-border">
                  <div className="text-3xl mb-2">🪙</div>
                  <h4 className="font-bold text-white mb-1">Token Contracts</h4>
                  <p className="text-gray-400 text-sm">Deploy ERC-20 style fungible token contracts for currencies and utility tokens.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-green-400 font-semibold mb-1">💡 Pro Tip</p>
                <p className="text-gray-300 text-sm">
                  You can deploy up to 100 contracts in a single batch! Each one requires individual wallet approval for security.
                </p>
              </div>
            </div>
          )}

          {/* Wallet Setup */}
          {activeSection === 'wallet' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Wallet Setup</h2>
                <p className="text-gray-300 text-lg">
                  You'll need a Web3 wallet to interact with the Tempo blockchain. Here's how to get set up.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Supported Wallets</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-3xl">🦊</div>
                    <div>
                      <h4 className="font-bold text-white">MetaMask</h4>
                      <p className="text-gray-400 text-sm mb-2">The most popular browser wallet extension.</p>
                      <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tempo-primary text-sm hover:underline"
                      >
                        Download MetaMask →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-3xl">🐰</div>
                    <div>
                      <h4 className="font-bold text-white">Rabby Wallet</h4>
                      <p className="text-gray-400 text-sm mb-2">A feature-rich alternative with enhanced security features.</p>
                      <a
                        href="https://rabby.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tempo-primary text-sm hover:underline"
                      >
                        Download Rabby →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Adding Tempo Network</h3>
                <p className="text-gray-400 mb-4">
                  The app automatically prompts you to add Tempo Moderato network. If you need to add it manually:
                </p>
                <div className="bg-tempo-darker rounded-lg p-4 font-mono text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Name:</span>
                    <span className="text-white">Tempo Moderato</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-white">42431</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RPC URL:</span>
                    <span className="text-tempo-primary">https://rpc.moderato.tempo.xyz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Currency Symbol:</span>
                    <span className="text-white">USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Explorer:</span>
                    <span className="text-tempo-primary">https://explore.tempo.xyz</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-yellow-400 font-semibold mb-1">⚠️ Important</p>
                <p className="text-gray-300 text-sm">
                  Never share your private key or seed phrase with anyone. This app only requests transaction signatures - it never accesses your private keys.
                </p>
              </div>
            </div>
          )}

          {/* Getting Testnet USD */}
          {activeSection === 'faucet' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Getting Testnet USD</h2>
                <p className="text-gray-300 text-lg">
                  Tempo uses USD as its native currency. Get free testnet USD from the faucet to pay for gas fees.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Step-by-Step Guide</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-white">Visit the Tempo Faucet</p>
                      <p className="text-gray-400 text-sm mb-2">Go to the official Tempo faucet page.</p>
                      <a
                        href="https://docs.tempo.xyz/quickstart/faucet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tempo-primary/20 text-tempo-primary text-sm hover:bg-tempo-primary/30 transition-all"
                      >
                        💧 Open Faucet
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-white">Enter your wallet address</p>
                      <p className="text-gray-400 text-sm">Copy your wallet address from MetaMask/Rabby and paste it in the faucet.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-tempo-primary/20 flex items-center justify-center text-tempo-primary font-bold shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-white">Request funds</p>
                      <p className="text-gray-400 text-sm">Click the request button. USD will arrive in your wallet within seconds!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-tempo-card border border-tempo-border">
                  <h4 className="font-bold text-white mb-2">💰 How much do I need?</h4>
                  <p className="text-gray-400 text-sm">
                    Each contract deployment costs a tiny amount (typically less than 0.01 USD). 
                    The faucet provides enough for hundreds of deployments.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-tempo-card border border-tempo-border">
                  <h4 className="font-bold text-white mb-2">🔄 Can I get more?</h4>
                  <p className="text-gray-400 text-sm">
                    Yes! The faucet has rate limits but you can return later for more. 
                    Testnet USD has no real value - it's for testing only.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-400 font-semibold mb-1">💡 Check Your Balance</p>
                <p className="text-gray-300 text-sm">
                  Use the "Balance" tab in the app to see your current USD balance on Tempo Moderato. It refreshes automatically every 15 seconds.
                </p>
              </div>
            </div>
          )}

          {/* Deploying Contracts */}
          {activeSection === 'deploying' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Deploying Contracts</h2>
                <p className="text-gray-300 text-lg">
                  The deployment process is simple. Here's exactly what happens when you deploy.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Deployment Process</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-2xl">1️⃣</div>
                    <div>
                      <p className="font-semibold text-white">Select Contract Type</p>
                      <p className="text-gray-400 text-sm">Choose between NFT (ERC-721) or Token (ERC-20) using the tabs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-2xl">2️⃣</div>
                    <div>
                      <p className="font-semibold text-white">Set Quantity (1-100)</p>
                      <p className="text-gray-400 text-sm">Use the slider or input field to specify how many contracts to deploy.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-2xl">3️⃣</div>
                    <div>
                      <p className="font-semibold text-white">Click Deploy</p>
                      <p className="text-gray-400 text-sm">Hit the big deploy button. Your wallet will pop up for each contract.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-2xl">4️⃣</div>
                    <div>
                      <p className="font-semibold text-white">Approve Transactions</p>
                      <p className="text-gray-400 text-sm">Confirm each transaction in your wallet. This ensures you control what gets deployed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <div className="text-2xl">5️⃣</div>
                    <div>
                      <p className="font-semibold text-white">Watch the Magic</p>
                      <p className="text-gray-400 text-sm">Each contract gets a unique name and appears in your deployment history. Click the explorer link to verify on-chain!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Auto-Generated Names</h3>
                <p className="text-gray-400 mb-4">
                  Each contract gets a unique, memorable name automatically. Examples:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {['Cosmic Phoenix', 'Cyber Dragon', 'Neon Whale', 'Crystal Tiger', 'Shadow Eagle', 'Diamond Wolf', 'Phantom Bear', 'Golden Serpent'].map(name => (
                    <div key={name} className="px-3 py-2 rounded bg-tempo-darker text-center text-gray-300">
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-green-400 font-semibold mb-1">✅ Security Feature</p>
                <p className="text-gray-300 text-sm">
                  Each contract requires individual wallet approval. This prevents accidental batch transactions and keeps you in full control.
                </p>
              </div>
            </div>
          )}

          {/* Understanding Contracts */}
          {activeSection === 'contracts' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Understanding Contracts</h2>
                <p className="text-gray-300 text-lg">
                  Learn about the two types of smart contracts you can deploy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                  <div className="text-4xl mb-4">🖼️</div>
                  <h3 className="text-xl font-bold text-white mb-2">NFT Contracts (ERC-721)</h3>
                  <p className="text-gray-400 mb-4">
                    Non-Fungible Token contracts for unique digital assets.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Each token is unique
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Perfect for collectibles
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Used for digital art, game items
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Non-divisible (1 token = 1 unit)
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-6">
                  <div className="text-4xl mb-4">🪙</div>
                  <h3 className="text-xl font-bold text-white mb-2">Token Contracts (ERC-20)</h3>
                  <p className="text-gray-400 mb-4">
                    Fungible Token contracts for currencies and utility tokens.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      All tokens are identical
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Perfect for currencies
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Used for DeFi, governance
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      Divisible (like regular money)
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What Gets Deployed?</h3>
                <p className="text-gray-400 mb-4">
                  The contracts deployed are minimal placeholder contracts. They demonstrate the deployment mechanism and are great for:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-tempo-darker text-center">
                    <div className="text-2xl mb-2">🧪</div>
                    <p className="text-white font-semibold">Testing</p>
                    <p className="text-gray-400 text-xs">Learn how deployment works</p>
                  </div>
                  <div className="p-4 rounded-lg bg-tempo-darker text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-white font-semibold">Stress Testing</p>
                    <p className="text-gray-400 text-xs">Test network capacity</p>
                  </div>
                  <div className="p-4 rounded-lg bg-tempo-darker text-center">
                    <div className="text-2xl mb-2">📚</div>
                    <p className="text-white font-semibold">Learning</p>
                    <p className="text-gray-400 text-xs">Explore blockchain basics</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* About Tempo */}
          {activeSection === 'tempo' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">About Tempo Blockchain</h2>
                <p className="text-gray-300 text-lg">
                  Tempo is a next-generation payments-focused Layer-1 blockchain with impressive backing.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🏢 Who's Behind Tempo?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <h4 className="font-bold text-white mb-2">Stripe</h4>
                    <p className="text-gray-400 text-sm">
                      The payments giant that processed $1.4 trillion in 2024. They're bringing their payments expertise to blockchain.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-tempo-darker border border-tempo-border">
                    <h4 className="font-bold text-white mb-2">Paradigm</h4>
                    <p className="text-gray-400 text-sm">
                      One of crypto's most respected VC firms, known for backing Ethereum, Coinbase, and other industry leaders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">⚡ Key Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-tempo-darker">
                    <div className="text-3xl">💸</div>
                    <div>
                      <p className="font-semibold text-white">Ultra-Low Fees</p>
                      <p className="text-gray-400 text-sm">Target transaction fees of just 0.1¢ (one-tenth of a cent)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-tempo-darker">
                    <div className="text-3xl">⏱️</div>
                    <div>
                      <p className="font-semibold text-white">Sub-Second Finality</p>
                      <p className="text-gray-400 text-sm">Transactions confirm in less than a second</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-tempo-darker">
                    <div className="text-3xl">🔗</div>
                    <div>
                      <p className="font-semibold text-white">EVM Compatible</p>
                      <p className="text-gray-400 text-sm">Works with existing Ethereum tools, wallets, and smart contracts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-tempo-darker">
                    <div className="text-3xl">🌍</div>
                    <div>
                      <p className="font-semibold text-white">Payments Focus</p>
                      <p className="text-gray-400 text-sm">Built from the ground up for real-world payment use cases</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🗺️ Network Details</h3>
                <div className="bg-tempo-darker rounded-lg p-4 font-mono text-sm space-y-2">
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white">Tempo Moderato (Testnet)</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-white">42431 (0xa5bf)</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-400">Native Currency:</span>
                    <span className="text-white">USD (18 decimals)</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-gray-400">Testnet Launch:</span>
                    <span className="text-white">December 2025</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://tempo.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-tempo-primary/20 border border-tempo-primary/50 hover:bg-tempo-primary/30 transition-all text-center"
                >
                  <span className="text-tempo-primary font-semibold">🌐 Tempo Website →</span>
                </a>
                <a
                  href="https://explore.tempo.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-tempo-secondary/20 border border-tempo-secondary/50 hover:bg-tempo-secondary/30 transition-all text-center"
                >
                  <span className="text-tempo-secondary font-semibold">🔍 Block Explorer →</span>
                </a>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-300 text-lg">
                  Got questions? We've got answers.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Is this free to use?",
                    a: "Yes! The app is completely free. You only need testnet USD for gas fees, which you can get free from the faucet."
                  },
                  {
                    q: "Are these real contracts with real value?",
                    a: "No. These are testnet contracts deployed on Tempo's test network. They have no monetary value. This is purely for learning and testing."
                  },
                  {
                    q: "Why do I need to approve each transaction?",
                    a: "For security. Each contract deployment is a separate blockchain transaction. Requiring approval ensures you control exactly what gets deployed and prevents accidental mass deployments."
                  },
                  {
                    q: "Can I use these contracts for a real project?",
                    a: "The deployed contracts are minimal placeholders. For production use, you'd want fully-featured contracts with proper functionality. However, the deployment experience is identical to mainnet."
                  },
                  {
                    q: "What happens when Tempo launches mainnet?",
                    a: "Your testnet contracts won't carry over to mainnet. Testnet is separate. But the skills you learn here apply directly to mainnet deployment!"
                  },
                  {
                    q: "Why does it say 'USD' as the currency?",
                    a: "Tempo uses USD-denominated tokens as its native currency. This aligns with their payments-focused mission - making blockchain feel more like traditional finance."
                  },
                  {
                    q: "How many contracts can I deploy?",
                    a: "Up to 100 per batch. There's no total limit - deploy as many as you want across multiple batches. The testnet is designed for this!"
                  },
                  {
                    q: "Can I see my deployed contracts?",
                    a: "Yes! Click the explorer icon next to any transaction to view it on Tempo's block explorer. You can also click the Explorer button in the header to see all your activity."
                  }
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-xl p-6">
                    <h3 className="font-bold text-white mb-2">{item.q}</h3>
                    <p className="text-gray-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          {activeSection === 'troubleshooting' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">Troubleshooting</h2>
                <p className="text-gray-300 text-lg">
                  Running into issues? Here are solutions to common problems.
                </p>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🔴</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">"Please install MetaMask or Rabby wallet"</h3>
                      <p className="text-gray-400 mb-3">This means no wallet extension was detected in your browser.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Install MetaMask or Rabby from their official websites. After installation, refresh this page.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🟡</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">"Switch Network" button appears</h3>
                      <p className="text-gray-400 mb-3">Your wallet is connected to a different network (like Ethereum mainnet).</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Click the "Switch Network" button. The app will automatically add and switch to Tempo Moderato network.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💸</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">"Insufficient funds for gas"</h3>
                      <p className="text-gray-400 mb-3">Your wallet doesn't have enough USD to pay for the transaction.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Visit the <a href="https://docs.tempo.xyz/quickstart/faucet" target="_blank" rel="noopener noreferrer" className="text-tempo-primary hover:underline">Tempo Faucet</a> to get free testnet USD.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">❌</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">"User rejected transaction"</h3>
                      <p className="text-gray-400 mb-3">You clicked "Reject" in the wallet popup.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> If you want to deploy, click "Confirm" when the wallet popup appears. It's safe - you're only deploying to a testnet.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🔄</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">"Nonce error - please refresh"</h3>
                      <p className="text-gray-400 mb-3">Transaction ordering got out of sync.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Refresh the page and try again. This usually happens if you have pending transactions.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⏳</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">Transaction stuck on "Pending"</h3>
                      <p className="text-gray-400 mb-3">The transaction was sent but confirmation is taking longer than usual.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Wait a moment - Tempo is fast but sometimes needs a few extra seconds. Check the explorer link to see the actual status. If confirmed there but still pending here, refresh the page.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">👻</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">Wallet popup doesn't appear</h3>
                      <p className="text-gray-400 mb-3">The wallet confirmation dialog isn't showing up.</p>
                      <p className="text-gray-300 text-sm"><strong>Solution:</strong> Check if the popup is blocked or minimized. Try clicking the wallet extension icon directly. Some wallets also queue requests - look for a notification badge.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-tempo-primary/10 border border-tempo-primary/30">
                <p className="text-tempo-primary font-semibold mb-1">Still stuck?</p>
                <p className="text-gray-300 text-sm">
                  Reach out to <a href="https://t.me/thomas_young" target="_blank" rel="noopener noreferrer" className="text-tempo-primary hover:underline">Thomas Young on Telegram</a> for help. Include what error you're seeing and what wallet you're using.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-tempo-border mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
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
          <p className="mt-4 text-xs text-gray-600">
            Tempo Moderato Testnet • Chain ID: 42431 • RPC: rpc.moderato.tempo.xyz
          </p>
        </div>
      </footer>
    </div>
  );
}
