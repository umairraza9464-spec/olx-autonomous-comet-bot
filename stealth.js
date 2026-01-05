// Anti-Detection Stealth Layer
(function() {
  'use strict';
  console.log('🔒 Stealth protection activated');
  
  // Hide webdriver detection
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false
  });
  
  // Randomize canvas fingerprint
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    const context = this.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, 1, 1);
      imageData.data[0] = Math.floor(Math.random() * 256);
      context.putImageData(imageData, 0, 0);
    }
    return originalToDataURL.apply(this, arguments);
  };
  
  // WebGL spoofing
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(param) {
    if (param === 37445) return 'Intel Inc.';
    if (param === 37446) return 'Intel Iris OpenGL Engine';
    return getParameter.call(this, param);
  };
  
  // Chrome detection bypass
  Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5]
  });
  
  console.log('✅ Anti-detection complete');
})();
