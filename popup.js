document.getElementById('take-screenshot').addEventListener('click', async () => {
  try {
    chrome.runtime.sendMessage({ action: 'captureAndAnnotate' });
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
});

document.getElementById('annotate').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: isAnnotating ? 'stopAnnotation' : 'startAnnotation' });
  isAnnotating = !isAnnotating;
});

document.getElementById('options').addEventListener('click', () => {
  // Placeholder for options functionality
  console.log('Options button clicked');
});

// Handle received screenshot data from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'screenshotCaptured') {
    document.getElementById('screenshot-image').src = request.dataUrl;
    document.getElementById('screenshot-container').classList.remove('hidden');
  }
});

// Toggle between light and dark mode (existing code remains unchanged)
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }
}

// Initialize theme based on user preference or default to dark mode (existing code remains unchanged)
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(savedTheme + '-mode');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});

// Save theme preference to local storage (existing code remains unchanged)
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
  });
});