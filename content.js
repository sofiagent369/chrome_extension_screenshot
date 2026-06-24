// Content script for handling page-specific operations like capturing and annotating screenshots

let isAnnotating = false;
let canvas;

function captureScreenshot() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(dataUrl);
      }
    });
  });
}

function setupCanvas() {
  const screenshotElement = document.querySelector('#screenshot-image');
  const canvasContainer = document.createElement('div');
  canvasContainer.style.position = 'relative';
  canvasContainer.style.width = `${screenshotElement.width}px`;
  canvasContainer.style.height = `${screenshotElement.height}px`;

  const newCanvas = document.createElement('canvas');
  newCanvas.width = screenshotElement.width;
  newCanvas.height = screenshotElement.height;
  newCanvas.style.position = 'absolute';
  newCanvas.style.top = '0';
  newCanvas.style.left = '0';
  newCanvas.style.pointerEvents = 'none';

  canvasContainer.appendChild(screenshotElement);
  canvasContainer.appendChild(newCanvas);
  
  document.body.replaceChild(canvasContainer, screenshotElement);
  return newCanvas;
}

function startAnnotation() {
  isAnnotating = true;
  canvas = setupCanvas();
  canvas.addEventListener('mousedown', handleMouseDown);
}

function stopAnnotation() {
  isAnnotating = false;
  canvas.removeEventListener('mousedown', handleMouseDown);
  document.body.querySelector('#screenshot-image').style.pointerEvents = 'auto';
}

function handleMouseDown(event) {
  if (!isAnnotating) return;

  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);

  function onMouseMove(e) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureAndAnnotate') {
    captureScreenshot()
      .then(dataUrl => {
        chrome.runtime.sendMessage({ action: 'screenshotCaptured', dataUrl });
      })
      .catch(error => {
        console.error('Error capturing screenshot:', error);
      });
  } else if (request.action === 'startAnnotation') {
    startAnnotation();
  } else if (request.action === 'stopAnnotation') {
    stopAnnotation();
  }
});