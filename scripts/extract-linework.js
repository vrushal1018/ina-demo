const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const pdfPath = 'C:/Users/VRUSHAL PACHUPATE/Downloads/lineworkina.pdf';
const buf = fs.readFileSync(pdfPath);

function getObjectStream(id) {
  const needle = id + ' 0 obj';
  const pos = buf.indexOf(Buffer.from(needle));
  if (pos === -1) return null;
  const streamPos = buf.indexOf(Buffer.from('stream'), pos);
  if (streamPos === -1) return null;
  let start = streamPos + 6;
  if (buf[start] === 0x0d && buf[start + 1] === 0x0a) start += 2;
  else if (buf[start] === 0x0a || buf[start] === 0x0d) start += 1;
  const end = buf.indexOf(Buffer.from('endstream'), start);
  const raw = buf.subarray(start, end);
  try {
    return zlib.inflateSync(raw).toString('latin1');
  } catch (e) {
    try {
      return zlib.inflateRawSync(raw).toString('latin1');
    } catch (e2) {
      return null;
    }
  }
}

function pdfPathToSvg(rawStr, tx, ty) {
  const tokens = rawStr.trim().split(/\s+/);
  let d = '';
  let i = 0;
  let stack = [];
  let curX = 0, curY = 0;

  while (i < tokens.length) {
    const t = tokens[i++];
    if (!t) continue;
    if (!isNaN(parseFloat(t))) {
      stack.push(parseFloat(t));
      continue;
    }
    if (t === 'm') {
      const y = stack.pop();
      const x = stack.pop();
      curX = x + tx;
      curY = -(y + ty);
      d += `M ${curX.toFixed(2)} ${curY.toFixed(2)} `;
    } else if (t === 'l') {
      const y = stack.pop();
      const x = stack.pop();
      curX = x + tx;
      curY = -(y + ty);
      d += `L ${curX.toFixed(2)} ${curY.toFixed(2)} `;
    } else if (t === 'c') {
      const y3 = stack.pop();
      const x3 = stack.pop();
      const y2 = stack.pop();
      const x2 = stack.pop();
      const y1 = stack.pop();
      const x1 = stack.pop();
      d += `C ${(x1 + tx).toFixed(2)} ${(-(y1 + ty)).toFixed(2)}, ${(x2 + tx).toFixed(2)} ${(-(y2 + ty)).toFixed(2)}, ${(x3 + tx).toFixed(2)} ${(-(y3 + ty)).toFixed(2)} `;
      curX = x3 + tx;
      curY = -(y3 + ty);
    } else if (t === 'v') {
      const y3 = stack.pop();
      const x3 = stack.pop();
      const y2 = stack.pop();
      const x2 = stack.pop();
      d += `C ${curX.toFixed(2)} ${curY.toFixed(2)}, ${(x2 + tx).toFixed(2)} ${(-(y2 + ty)).toFixed(2)}, ${(x3 + tx).toFixed(2)} ${(-(y3 + ty)).toFixed(2)} `;
      curX = x3 + tx;
      curY = -(y3 + ty);
    } else if (t === 'y') {
      const y3 = stack.pop();
      const x3 = stack.pop();
      const y1 = stack.pop();
      const x1 = stack.pop();
      d += `C ${(x1 + tx).toFixed(2)} ${(-(y1 + ty)).toFixed(2)}, ${(x3 + tx).toFixed(2)} ${(-(y3 + ty)).toFixed(2)}, ${(x3 + tx).toFixed(2)} ${(-(y3 + ty)).toFixed(2)} `;
      curX = x3 + tx;
      curY = -(y3 + ty);
    }
  }
  return d.trim();
}

function estimatePathLength(d) {
  let len = 0;
  const parts = d.match(/[MLC][^MLC]*/g) || [];
  let curX = 0, curY = 0;
  parts.forEach(part => {
    const cmd = part[0];
    const nums = part.substring(1).trim().split(/[\s,]+/).map(parseFloat);
    if (cmd === 'M') { curX = nums[0]; curY = nums[1]; }
    else if (cmd === 'L') {
      len += Math.hypot(nums[0] - curX, nums[1] - curY);
      curX = nums[0]; curY = nums[1];
    } else if (cmd === 'C') {
      const p0 = [curX, curY], p1 = [nums[0], nums[1]], p2 = [nums[2], nums[3]], p3 = [nums[4], nums[5]];
      let prev = p0;
      for (let t = 0.1; t <= 1.0; t += 0.1) {
        const u = 1 - t;
        const x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0];
        const y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1];
        len += Math.hypot(x - prev[0], y - prev[1]);
        prev = [x, y];
      }
      curX = p3[0]; curY = p3[1];
    }
  });
  return Math.round(len);
}

const s1966 = getObjectStream(1966);
const pathRegex = /(?:([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+K)?[\s\S]*?q\s+1\s+0\s+0\s+1\s+([-\d.]+)\s+([-\d.]+)\s+cm\s+([\s\S]*?)S\s+Q/g;

let m;
const rawPaths = [];
let lastColor = '0.751 0.288 0 0';

while ((m = pathRegex.exec(s1966)) !== null) {
  if (m[1] !== undefined) {
    lastColor = [m[1], m[2], m[3], m[4]].join(' ');
  }
  const ty = parseFloat(m[6]);
  const rawPath = m[7].trim();
  const d = pdfPathToSvg(rawPath, 0, ty);
  const length = estimatePathLength(d);
  
  // Filter out non-linework page artifacts (icons, crop marks)
  if (length < 500) continue;

  const [c, mag, y, k] = lastColor.split(' ').map(parseFloat);
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - mag) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  rawPaths.push({ d, length, color: `rgb(${r},${g},${b})`, hex, cmyk: lastColor });
}

// Compute accurate bounding box across pure architectural paths
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
rawPaths.forEach(p => {
  const nums = p.d.match(/[-\d.]+/g).map(parseFloat);
  for (let i = 0; i < nums.length; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
});

const xShift = -minX;
const yShift = -minY + 20;
const vbWidth = Math.ceil(maxX - minX);
const vbHeight = Math.ceil(maxY - minY + 40);

const normalizedPaths = rawPaths.map((p, idx) => {
  const normD = p.d.replace(/([MLC])\s*([-\d.]+)\s+([-\d.]+)/g, (match, cmd, x, y) => {
    return `${cmd} ${(parseFloat(x) + xShift).toFixed(2)} ${(parseFloat(y) + yShift).toFixed(2)}`;
  }).replace(/,\s*([-\d.]+)\s+([-\d.]+)/g, (match, x, y) => {
    return `, ${(parseFloat(x) + xShift).toFixed(2)} ${(parseFloat(y) + yShift).toFixed(2)}`;
  });
  return {
    id: idx,
    d: normD,
    length: p.length,
    color: p.color,
    hex: p.hex
  };
});

const jsonPath = 'C:/ina demo/src/data/lineworkPaths.json';
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify({
  viewBox: `0 0 ${vbWidth} ${vbHeight}`,
  width: vbWidth,
  height: vbHeight,
  count: normalizedPaths.length,
  paths: normalizedPaths
}, null, 2));

console.log('Saved pure architectural curves to JSON:', normalizedPaths.length);

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbWidth} ${vbHeight}" width="100%" height="100%">
${normalizedPaths.map(p => `  <path id="curve-${p.id}" d="${p.d}" fill="none" stroke="${p.color}" stroke-width="0.85" opacity="0.8" />`).join('\n')}
</svg>`;

fs.writeFileSync('C:/ina demo/public/linework-extracted.svg', svgContent);
console.log('Saved pure SVG to public/linework-extracted.svg');
