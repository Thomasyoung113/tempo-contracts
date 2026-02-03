// Tempo Moderato Testnet Configuration
export const TEMPO_CHAIN = {
  chainId: 42431,
  chainIdHex: '0xa5bf',
  name: 'Tempo Testnet (Moderato)',
  currency: {
    name: 'USD',
    symbol: 'USD',
    decimals: 18
  },
  rpcUrl: 'https://rpc.moderato.tempo.xyz',
  wsUrl: 'wss://rpc.moderato.tempo.xyz',
  explorer: 'https://explore.tempo.xyz'
};

// Generate unique contract names
const adjectives = ['Cosmic', 'Stellar', 'Quantum', 'Nebula', 'Aurora', 'Plasma', 'Photon', 'Nova', 'Astral', 'Lunar', 'Solar', 'Galactic', 'Mystic', 'Ethereal', 'Radiant', 'Blazing', 'Frozen', 'Electric', 'Thunder', 'Crystal'];
const nouns = ['Dragon', 'Phoenix', 'Titan', 'Voyager', 'Pioneer', 'Guardian', 'Sentinel', 'Nexus', 'Prism', 'Vertex', 'Cipher', 'Matrix', 'Oracle', 'Beacon', 'Catalyst', 'Zenith', 'Apex', 'Core', 'Pulse', 'Wave'];

export function generateUniqueName(index: number): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const timestamp = Date.now().toString(36).slice(-4);
  return `${adj}${noun}${index}${timestamp}`;
}

export function generateUniqueSymbol(index: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let symbol = '';
  for (let i = 0; i < 3; i++) {
    symbol += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${symbol}${index}`;
}

// Minimal deployable contract - no constructor args needed
// This is a simple contract that just deploys and stores basic data
export const EMPTY_CONTRACT_BYTECODE = '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220000000000000000000000000000000000000000000000000000000000000000064736f6c63430008130033';

// NFT-like contract bytecode (minimal, no constructor args)
export const NFT_BYTECODE = EMPTY_CONTRACT_BYTECODE;

// Token-like contract bytecode (minimal, no constructor args)  
export const TOKEN_BYTECODE = EMPTY_CONTRACT_BYTECODE;
