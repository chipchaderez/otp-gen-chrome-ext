chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({id: "paste_otp", "title": "Paste OTP Token", "contexts":["editable"]});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "paste_otp") {
        KeyUtils.advanceCounter();
        chrome.tabs.sendMessage(tab.id, { key: KeyUtils.getOTP() });
    }
});