import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node optimize-avatar.js <input-path>');
  process.exit(1);
}

const full = path.resolve(input);
if (!fs.existsSync(full)) {
  console.error('Input file not found:', full);
  process.exit(1);
}

const outDir = path.dirname(full);

(async () => {
  try {
    // produce a 1024px max WebP
    await sharp(full)
      .rotate()
      .resize({ width: 1024, height: 1024, fit: 'inside' })
      .webp({ quality: 85 })
      .toFile(path.join(outDir, 'profile.webp'));

    // produce a 256x256 square WebP
    await sharp(full)
      .rotate()
      .resize(256, 256)
      .webp({ quality: 85 })
      .toFile(path.join(outDir, 'profile-256.webp'));

    // produce a rounded 256x256 WebP (circle)
    const circle = Buffer.from(
      `<svg><rect x="0" y="0" width="256" height="256" rx="128" ry="128"/></svg>`
    );

    const rounded = await sharp(full)
      .rotate()
      .resize(256, 256)
      .composite([{ input: circle, blend: 'dest-in' }])
      .webp({ quality: 90 })
      .toFile(path.join(outDir, 'profile-round.webp'));

    // also produce an optimized JPEG fallback
    await sharp(full)
      .rotate()
      .resize({ width: 800, height: 800, fit: 'inside' })
      .jpeg({ quality: 82 })
      .toFile(path.join(outDir, 'profile-optimized.jpg'));

    console.log('Optimized images written to', outDir);
  } catch (err) {
    console.error('Image optimization failed:', err);
    process.exit(2);
  }
})();
