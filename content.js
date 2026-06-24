// Content script for handling page-specific operations like capturing and annotating screenshots

function captureAndAnnotate() {
  // Example function to handle screenshot capturing and annotation
  console.log('Capture and annotate functionality here');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureAndAnnotate') {
    captureAndAnnotate();
  }
});