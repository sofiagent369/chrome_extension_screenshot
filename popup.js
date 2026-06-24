document.getElementById('take-screenshot').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      const screenshot = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          return document.body.scrollWidth + 'x' + document.body.scrollHeight;
        }
      });

      const [width, height] = screenshot[0].result.split('x').map(Number);
      const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png', quality: 100 });
      
      // Display the screenshot in a new tab or handle it as needed
      console.log(dataUrl);
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
});

// Toggle between light and dark mode
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

// Initialize theme based on user preference or default to dark mode
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(savedTheme + '-mode');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});

// Save theme preference to local storage
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
  });
});