const key = "i<3redakt-06644fe7-6503-484b-9ae0-02db2dda7466";

function select() {
  
  // Get all visible HTML elements
  var elements = document.querySelectorAll("p, span, a, div, title, meta, h1, h2, h3, h4, h5, h6");

  // Iterate over the elements
  elements.forEach(function(element) {
    // Get the text content of the element
    var text = element.textContent.trim();

    // Check if the text matches the desired pattern
    if (text.startsWith("redakt-") || text.startsWith("redakt.org-") || text.startsWith("r3d4kt-") || text.startsWith("r8%h7t-") || text.startsWith("<keylang>") || text.startsWith("keylang:")) {
      if (text.endsWith("&&&") || text.endsWith("</keylang>") || text.endsWith(":keylang")) {
        // Send the text to the decrypt function
        var decryptedText = decrypt(text);

        // Change the HTML of the element
        element.innerHTML = decryptedText;
        console.log("[Keylang] Message decrypted");

        // Change styles of text
        element.style.color = "white";
        element.style.backgroundColor = "#0E1F5D";
        element.style.fontFamily = "sans-serif";
        element.style.padding = "5px";
      }
    }
  });
}

function decrypt(text) {

  // Clean text
  const messageContent = text.replace('redakt.org-','').replace('redakt-','').replace('&&&','').replace('r3d4kt-','').replace('r8%h7t-','').replace('<keylang>','').replace('</keylang>','').replace('keylang:','').replace(':keylang','');
  
  // Decrypt text
  const decrypted = CryptoJS.AES.decrypt(messageContent, key);
  const decryptedText = "[keylang] " + decrypted.toString(CryptoJS.enc.Utf8) + " [/keylang]";
  return decryptedText;
};

// Automatically run after 7 seconds
setTimeout(function() {
  // Call the select function
  select();
}, 7000);