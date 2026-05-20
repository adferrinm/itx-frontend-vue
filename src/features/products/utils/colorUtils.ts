const COLOR_HEX: Record<string, string> = {
  // English
  Black: '#0a0a0a',
  White: '#f5f5f4',
  Silver: '#d8d6d2',
  Gold: '#c8a96e',
  'Rose Gold': '#e8bfb0',
  Red: '#c0392b',
  Blue: '#2a3a6b',
  Green: '#3a6b4a',
  Yellow: '#e8c84a',
  Purple: '#6a4a8a',
  Pink: '#e8a0b0',
  Orange: '#e87a30',
  Graphite: '#3b3a36',
  Champagne: '#e6d2b3',
  Midnight: '#1a1d2b',
  Starlight: '#ece5d6',
  Coral: '#e07b6a',
  Cyan: '#4ab8c8',
  'Space Gray': '#6e6e73',
  'Sky Blue': '#87ceeb',
  Gray: '#9e9e9e',
  Brown: '#795548',
  Mint: '#cfe3d6',
  Cream: '#efe7d6',
  Beige: '#e5dcc7',
  Sand: '#dfcdaf',
  // API-discovered colors (all 100 products surveyed via extract-colors.mjs)
  'Aquamarine Green': '#2eb8a8',
  'Black/Blue': '#1a1a3e',
  'Black/Red': '#3a0a0a',
  'Black/Silver': '#2a2a2a',
  'Black/White': '#666666',
  'Burgundy Red': '#7b1c2a',
  'Ceramic White': '#f8f7f5',
  'Ceramic White and Pearl Red with 3 exchangeable battery covers': '#f5e8e8',
  Cherry: '#9e1b32',
  'Classic White': '#f9f9f9',
  'Dark Blue': '#1a2a4a',
  'Dark Red': '#8b0000',
  'Essential White': '#f8f8f8',
  'Ferrari edition': '#cc0000',
  'Fragrant Pink': '#f4a7b9',
  'Gentle Black': '#2d2d2d',
  'Gentle Grey': '#d0d0d0',
  'Graphite Black': '#2d2d2d',
  Lagoon: '#4fb3bf',
  'Metallic Red': '#b52a2a',
  'Mystic Black': '#1a1a2e',
  Pearl: '#f0ece6',
  'Pure White': '#f9f9f9',
  'Rock Black': '#1c1c1c',
  'Sandy Silver': '#c4bfb5',
  'Soft-touch Black': '#2a2a2a',
  Steel: '#7d8796',
  'Sunshine Yellow': '#ffd700',
  'Titan Black': '#1a1a1a',
  'Titanium Black': '#2c2c2e',
  'Titanium Gray': '#8e8e93',
  'Titanium Grey': '#8e8e93',
  'Wine Red': '#722f37',
  // Spanish
  Negro: '#0a0a0a',
  Blanco: '#f5f5f4',
  Plata: '#d8d6d2',
  Dorado: '#c8a96e',
  Rojo: '#c0392b',
  Azul: '#2a3a6b',
  Verde: '#3a6b4a',
  Amarillo: '#e8c84a',
  Morado: '#6a4a8a',
  Rosa: '#e8a0b0',
  Naranja: '#e87a30',
  Gris: '#9e9e9e',
  'Gris Espacial': '#6e6e73',
  Grafito: '#3b3a36',
  Oro: '#c8a96e',
  'Oro Rosa': '#e8bfb0',
}

// Lowercase mirror for case-insensitive lookup — the API returns inconsistent casing
// (e.g. "black", "Black", "Graphite black" all exist across different products)
const COLOR_HEX_LOWER: Record<string, string> = Object.fromEntries(
  Object.entries(COLOR_HEX).map(([k, v]) => [k.toLowerCase(), v])
)

// CSS color names not already covered by COLOR_HEX, used as a last resort before #cccccc
const CSS_COLOR_NAMES = new Set(['violet', 'indigo', 'teal', 'lime', 'grey'])

export function colorHex(name: string): string {
  return (
    COLOR_HEX[name] ??
    COLOR_HEX_LOWER[name.toLowerCase()] ??
    (CSS_COLOR_NAMES.has(name.toLowerCase()) ? name.toLowerCase() : '#cccccc')
  )
}
