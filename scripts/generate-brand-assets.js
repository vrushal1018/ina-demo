const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LOGO_SRC = path.join(__dirname, '..', 'public', 'Ina TechFM Logo white.png');

if (!fs.existsSync(LOGO_SRC)) {
  console.error('Source logo not found at:', LOGO_SRC);
  process.exit(1);
}

// Helper: assemble an ICO file from raw PNG buffers
function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + count * 16;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const entry = Buffer.alloc(16);
    const size = sizes[i];
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8); // PNG size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += pngBuffers[i].length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function generate() {
  console.log('Generating brand icons and Open Graph assets...');

  // 1. Create Base 512x512 Square App Icon with Brand Navy Background
  // Background: Deep Corporate Navy #0B1B30 with subtle gradient & brand cyan glow
  const iconSize = 512;
  const logoTargetWidth = 430; // ~84% width for maximum clarity
  const logoTargetHeight = Math.round(logoTargetWidth * (179 / 313)); // ~246px

  const resizedLogo = await sharp(LOGO_SRC)
    .resize(logoTargetWidth, logoTargetHeight, { fit: 'contain' })
    .toBuffer();

  const iconSvgBackground = `
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 ${iconSize} ${iconSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="navyGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#143258" />
          <stop offset="60%" stop-color="#0B1B30" />
          <stop offset="100%" stop-color="#060F1C" />
        </radialGradient>
        <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2495D3" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <!-- Base Background with subtle rounded corners -->
      <rect width="${iconSize}" height="${iconSize}" rx="80" fill="url(#navyGlow)" />
      <!-- Subtle inner glowing border -->
      <rect x="4" y="4" width="${iconSize - 8}" height="${iconSize - 8}" rx="76" fill="none" stroke="url(#borderGlow)" stroke-width="4" />
    </svg>
  `;

  const baseIcon512 = await sharp(Buffer.from(iconSvgBackground))
    .composite([
      {
        input: resizedLogo,
        top: Math.round((iconSize - logoTargetHeight) / 2),
        left: Math.round((iconSize - logoTargetWidth) / 2),
      },
    ])
    .png()
    .toBuffer();

  // Save 512x512 icon
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), baseIcon512);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.png'), baseIcon512);
  console.log('✓ Created src/app/icon.png & public/icon.png (512x512)');

  // Save 192x192 icon (standard Android/PWA)
  const icon192 = await sharp(baseIcon512).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'), icon192);
  console.log('✓ Created public/icon-192.png (192x192)');

  // Save 180x180 Apple Touch Icon
  const appleIcon = await sharp(baseIcon512).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-icon.png'), appleIcon);
  console.log('✓ Created src/app/apple-icon.png & public/apple-icon.png (180x180)');

  // 2. Generate Multi-Size ICO File (16, 32, 48, 256)
  const icoSizes = [16, 32, 48, 256];
  const icoPngBuffers = [];
  for (const sz of icoSizes) {
    const buf = await sharp(baseIcon512).resize(sz, sz).png().toBuffer();
    icoPngBuffers.push(buf);
  }
  const icoBuffer = createIco(icoPngBuffers, icoSizes);
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuffer);
  console.log('✓ Created src/app/favicon.ico & public/favicon.ico (Multi-size ICO)');

  // 3. Generate 1200x630 OpenGraph / Social Share Image
  // Used by WhatsApp, LinkedIn, Twitter/X, Facebook, Slack, iMessage, etc.
  const ogWidth = 1200;
  const ogHeight = 630;
  const ogLogoWidth = 580;
  const ogLogoHeight = Math.round(ogLogoWidth * (179 / 313)); // ~332px

  const ogResizedLogo = await sharp(LOGO_SRC)
    .resize(ogLogoWidth, ogLogoHeight, { fit: 'contain' })
    .toBuffer();

  const ogSvgBackground = `
    <svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ogGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#143A66" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#0B1C33" stop-opacity="1" />
          <stop offset="100%" stop-color="#040A14" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2495D3" stop-opacity="0" />
          <stop offset="25%" stop-color="#2495D3" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#00E5FF" stop-opacity="1" />
          <stop offset="75%" stop-color="#2495D3" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#2495D3" stop-opacity="0" />
        </linearGradient>
        <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(112, 201, 255, 0.05)" stroke-width="1"/>
          <circle cx="0" cy="0" r="1.5" fill="rgba(0, 229, 255, 0.12)" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="${ogWidth}" height="${ogHeight}" fill="url(#ogGlow)" />
      <!-- Blueprint grid -->
      <rect width="${ogWidth}" height="${ogHeight}" fill="url(#blueprintGrid)" />

      <!-- Top decorative accent line -->
      <rect x="0" y="0" width="${ogWidth}" height="5" fill="url(#accentLine)" />

      <!-- Center divider accent line below logo -->
      <line x1="420" y1="465" x2="780" y2="465" stroke="url(#accentLine)" stroke-width="2" />
      <circle cx="600" cy="465" r="4" fill="#00E5FF" />

      <!-- Tagline & Domain Text -->
      <text x="600" y="515" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="600" letter-spacing="3" fill="#D9EDF8">
        ENGINEERING &amp; FACILITY MANAGEMENT SOLUTIONS
      </text>
      <text x="600" y="555" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#70C9FF">
        PAN-INDIA OPERATIONS • inatechfmglobal.com
      </text>

      <!-- Corner architectural brackets -->
      <path d="M 40 70 L 40 40 L 70 40" fill="none" stroke="#2495D3" stroke-width="2" opacity="0.6" />
      <path d="M 1160 70 L 1160 40 L 1130 40" fill="none" stroke="#2495D3" stroke-width="2" opacity="0.6" />
      <path d="M 40 560 L 40 590 L 70 590" fill="none" stroke="#2495D3" stroke-width="2" opacity="0.6" />
      <path d="M 1160 560 L 1160 590 L 1130 590" fill="none" stroke="#2495D3" stroke-width="2" opacity="0.6" />
    </svg>
  `;

  // Place logo slightly above center (top: 100)
  const ogTop = 100;
  const ogLeft = Math.round((ogWidth - ogLogoWidth) / 2);

  const ogImageBuffer = await sharp(Buffer.from(ogSvgBackground))
    .composite([
      {
        input: ogResizedLogo,
        top: ogTop,
        left: ogLeft,
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'opengraph-image.png'), ogImageBuffer);
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'twitter-image.png'), ogImageBuffer);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'og-image.png'), ogImageBuffer);
  console.log('✓ Created src/app/opengraph-image.png, twitter-image.png & public/og-image.png (1200x630)');

  console.log('All brand assets generated successfully!');
}

generate().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});

