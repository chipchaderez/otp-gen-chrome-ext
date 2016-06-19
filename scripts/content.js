chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var textField = document.activeElement;
    textField.value = textField.value + message.key;
});