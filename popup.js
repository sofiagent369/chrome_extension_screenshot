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