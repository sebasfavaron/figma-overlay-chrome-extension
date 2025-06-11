document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('toggle');
  const status = document.getElementById('status');

  // Load current state
  chrome.storage.sync.get(['figmaOverlayEnabled'], function (result) {
    const isEnabled = result.figmaOverlayEnabled !== false; // Default to true
    updateUI(isEnabled);
  });

  // Handle toggle click
  toggle.addEventListener('click', function () {
    chrome.storage.sync.get(['figmaOverlayEnabled'], function (result) {
      const currentState = result.figmaOverlayEnabled !== false;
      const newState = !currentState;

      chrome.storage.sync.set({ figmaOverlayEnabled: newState }, function () {
        updateUI(newState);

        // Notify content scripts about the state change
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'toggleFigmaOverlay',
              enabled: newState,
            });
          }
        );
      });
    });
  });

  function updateUI(isEnabled) {
    if (isEnabled) {
      toggle.classList.add('enabled');
      status.textContent = '✓ Extension is enabled';
      status.className = 'status enabled';
    } else {
      toggle.classList.remove('enabled');
      status.textContent = '✗ Extension is disabled';
      status.className = 'status disabled';
    }
  }
});
