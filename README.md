# Figma Overlay Chrome Extension

A Chrome browser extension that injects the [figma-overlay](https://github.com/Pitu/figma-overlay) component into any webpage, enabling pixel-perfect design comparison between Figma designs and your implementation.

## What it does

This extension automatically adds the figma-overlay tool to every webpage you visit, allowing you to:

- **Copy SVG from Figma** - Right-click any Figma component → Copy as → SVG
- **Paste and compare** - Click the floating blue button on any website to paste your design
- **Pixel-perfect positioning** - Use arrow keys for precise overlay positioning
- **Opacity control** - Adjust transparency to see both design and implementation
- **Drag and drop** - Move the overlay around to align with your UI

## Installation

### From Source

1. **Download this repository**

   ```bash
   git clone https://github.com/yourusername/figma-overlay-chrome-extension.git
   ```

2. **Load in Chrome**

   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the downloaded folder

3. **Start using**
   - Visit any webpage
   - Look for the blue floating button in the bottom-left corner
   - Copy an SVG from Figma and click the button to paste it

## How to Use

### In Figma

1. Open your Figma design
2. Select a component or frame
3. Right-click → Copy as → **Copy as SVG**

### On Your Website

1. Navigate to your development/production site
2. Click the blue floating button (bottom-left corner)
3. The SVG will overlay on your page
4. **Drag** to reposition or use **arrow keys** for fine-tuning
5. Use the **opacity slider** to adjust transparency
6. Press **Escape** to remove the overlay

## Features

- ✅ **Works on any website** - Injects overlay component universally
- ✅ **No CSP issues** - Bundles dependencies locally to avoid security restrictions
- ✅ **Minimal footprint** - Lightweight injection with clean code
- ✅ **Framework agnostic** - Works with React, Vue, Angular, vanilla JS, etc.
- ✅ **Pixel-perfect controls** - Arrow key movement and opacity adjustment

## Technical Implementation

This extension solves several Chrome Extension challenges:

### Content Security Policy (CSP) Compliance

- Bundles the figma-overlay library locally instead of loading from CDN
- Uses separate script files to avoid inline script restrictions
- Properly configured `web_accessible_resources` in manifest

### Context Isolation

- Injects scripts into page context (not extension context) for proper custom element registration
- Uses DOM script injection pattern to ensure figma-overlay works correctly
- Maintains separation between extension and page environments

### Architecture

```
content.js (extension context)
    ↓ injects
figma-overlay.js (page context) - defines custom element
    ↓ then injects
figma-overlay-creator.js (page context) - creates <figma-overlay>
```

## Based On

This extension is built around the excellent [figma-overlay](https://github.com/Pitu/figma-overlay) library by [@Pitu](https://github.com/Pitu).

> **Figma overlay** is a drop-in component to create an overlay over your website to compare it to its Figma counterpart. It works by grabbing the page/component SVG from your clipboard and creating a floating image for you to drag around and compare.

## File Structure

```
figma-overlay-chrome-extension/
├── manifest.json                 # Extension configuration
├── content.js                   # Main injection script
├── figma-overlay.js             # Bundled figma-overlay library
├── figma-overlay-creator.js     # Element creation script
├── popup.html                   # Extension popup UI
├── icons/                       # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Contributing

1. Fork this repository
2. Make your changes
3. Test with `chrome://extensions/` developer mode
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- **[@Pitu](https://github.com/Pitu)** for creating the original [figma-overlay](https://github.com/Pitu/figma-overlay) library
- Built for developers who need pixel-perfect Figma implementation

---

**Made with ❤️ for the design-to-development workflow**
