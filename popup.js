const key = "i<3redakt-06644fe7-6503-484b-9ae0-02db2dda7466";

// manualEncrypt

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttonEncrypt').addEventListener('click', manualEncrypt);
});

function manualEncrypt() {
  const inputText = document.getElementById('inputText').value;
  const encryptedText = CryptoJS.AES.encrypt(inputText, key).toString();
  document.getElementById('outputText').textContent = 'redakt.org-' +  encryptedText + '&&&';
  document.getElementById("copied").style.display = "none";
}

// manualDecrypt

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttonDecrypt').addEventListener('click', manualDecrypt);
});

function manualDecrypt() {
  const inputText = document.getElementById('inputText').value.replace('redakt.org-','').replace('redakt-','').replace('&&&','').replace('r3d4kt-','').replace('r8%h7t-','');
  const decryptedText = CryptoJS.AES.decrypt(inputText, key).toString(CryptoJS.enc.Utf8);
  document.getElementById('outputText').textContent = decryptedText;
  document.getElementById("copied").style.display = "none";
}

// copyText

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('outputText').addEventListener('click', copyText);
});

function copyText() {
  const textToCopy = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(textToCopy);
  document.getElementById("copied").style.display = "block";
};

// forceDecryption

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('syncIcon').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: forceSelect
      });
    });
  });
});

function forceSelect() {
  
  // Get all visible HTML elements
  var elements = document.querySelectorAll("p, span, a, div, title, meta, h1, h2, h3, h4, h5, h6");

  // Iterate over the elements
  elements.forEach(function(element) {
    // Get the text content of the element
    var text = element.textContent.trim();

    // Check if the text matches the desired pattern
    if (text.startsWith("redakt-") || text.startsWith("redakt.org-") || text.startsWith("r3d4kt-") || text.startsWith("r8%h7t-")) {
      if (text.endsWith("&&&")) {
        // Send the text to the decrypt function
        var decryptedText = forceDecrypt(text);

        // Change the HTML of the element
        element.innerHTML = decryptedText;
        console.log("[Forced] Message decrypted with Redakt");

        // Change styles of text
        element.style.color = "white";
        element.style.backgroundColor = "black";
        element.style.fontFamily = "sans-serif";
        element.style.padding = "5px";
      }
    }
  });

  function forceDecrypt(text) {
    // Clean text
    const messageContent = text.replace('redakt.org-','').replace('redakt-','').replace('&&&','').replace('r3d4kt-','').replace('r8%h7t-','');
    
    // Decrypt text
    const decrypted = CryptoJS.AES.decrypt(messageContent, key);
    const decryptedText = "[redakt] " + decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  };
}