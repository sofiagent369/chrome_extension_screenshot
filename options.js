document.addEventListener('DOMContentLoaded', () => {
  const screenSizeSelect = document.getElementById('screen-size');
  const themeRadios = Array.from(document.querySelectorAll('[name="theme"]'));
  const saveOptionsButton = document.getElementById('save-options');

  // Function to load saved preferences
  function loadPreferences() {
    chrome.storage.local.get(['preferences'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error loading preferences:', chrome.runtime.lastError);
      } else {
        const prefs = result.preferences || {};
        screenSizeSelect.value = prefs.screenSize || 'medium';
        themeRadios.find(radio => radio.value === prefs.theme)?.checked = true;
      }
    });
  }

  // Function to save current preferences
  function savePreferences() {
    const preferences = {
      screenSize: screenSizeSelect.value,
      theme: themeRadios.find(radio => radio.checked)?.value || 'dark'
    };
    chrome.storage.local.set({ preferences }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error saving preferences:', chrome.runtime.lastError);
      } else {
        console.log('Preferences saved successfully');
      }
    });
  }

  // Load preferences on page load
  loadPreferences();

  // Save preferences when save button is clicked
  saveOptionsButton.addEventListener('click', savePreferences);

  // Optionally, save preferences on change of any option
  screenSizeSelect.addEventListener('change', savePreferences);
  themeRadios.forEach(radio => {
    radio.addEventListener('change', savePreferences);
  });
});