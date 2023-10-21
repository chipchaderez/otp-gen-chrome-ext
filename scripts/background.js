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


/*
  A simple Javascript HOTP implementation (HMAC-Based One-Time Password Algorithm) as described in RFC 4226. 
 
  The library is relying on crypto-js (http://code.google.com/p/crypto-js/) for the javascript HMAC-SHA1 implementation. 
 
  The library can be used to create software token (don't forget to protect the key of the token...).
 
  If you want to use the library, you'll need to load the crypto-js (sha1 and hmac) and  hotp.js.

  Calling the library is easy, you just have to set the hex key of the token, the counter plus the output format.

     otp = hotp("3132333435363738393031323334353637383930","4","dec6");

  Current output formats are : hex40 (format used by ootp, a free software library) and dec6 (the 6 decimal digit as described in the RFC 4226).

  A demo page with the test vector of the RFC 4226 : http://www.foo.be/hotp/example.html*

  http://www.gitorious.org/hotp-js/
  
  Copyright (C) 2009 Alexandre Dulaunoy

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

function hotp(key, counter, format) {

    function hotp_hexkeytobytestream(s) {
        // s is the key to be converted in bytes
        var b = new Array();
        var last = s.length;
        for (var i = 0; i < last; i = i + 2) {
            var x = s[i] + s[i + 1];
            x.toUpperCase();
            x = "0x" + x;
            x = parseInt(x);
            b[i] = String.fromCharCode(x);
        }
        var ret = new String();
        ret = b.join('');
        return ret;

    }
    function hotp_movingfactortohex(count) {
        // count is the moving factor in OTP to be converted in bytes
        v = decimaltohex(count, 16);
        var decb = new Array();
        lhex = Crypto.util.hexToBytes(v);
        for (var i = 0; i < lhex.length; i++) {
            decb[i] = String.fromCharCode(lhex[i]);
        }
        var retval = new String();
        retval = decb.join('');
        return retval;
    }

    function decimaltohex(d, padding) {
        // d is the decimal value
        // padding is the padding to apply (O pad)
        var hex = Number(d).toString(16);
        padding = typeof(padding) === "undefined" || padding === null ? padding = 2 : padding;
        while (hex.length < padding) {
            hex = "0" + hex;
        }
        return hex;
    }

    function truncatedvalue(h, p) {
        // h is the hash value
        // p is precision
        offset = h[19] & 0xf;
        v = (h[offset] & 0x7f) << 24 | (h[offset + 1] & 0xff) << 16 | (h[offset + 2] & 0xff) << 8 | (h[offset + 3] & 0xff);
        v = "" + v;
        v = v.substr(v.length - p, p);
        return v;
    }

    var hmacBytes = Crypto.HMAC(Crypto.SHA1, Crypto.charenc.Binary.stringToBytes((hotp_movingfactortohex(counter))), Crypto.charenc.Binary.stringToBytes(hotp_hexkeytobytestream(key)));

    if (format == "hex40") {
        return hmacBytes.substring(0, 10);
    } else if (format == "dec6") {
        return truncatedvalue(Crypto.util.hexToBytes(hmacBytes), 6);
    } else if (format == "dec7") {
        return truncatedvalue(Crypto.util.hexToBytes(hmacBytes), 7);
    } else if (format == "dec8") {
        return truncatedvalue(Crypto.util.hexToBytes(hmacBytes), 8);
    }
    else {
        return "unknown format";
    }

}


/*
 * Crypto-JS v2.0.0
 * http://code.google.com/p/crypto-js/
 * Copyright (c) 2009, Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(function(){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var d=window.Crypto={};var a=d.util={rotl:function(h,g){return(h<<g)|(h>>>(32-g))},rotr:function(h,g){return(h<<(32-g))|(h>>>g)},endian:function(h){if(h.constructor==Number){return a.rotl(h,8)&16711935|a.rotl(h,24)&4278255360}for(var g=0;g<h.length;g++){h[g]=a.endian(h[g])}return h},randomBytes:function(h){for(var g=[];h>0;h--){g.push(Math.floor(Math.random()*256))}return g},bytesToWords:function(h){for(var k=[],j=0,g=0;j<h.length;j++,g+=8){k[g>>>5]|=h[j]<<(24-g%32)}return k},wordsToBytes:function(i){for(var h=[],g=0;g<i.length*32;g+=8){h.push((i[g>>>5]>>>(24-g%32))&255)}return h},bytesToHex:function(g){for(var j=[],h=0;h<g.length;h++){j.push((g[h]>>>4).toString(16));j.push((g[h]&15).toString(16))}return j.join("")},hexToBytes:function(h){for(var g=[],i=0;i<h.length;i+=2){g.push(parseInt(h.substr(i,2),16))}return g},bytesToBase64:function(h){if(typeof btoa=="function"){return btoa(e.bytesToString(h))}for(var g=[],l=0;l<h.length;l+=3){var m=(h[l]<<16)|(h[l+1]<<8)|h[l+2];for(var k=0;k<4;k++){if(l*8+k*6<=h.length*8){g.push(c.charAt((m>>>6*(3-k))&63))}else{g.push("=")}}}return g.join("")},base64ToBytes:function(h){if(typeof atob=="function"){return e.stringToBytes(atob(h))}h=h.replace(/[^A-Z0-9+\/]/ig,"");for(var g=[],j=0,k=0;j<h.length;k=++j%4){if(k==0){continue}g.push(((c.indexOf(h.charAt(j-1))&(Math.pow(2,-2*k+8)-1))<<(k*2))|(c.indexOf(h.charAt(j))>>>(6-k*2)))}return g}};d.mode={};var b=d.charenc={};var f=b.UTF8={stringToBytes:function(g){return e.stringToBytes(unescape(encodeURIComponent(g)))},bytesToString:function(g){return decodeURIComponent(escape(e.bytesToString(g)))}};var e=b.Binary={stringToBytes:function(j){for(var g=[],h=0;h<j.length;h++){g.push(j.charCodeAt(h))}return g},bytesToString:function(g){for(var j=[],h=0;h<g.length;h++){j.push(String.fromCharCode(g[h]))}return j.join("")}}})();(function(){var f=Crypto,a=f.util,b=f.charenc,e=b.UTF8,d=b.Binary;var c=f.SHA1=function(i,g){var h=a.wordsToBytes(c._sha1(i));return g&&g.asBytes?h:g&&g.asString?d.bytesToString(h):a.bytesToHex(h)};c._sha1=function(o){if(o.constructor==String){o=e.stringToBytes(o)}var v=a.bytesToWords(o),x=o.length*8,p=[],r=1732584193,q=-271733879,k=-1732584194,h=271733878,g=-1009589776;v[x>>5]|=128<<(24-x%32);v[((x+64>>>9)<<4)+15]=x;for(var z=0;z<v.length;z+=16){var E=r,D=q,C=k,B=h,A=g;for(var y=0;y<80;y++){if(y<16){p[y]=v[z+y]}else{var u=p[y-3]^p[y-8]^p[y-14]^p[y-16];p[y]=(u<<1)|(u>>>31)}var s=((r<<5)|(r>>>27))+g+(p[y]>>>0)+(y<20?(q&k|~q&h)+1518500249:y<40?(q^k^h)+1859775393:y<60?(q&k|q&h|k&h)-1894007588:(q^k^h)-899497514);g=h;h=k;k=(q<<30)|(q>>>2);q=r;r=s}r+=E;q+=D;k+=C;h+=B;g+=A}return[r,q,k,h,g]};c._blocksize=16})();


/*
 * Crypto-JS v2.0.0
 * http://code.google.com/p/crypto-js/
 * Copyright (c) 2009, Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(function(){var e=Crypto,a=e.util,b=e.charenc,d=b.UTF8,c=b.Binary;e.HMAC=function(l,m,k,h){if(m.constructor==String){m=d.stringToBytes(m)}if(k.constructor==String){k=d.stringToBytes(k)}if(k.length>l._blocksize*4){k=l(k,{asBytes:true})}var g=k.slice(0),n=k.slice(0);for(var j=0;j<l._blocksize*4;j++){g[j]^=92;n[j]^=54}var f=l(g.concat(l(n.concat(m),{asBytes:true})),{asBytes:true});return h&&h.asBytes?f:h&&h.asString?c.bytesToString(f):a.bytesToHex(f)}})();



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
