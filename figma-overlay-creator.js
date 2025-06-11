(function () {
  'use strict';

  function createOverlay() {
    const figmaOverlay = document.createElement('figma-overlay');
    document.body.appendChild(figmaOverlay);
  }

  // Wait for custom element to be defined
  if (customElements && customElements.get('figma-overlay')) {
    createOverlay();
  } else if (customElements) {
    customElements.whenDefined('figma-overlay').then(() => {
      createOverlay();
    });
  }
})();
