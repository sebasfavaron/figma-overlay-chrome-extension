// Content script to inject Figma overlay into web pages
(function () {
  'use strict';

  // Check if figma-overlay is already injected
  if (document.querySelector('figma-overlay')) {
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
})();
