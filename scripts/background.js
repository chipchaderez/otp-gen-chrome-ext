chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({id: "paste_otp", "title": "Paste OTP Token", "contexts":["editable"]});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "paste_otp") {
        pasteOTP(tab.id);
    }
});

chrome.commands.onCommand.addListener(function(command) {
    if (command == "paste_otp") {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            pasteOTP(tabs[0].id);
        });
    }
});

function pasteOTP(tabId) {
    KeyUtils.advanceCounter();
    chrome.tabs.sendMessage(tabId, { key: KeyUtils.getOTP() });
}