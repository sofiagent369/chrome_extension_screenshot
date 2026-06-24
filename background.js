// Background script for handling long-running operations or event listeners
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});