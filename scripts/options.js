$(document).ready(function() {
    $("#form").submit(function(event) {
        event.preventDefault();
        localStorage.setItem("secret", Base32ToBase64.convert($("#secret").val()));
        localStorage.setItem("counter", 0);
        window.close(); 
    });
});