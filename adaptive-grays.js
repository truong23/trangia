const fs = require('fs');
const path = require('path');

const colorMap = {
  '#2D3748': 'var(--gray-800, #2D3748)',
  '#1E293B': 'var(--gray-800, #1E293B)',
  '#334155': 'var(--gray-700, #334155)',
  '#475569': 'var(--gray-600, #475569)',
  '#4A5568': 'var(--gray-600, #4A5568)',
  '#4a5568': 'var(--gray-600, #4a5568)',
  '#64748B': 'var(--gray-500, #64748B)',
  '#64748b': 'var(--gray-500, #64748b)',
  '#666666': 'var(--gray-500, #666666)',
  '#666': 'var(--gray-500, #666)',
  '#718096': 'var(--gray-500, #718096)',
  'currentColor; opacity: 0.85;': 'var(--gray-500, #64748B);', // Revert my previous currentColor trick
  "'currentColor', opacity: 0.85": "'var(--gray-500, #64748B)'" // Revert my previous TSX currentColor trick
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [hex, cssVar] of Object.entries(colorMap)) {
    // In CSS and TSX
    const regex = new RegExp(hex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, cssVar);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated adaptive grays in:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist') {
        walk(fullPath);
      }
    } else {
      if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        replaceInFile(fullPath);
      }
    }
  }
}

walk(path.join(__dirname, 'frontend/src'));

// Add the CSS variable overrides to index.css
const cssPath = path.join(__dirname, 'frontend/src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
if (!cssContent.includes('--gray-700: #FFFFFF')) {
  cssContent += `\n
/* ==========================================================
   ADAPTIVE GRAY TEXT FOR BLUE BACKGROUNDS
   ========================================================== */
.tg-vm-card.vision-box, 
.hotline-box, 
.tg-corp-cta-banner, 
.tg-hero-section, 
.tg-footer, 
.tg-vingroup-crest-banner, 
.tg-page-header, 
.tg-topbar,
.bg-primary {
  --gray-800: #FFFFFF;
  --gray-700: #FFFFFF;
  --gray-600: #F8FAFC;
  --gray-500: #E2E8F0;
  --tg-text-muted: #E2E8F0;
}
`;
  fs.writeFileSync(cssPath, cssContent);
  console.log('Injected adaptive CSS variables into index.css');
}

console.log('Done!');
