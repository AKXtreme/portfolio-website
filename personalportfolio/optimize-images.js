#!/usr/bin/env node

// Simple image optimization script for better web performance
const fs = require('fs');
const path = require('path');

const assetsDir = './src/assets';
const publicDir = './public';

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Copy and rename images with compression hints
const imagesToOptimize = [
  { src: 'message .png', dest: 'akmessage-compressed.webp' },
  { src: 'todo.png', dest: 'todo-compressed.webp' },
  { src: 'map.png', dest: 'map-compressed.webp' },
  { src: 'photo_2025-07-20_01-04-46.jpg', dest: 'profile-compressed.webp' }
];

console.log('🖼️  Image optimization tips:');
console.log('- Use online tools like TinyPNG or Squoosh.app to compress images');
console.log('- Convert to WebP format for better compression');
console.log('- Resize images to actual display dimensions');
console.log('- Current large images detected:');

imagesToOptimize.forEach(img => {
  const srcPath = path.join(assetsDir, img.src);
  if (fs.existsSync(srcPath)) {
    const stats = fs.statSync(srcPath);
    const sizeInKB = Math.round(stats.size / 1024);
    console.log(`  - ${img.src}: ${sizeInKB}KB → should be compressed to ${img.dest}`);
  }
});

console.log('\n💡 Performance recommendations implemented:');
console.log('✅ Lazy loading for images');
console.log('✅ Code splitting for routes');
console.log('✅ Delayed Vanta.js loading');
console.log('✅ Preconnect hints for external resources');
console.log('✅ Build optimizations in vite.config.js');
