function Base32ToBase64() {
}

Base32ToBase64.convert = function(base32) {
    var input = base32;
    var cleaned = "";
    var myRegExp = /[A-Z0-7]/ ;
    for (i=0; i<input.length; i++) {
        var ch = input.charAt(i);
        if (ch == '0') {
            ch = 'O';
        } else if (ch == '1') {
            ch = 'L';
        } else if (ch == '8') {
            ch = 'B';
        } else if (myRegExp.test(ch) == false) {
            continue;
        }
        cleaned += ch;
    }
    var result = base32_decode(cleaned);
    var output = result.output;
    var bitsLeft = result.bitsLeft;
    var separator = "";
    var hexText = "";
    for (i=0; i<output.length; i++) {
        hexText = hexText + separator + (output[i]<16?"0":"") + dec2hex(output[i]);
    }
    return hexText;
};

var hD='0123456789ABCDEF';
function dec2hex(d) {
    var h = hD.substr(d&15,1);
    while (d>15) {
        d>>=4;
        h=hD.substr(d&15,1)+h;
    }
    return h;
}

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="
function base32_decode(input) {
    var buffer = 0;
    var bitsLeft = 0;
    var output = new Array();
    var i = 0;
    var count = 0;

    while (i < input.length) {
        var val = keyStr.indexOf(input.charAt(i++));
        if (val >= 0 && val < 32) {
            buffer <<= 5;
            buffer |= val;
            bitsLeft += 5;
            if (bitsLeft >= 8) {
                output[count++] = (buffer >> (bitsLeft - 8)) & 0xFF;
                bitsLeft -= 8;
            }
        }
    }
    return {output : output, bitsLeft : bitsLeft};
}