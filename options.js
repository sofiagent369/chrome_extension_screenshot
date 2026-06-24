document.addEventListener('DOMContentLoaded', () => {
  const screenSizeSelect = document.getElementById('screen-size');
  const themeRadios = Array.from(document.querySelectorAll('[name="theme"]'));
  const saveOptionsButton = document.getElementById('save-options');

  // Function to load saved preferences from localStorage
  function loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('preferences')) || {};
    screenSizeSelect.value = prefs.screenSize || 'medium';
    themeRadios.find(radio => radio.value === prefs.theme)?.checked = true;
  }

  // Function to save current preferences to localStorage
  function savePreferences() {
    const preferences = {
      screenSize: screenSizeSelect.value,
      theme: themeRadios.find(radio => radio.checked)?.value || 'dark'
    };
    localStorage.setItem('preferences', JSON.stringify(preferences));
    console.log('Preferences saved successfully');
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