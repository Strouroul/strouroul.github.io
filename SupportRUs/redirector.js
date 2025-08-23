


let countdown_seconds=
    parseInt(document.getElementById('countdown_redirect').innerText)
    ||3;
const fullPath = window.location.pathname + window.location.search + window.location.hash;
console.log(fullPath);

setInterval(function(){
    if(countdown_seconds===1){
        window.location='https://www.ishopper.info'+fullPath;
    }else{
        countdown_seconds--;
        document.getElementById('countdown_redirect').innerText=countdown_seconds;
        document.getElementById('redirect_dots').innerText+="."
    }
},1000)

