// Content script to inject Figma overlay into web pages
(function () {
  'use strict';

  let isInjected = false;

  function injectFigmaOverlay() {
    // Check if already injected
    if (isInjected || document.querySelector('figma-overlay')) {
      return;
    }

    // Inject the figma-overlay script into the page's context
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('figma-overlay.js');
    script.onload = function () {
      // Inject the creation script
      const creationScript = document.createElement('script');
      creationScript.src = chrome.runtime.getURL('figma-overlay-creator.js');
      document.head.appendChild(creationScript);
    };

    document.head.appendChild(script);
    isInjected = true;
  }

  function removeFigmaOverlay() {
    const existingOverlay = document.querySelector('figma-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
      isInjected = false;
    }
  }

  // Check if extension is enabled on page load
  chrome.storage.sync.get(['figmaOverlayEnabled'], function (result) {
    const isEnabled = result.figmaOverlayEnabled !== false; // Default to true
    if (isEnabled) {
      injectFigmaOverlay();
    }
  });

  // Listen for toggle messages from popup
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === 'toggleFigmaOverlay') {
      if (request.enabled) {
        injectFigmaOverlay();
      } else {
        removeFigmaOverlay();
      }
    }
  });
})();
