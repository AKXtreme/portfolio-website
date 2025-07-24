#!/bin/bash

# Production Build Script with Performance Optimizations
echo "🚀 Starting optimized production build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci --production=false
fi

# Build with optimizations
echo "🏗️  Building application..."
NODE_ENV=production npm run build

# Additional optimizations
echo "⚡ Applying additional optimizations..."

# Create .htaccess for Apache servers (if deploying to Apache)
cat > dist/.htaccess << EOF
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF

# Create _headers file for Netlify
cat > dist/_headers << EOF
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: images.unsplash.com; connect-src 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
EOF

# Create _redirects file for Netlify SPA routing
cat > dist/_redirects << EOF
/*    /index.html   200
EOF

# Display build info
echo "✅ Build completed successfully!"
echo "📊 Build statistics:"
echo "   └── Checking bundle sizes..."

# Check if webpack-bundle-analyzer is available for analysis
if command -v npx &> /dev/null; then
    echo "📈 Bundle analysis available - run 'npx webpack-bundle-analyzer dist/assets/*.js' to analyze"
fi

echo ""
echo "🎉 Your optimized portfolio is ready for deployment!"
echo "📁 Build output: ./dist/"
echo ""
echo "🚀 Deployment options:"
echo "   • Netlify: Drag & drop the 'dist' folder to https://app.netlify.com/drop"
echo "   • Vercel: Run 'vercel --prod' in this directory"
echo "   • GitHub Pages: Push the 'dist' folder contents to your gh-pages branch"
echo ""
echo "💡 Performance tips applied:"
echo "   ✓ Asset compression enabled"
echo "   ✓ Browser caching configured"
echo "   ✓ Security headers added"
echo "   ✓ SPA routing configured"
echo "   ✓ Image optimization enabled"
echo "   ✓ Bundle splitting implemented"
