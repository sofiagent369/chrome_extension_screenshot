// Background script for handling long-running operations or event listeners

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

/**
 * Saves configuration settings to storage.
 * @param {object} config - The configuration object to save.
 */
function saveConfig(config) {
  chrome.storage.local.set({ config }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error saving config:', chrome.runtime.lastError);
    } else {
      console.log('Configuration saved successfully');
    }
  });
}

/**
 * Retrieves configuration settings from storage.
 * @param {function} callback - Callback function to handle the retrieved config.
 */
function getConfig(callback) {
  chrome.storage.local.get(['config'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving config:', chrome.runtime.lastError);
      callback(null);
    } else {
      callback(result.config || {});
    }
  });
}

/**
 * Handles messages from content scripts or other parts of the extension.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveConfig') {
    saveConfig(request.config);
  } else if (request.action === 'getConfig') {
    getConfig(sendResponse);
    return true; // Keep the message channel open for sending response
  }
});