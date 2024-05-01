

  cookie_domain="iflix.ishopper.info"

function createCookie(name, value ) {
    var date = new Date();
    date.setTime(date.getTime() + (10 * 60 * 1000)); //10 min cookie
    var expires = "; expires=" + date.toGMTString();
    if (window.location.href.includes("https")) {
        document.cookie = name + "=" + value +"; expires="+ expires + ";secure;samesite=lax; domain="+cookie_domain+";   path=/;";
    } else {
        document.cookie = name + "=" + value+"; expires=" + expires + "; samesite=lax;domain="+cookie_domain+";  path=/;";
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    // createCookie(name, "", -1);

    let date=new Date();
    var expires =  date.setTime(date.getTime() - (10 * 60 * 1000)); //10 min cookie  "";
    var value="";
    if (window.location.href.includes("https")) {
        document.cookie = name + "=" + value +';expires='+ expires + ";secure;samesite=lax; domain="+cookie_domain+";   path=/;";
    } else {
        document.cookie = name + "=" + value +';expires='+ expires + "; samesite=lax;domain="+cookie_domain+";  path=/;";
    }
}


// jsbeans.js
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;  // Callback when the script is loaded
    script.onerror=function(err_loadScript){
        console.log(`err_loadScript : ${err_loadScript}`)
    }
    document.head.appendChild(script);
}


//THIS IS GREAT ANYWAYS FOR LATER USAGE to avoid adding the scripts
// and never need to worry about dependencies


/*
// Dynamically load another.js
loadScript('./another.js', function() {
    console.log('another.js has been loaded and can use functions from jsbeans.js');
    // Now you can call any functions from `another.js` or setup code that depends on `another.js`
    setupFromAnother();  // Assuming `setupFromAnother` is a function defined in another.js
});


 */