

var myPAGEUSER={
    jsID:IDGenerate(),
    name:null,
};
var bytesPrev = 0;
var timestampPrev = 0;
let statsString = {};









//////////////////////////////////////////////////////////////////////////////
function IDGenerate() {
    var text = "";
    var hdntxt = "";
    var captchatext = "";
    var possible = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 7; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // document.getElementById("txtboxID").value = text;
    return text;
}
