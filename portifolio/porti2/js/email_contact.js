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

function send_contact_info() {
    var myMAG = 'https://iride.ishopper.info/info/contactus';
    //'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
    var myJSON =null;
    try{
        if(final_page_user!=null&&final_page_user.hasOwnProperty("user_json")){
            myJSON=   JSON.parse(JSON.stringify(final_page_user .user_json))
                ||null;
        }
        else{
            myJSON={"jsID": IDGenerate()+"_"+IDGenerate()+"_"+IDGenerate()+"_"+new Date().getTime(),"displayName":"GUEST"}
        }


        //
    }
    catch(e_USER){
        console.log(e_USER);
        myJSON=   {"jsID": IDGenerate()+"_"+IDGenerate()+"_"+IDGenerate()+"_"+new Date().getTime(),"displayName":"GUEST"}
    }


    console.log(`JSON : ${JSON.stringify(myJSON)}`)
    //  console.log("myJSON : "+ myJSON )
    // Get all input elements inside the div with id "contact-form"
    const inputElements = document.querySelectorAll('.contact-form input');

    //  console.log("myJSON : "+JSON.stringify(myJSON))

    let errors_found = [];

    // Loop through the input elements
    inputElements.forEach((input) => {
        if (input.value !== "") {
            // Do something with each input element
            //  console.log(input.id+" : "+input.value); // Example: Output the input value
            //   document.getElementById(input.id).removeAttribute('required');
            myJSON[input.id] = input.value;
            document.getElementById(input.id).setAttribute('required',true);
        } else {
            errors_found.push(input.id)
        }

    });

    let can_send = false;
    if (errors_found.length > 0) {
        inputElements.forEach((input) => {
            if (input.value !== "") {
                document.getElementById(input.id).removeAttribute('required' );
            } else {
                document.getElementById(input.id).setAttribute('required',true);
            }

        });
    } else {
        if (contact_message.value !== "") {
            myJSON["message"] = contact_message.value;
            can_send = true;
        } else {
            errors_found.push("message");
        }
    }


    if (!can_send) {
        console.log("errors_found : " + errors_found);
        show_alert("errors_found : " + errors_found);

        return false;
    } else {
        try {
            if (eval(final_page_user) != null) {
                myJSON["user"] = final_page_user;
            } else {
                myJSON["user"] = "NOT LOGGED IN";
            }
        } catch {
            myJSON["user"] = "NOT LOGGED IN";
        }
        // console.log(JSON.stringify(myJSON))

        /*  myJSON["firstname"]=contact_firstname.value;
          myJSON["lastname"]=contact_lastname.value;
          myJSON["email"]=contact_email.value;
          myJSON["phone"]=contact_phone.value;
          myJSON["message"]=contact_message.value;*/



        document.getElementById("submit").disabled=true;
        modal_title_header.innerHTML = "Thank You for contacting iRide © 2023";


        modal_body.innerHTML =
            "loading...";
        btn.click();
        let loading_alert=false;
        postAjax_ASYNC(
            myMAG,
            {param: JSON.stringify(myJSON)},

            function (data) {
                console.log("SERVER SAID:" + data);
                let thisJSONNOW = JSON.parse(data);
                modal_body.innerHTML = JSON.stringify(thisJSONNOW);
                modal_title_header.innerHTML = "Thank You for contacting iRide © 2023";
                if(btn_status==="OFF"){ btn.click();}

                document.getElementById("submit").disabled=false;

                loading_alert=true;

                return thisJSONNOW;
            });



    }


}