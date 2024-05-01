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
class GUEST_IFLIX {
    constructor() {

        this.id=null;
        this.provider="iFlix";
        this.displayName="";
        this.picture="";

        this.last_login=null;
        this.last_refresh=null;

        this.set_init_guest_user();
    }
    get get_GUEST_JSON(){
        let this_return={
            id:this.id,
            provider:this.provider,
            displayName:this.displayName ,
            picture: this.picture ,
            last_login: this.last_login,
            last_refresh: this.last_refresh,

        }
        return (this_return)
    }

    get get_GUEST_JSON_STR(){
        let this_return={
            id:this.id,
            provider:this.provider,
            displayName:this.displayName ,
            picture: this.picture ,
            last_login: this.last_login,
            last_refresh: this.last_refresh,
        }
        return JSON.stringify(this_return)
    }
    set_found_guest_user(cookie_found_str){
        let this_JSON=null;
        try{
            this_JSON=JSON.parse(cookie_found_str)
        }
        catch(err_JSON_set_found_guest_user){
            console.log(`err_JSON_set_found_guest_user : ${err_JSON_set_found_guest_user}`)
            this_JSON= (cookie_found_str)
        }

        this.id=this_JSON.id;
        this.provider=this_JSON.provider;
        this.displayName=this_JSON.displayName;
        this.picture=this_JSON.picture;
        this.last_login=this_JSON.last_login;


        this.last_refresh=new Date().getTime();
        console.log(`last_login : ${this.last_login}`)
        console.log(`last_refresh : ${this.last_refresh}`)
        // console.log(`set_found_guest_user success`)
    }
    set_init_guest_user(){


        let cookie_found=readCookie("iflix_user");
        if(cookie_found!=null){
            console.log(`cookie_found : ${ cookie_found}`);
            this.set_found_guest_user(cookie_found);
            createCookie('iflix_user',JSON.stringify(this.get_GUEST_JSON))
        }
        else{
            // Initialize guest user here
            console.log("Initializing guest user");
            let this_INIT_ID=IDGenerate()+"_"+IDGenerate()+"_"+IDGenerate()+"_"+IDGenerate();  // Set a unique ID based on current time
            // Example of setting properties
            this.id ="iFlix_GUEST_"+this_INIT_ID;
            this.provider ="iFlix"; //  "iFlix_GUEST_"+this_INIT_ID;
            this.displayName = "iFlix_GUEST_"+this_INIT_ID;
            this. picture="https://iflix.ishopper.info/iflix_logo.png";
            this.last_login=new Date().getTime();
            this.last_refresh=new Date().getTime();
            createCookie('iflix_user',JSON.stringify(this.get_GUEST_JSON))
        }


    }


}

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