function KeyUtils() {
}

KeyUtils.getSecret = function() {
    return localStorage.getItem("secret");
};

KeyUtils.getCounter = function() {
    return localStorage.getItem("counter");
};

KeyUtils.advanceCounter = function() {
    return localStorage.setItem("counter", parseInt(KeyUtils.getCounter()) + 1);
};

KeyUtils.getOTP = function() {
    var otp = window.otplib;
    return hotp(KeyUtils.getSecret(), KeyUtils.getCounter(), "dec6");
};


