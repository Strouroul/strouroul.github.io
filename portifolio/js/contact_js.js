let status_HTML=`
<div id='card' class="animated fadeIn">
    <div id='upper-side'>
        <?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
       <!-- <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" id="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
        <path d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65
\tc-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382
\tc0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209
\tc0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091
\tc0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027
\tc0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865
\tC131.967,94.755,132.296,93.271,131.583,92.152z" />
            <circle fill="none" stroke="#ffffff" stroke-width="5" stroke-miterlimit="10" cx="109.486" cy="104.353" r="32.53" />
      </svg>-->


            <div id="checkmark" class="success-icon">
                <div class="success-icon__tip"></div>
                <div class="success-icon__long"></div>
            </div>


     <!--   <h3 id='status'>
            Success
        </h3>-->
    </div>
    <div id='lower-side'>
        <p id='message'>
           <div style="align-content: center;">
           <span>Thank You for contacting me !! </span><div id="redirect_time" style="display: inline-block;"></div> <BR>
            <span id="redirect_dots"></span>
           </div>
        <p>Email Sent  ...  </p>
       <!-- <p>
             
        </p>-->
        </p>
        
    </div>
</div>`;




let modal_title_header_for_contact_html="Thank You for contacting Haytham Meiz © 2024";


let contact_firstname = document.getElementById("firstname");
let contact_lastname = document.getElementById("lastname");
let contact_email = document.getElementById("email");
let contact_phone = document.getElementById("phone");
let contact_message = document.getElementById("message");
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


async function postAjax_ASYNC(url, data, success) {

    return new Promise((resolve, reject) => {
        let my_data = "";

        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                my_data = xhr.responseText;
                resolve( success(xhr.responseText));
                //  return (xhr.responseText);

            }
            else if (xhr.readyState > 3 && xhr.status !== 200) {
                reject("Request failed with status: " + xhr.status);
            }
            /*else {

                reject ( "Request failed with status: " + xhr.status);
            }*/
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    })




    //return my_data;

    //return my_data;
}


let last_email_sent=0;
function send_contact_info(my_btn) {
    var myMAG = 'https://broadcast.ishopper.info/info/contactus';
    //'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
    var myJSON =null;


    let user_found=null;
  //  my_btn.disabled=true;

    let my_now=new Date().getTime();
    if(last_email_sent<my_now ){
////////
        try{
            if(eval(final_page_user!=null)){
                //user_found=final_page_user;
            }
            else{
                final_page_user=null;
            }
        }
        catch(e_FINAL_PAGE_USER){
            //console.log(`e_FINAL_PAGE_USER : ${e_FINAL_PAGE_USER}`)
            final_page_user=null;
        }
        try{
            if(final_page_user!=null&&
                final_page_user.hasOwnProperty("user_json")
            ){
                myJSON=   JSON.parse(JSON.stringify(final_page_user .user_json))           ||null;
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
                my_btn.disabled=false;
            });
        } else {
            if (contact_message.value !== "") {
                myJSON["message"] = contact_message.value;
                can_send = true;
            } else {
                errors_found.push("message");
            }
        }


        if (can_send) {
            // document.getElementById("submit").disabled=true;
            my_btn.disabled=true;

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
            console.log(`myJSON : ${JSON.stringify(myJSON)}`)
            let loading_alert=false;
            document.getElementById("modal_body").style.backgroundColor ='#a6e7ff';
            document.getElementById("modal_body").style.color="green";

            document.getElementById("modal_title_header").style.backgroundColor ='blue';
            modal_title_header.innerHTML = modal_title_header_for_contact_html;//"Thank You for contacting Haytham Meiz © 2024";


            modal_body.innerHTML =  "loading...<BR>Please Wait for Confirmation ... <span class=\"loader\"></span>";
            btn.click();
            postAjax_ASYNC(
                myMAG,
                {param: JSON.stringify(myJSON)},

                function (data) {
                    console.log("SERVER SAID:" + data);
                    let this_JSON=null;
                    try{
                        this_JSON=JSON.parse(  data);
                    }
                    catch(err_JSON){
                        this_JSON=data;
                    }

                    let status_found=false;

                    if(this_JSON.hasOwnProperty("status")){
                        if(this_JSON.status===true||this_JSON.status==="success"){status_found=true;}
                    }

                    document.getElementById("modal_title_header").innerHTML =modal_title_header_for_contact_html; // "Thank You for contacting Haytham Meiz © 2024";




                    if(status_found){
                        document.getElementById("modal_body").style.backgroundColor ='#a6e7ff';
                        document.getElementById("modal_body").style.color="green";
                        document.getElementById("modal_body").innerHTML = status_HTML;//JSON.stringify(this_JSON);
                    }else{
                        document.getElementById("modal_body").style.backgroundColor ='red';
                        document.getElementById("modal_body").style.color="black";
                        document.getElementById("modal_body").innerHTML =  JSON.stringify(this_JSON);
                    }


                    if(btn_status==="OFF"){ btn.click();}

                    document.getElementById("submit").disabled=false;
                    loading_alert=true;



                    last_email_sent=my_now+(1000*60*2)
                    return this_JSON;
                });



        }
        else {
            console.log("errors_found : " + errors_found);
            show_alert("errors_found : " + errors_found);
            my_btn.disabled=false;
            return false;




        }
        ////////////////////

    }
    else{
        show_alert(`Cant Send before ${new Date(last_email_sent).toLocaleString()}`)
    }




}