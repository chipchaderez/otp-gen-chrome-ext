# Basic OTP Token Generator Chrome Extension
A Chrome extension for generating [HOTP](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_Algorithm) tokens for a single secret.

![Popup](/screenshots/ext_popup.png)

## SETUP
Submit the HOTP secret key in the options popup:

![Options Popup](/screenshots/ext_options.png)

## USAGE

### POPUP

![Popup](/screenshots/ext_popup_token.png)

* ![Refresh](/screenshots/ext_refresh.png)&nbsp;generate a new token.


* ![Refresh](/screenshots/ext_clippy.png)&nbsp;copy the token to clipboard.

### Context Menu

Use 'Paste OTP Token' right-click menu action to paste a new token into any text-box.

![Context Menu](/screenshots/ext_paste.png)

### Keyboard Shortcuts

Default 'Paste OTP Token' HotKey: <i>Alt+T</i>

(configurable on 'chrome://extensions/configureCommands')

## Notes

* The extension stores locally only the secret and counter required for the HMAC-based One-time Password Algorithm.
* The PIN code should still be manually entered.

## Future Work

* Support TOTP. 
* CRUD for multiple tokens.

## Contact

Please feel free to contact Daniel Erez (derez@redhat.com) or Maor Lipchuk (mlipchuk@redhat.com).