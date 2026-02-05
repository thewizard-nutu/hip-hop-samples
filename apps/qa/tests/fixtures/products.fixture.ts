export const testProducts = {
  samplePack1: {
    id: 'prod-001',
    name: 'Classic 90s Hip-Hop Drums',
    description: 'Authentic 90s drum samples',
    price: 29.99,
    category: 'drums',
    format: 'WAV',
    bpm: 90,
    tags: ['90s', 'drums', 'hip-hop'],
    preview: 'https://example.com/preview-001.mp3',
  },
  samplePack2: {
    id: 'prod-002',
    name: 'Vintage Vinyl Loops',
    description: 'Lofi soul samples',
    price: 39.99,
    category: 'loops',
    format: 'WAV',
    bpm: 85,
    tags: ['lofi', 'vinyl', 'soul'],
    preview: 'https://example.com/preview-002.mp3',
  },
  samplePack3: {
    id: 'prod-003',
    name: 'East Coast Boom Bap',
    description: 'Authentic East Coast production samples',
    price: 49.99,
    category: 'production-kits',
    format: 'WAV',
    bpm: 95,
    tags: ['boom-bap', 'east-coast'],
    preview: 'https://example.com/preview-003.mp3',
  },
};

export const filterOptions = {
  categories: ['drums', 'loops', 'production-kits', 'melodies', 'effects'],
  priceRanges: ['0-25', '25-50', '50-100', '100+'],
  formats: ['WAV', 'MP3', 'AIFF'],
};
