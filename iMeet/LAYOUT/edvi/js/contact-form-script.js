/*==============================================================*/
// Contact Form JS
/*==============================================================*/

let contact_error_messages = {
    "regex": {
        "status": "The email format is invalid. Please check the syntax.",
        "icon": "⚠️"
    },
    "typo": {
        "status": "There seems to be a typo in the email address. Double-check the spelling.",
        "icon": "🔤"
    },
    "disposable": {
        "status": "Disposable email addresses are not allowed. Please use a valid email address.",
        "icon": "🚫"
    },
    "mx": {
        "status": "The domain's mail server (MX record) could not be found. Please check the email domain.",
        "icon": "📡"
    }
};


  main_layout_check=true;


function send_form(){
    let is_good=false;
    // Add event listener for form submission
    // document.getElementById('contactForm').addEventListener('submit', validateForm);

    let my_validation=validateForm();
    console.log(`my_validation : ${my_validation}`)
    //console.log(`FORM STATUS : ${$(this).data('bs.validator').hasErrors()}`)



    if(my_validation!=null){
        if(my_validation.hasOwnProperty('error')){

        }

       else if(my_validation.hasOwnProperty('form_data')){
            is_good=true;
        }

    }
    /*
     if ($(this).data('bs.validator').hasErrors()) {
         event.preventDefault();  // Do not submit the form if there are errors
         console.log("Form has validation errors."  );
         // Loop through each form input and log the errors
         // Loop through each input and log any validation errors

     } else {
         is_good=true;
            event.preventDefault();  // Optional: Prevent form submission for testing
         console.log("Form is valid. Submitting...");
     }
     */
    // event.preventDefault();





    if (!is_good // event.isDefaultPrevented()
    ) {
        //  event.preventDefault();
        // handle the invalid form...
        formError();
        submitMSG(false,  my_validation.join('<BR>'));
    } else {
        // everything looks good!
        // event.preventDefault();

        submitForm();


    }
}

// Function to validate the form
function validateForm() {
    //  event.preventDefault(); // Prevent form submission

   // const form = document.getElementById('contactForm');
    let errors = [];

    let form_data={};

    let my_return={};
    // Name validation (required field)
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        name.setAttribute('data-error','Name is required.')
        errors.push('Name is required.');
    }else{
        form_data.name = name.value.trim();
    }

    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        errors.push('Email is required.');
    }
    else if (!emailRegex.test(email.value)) {
        errors.push('Please enter a valid email address.');
        email.setAttribute('data-error','Please enter a valid email address.')
    }else{
        form_data.email = email.value.trim();
    }

    // Phone number validation (must be 10 digits)
    const phone = document.getElementById('phone_number');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.value.trim()) {
        errors.push('Phone number is required.');
        phone.setAttribute('data-error','Phone number is required.')
    }
    else if (!phoneRegex.test(phone.value)) {
        errors.push('Please enter a valid 10-digit phone number.');
        phone.setAttribute('data-error','Please enter a valid 10-digit phone number.')
    }else{
        form_data.phone = phone.value.trim();
    }

    // Subject validation (required field)
    const subject = document.getElementById('msg_subject');
    if (!subject.value.trim()) {
        errors.push('Subject is required.');
        subject.setAttribute('data-error','Subject is required.')
    }else{
        form_data.subject = subject.value.trim();
    }

    // Message validation (required field)
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        errors.push('Message is required.');
        message.setAttribute('data-error','Message is required.')
    }else{
        form_data.message = message.value.trim();
    }

    // Check if there are any errors and log them
    if (errors.length > 0) {
        console.log('Validation Errors:');
        errors.forEach((error) => {
            console.log(error);
        });
        my_return.error=errors;
    }
    else {
        console.log('Form is valid, no errors found.');
        // Form is valid, you can proceed with the form submission here if needed.

        console.log(`form_data :`,form_data);
        my_return.form_data=form_data;
    }


    return my_return; // errors;
}



function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var phone_number = $("#phone_number").val();
    var message = $("#message").val();

    let my_post_data={
        name:name,
        email:email,
        subject:msg_subject,
        phone:phone_number,
        message:message
    }
    let now=new Date().getTime();
    let can_send=false;
    if(last_send_time!=null){
        if(now>last_send_time) {
            can_send=true;
        }
    }else{
        can_send=true;

    }

    if(can_send){
        $.ajax({
            type: "POST",
            url: "/contact",
            data:JSON.stringify(my_post_data), // "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&phone_number=" + phone_number + "&message=" + message,


            contentType: "application/json",  // Set content-type to JSON
            success : function(my_response){
                console.log(`CONTACT SERVER SAID : ${JSON.stringify(my_response)}`)
                if(my_response.hasOwnProperty('status')){
                    let statustxt=my_response.status;
                    if (statustxt == "success"){
                        modal_body.innerHTML="Message Sent Successfully";
                        setTimeout(function(){
                            span.click();
                        },1000)
                        formSuccess();
                        last_send_time=new Date().getTime()+next_send_time;
                    } else {
                        formError();
                        let reasons='';
                        my_response.reasons.forEach(found_reason=>{
                            reasons+=`${contact_error_messages[found_reason].icon} ${contact_error_messages[found_reason].status}<BR>`;
                        })
                        submitMSG(false,statustxt+`<BR><small style="color: red;">${reasons}</small>`);
                        modal_body.innerHTML="Message Not Sent !!";
                        setTimeout(function(){
                            span.click();
                        },1000)
                    }
                }

            }
        });
    }else{
        console.log(`CANT SEND BEFORE ${new Date(last_send_time*1).toLocaleString()}`)
    }

}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass()
        .addClass('shake animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 tada animated text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).html(msg);
}



function parse_recaptcha_for_next(reCaptch_INFO,my_call_back){



    let data=reCaptch_INFO.data;
    let this_action_name=reCaptch_INFO.action;
    if(data.hasOwnProperty('status')){
        console.log(`data status : ${JSON.stringify(data.status)}`);
        if(data.hasOwnProperty('reCaptcha')){
            console.log(`data  reCaptcha : ${JSON.stringify(data.reCaptcha)}`);
            if(data.reCaptcha.action===this_action_name&&
                data.reCaptcha.score>0.5){
                my_call_back();
            }else{
                show_swal_toast('error','reCaptcha Failed')
            }



        }else{
            show_swal_toast('error','reCaptcha Failed')
        }

    }else{
        show_swal_toast('error','Please Fix your errors')
    }




}


let contact_form_css="#contactForm";
let teacher_contact_form_css="#contact_teacher_form";


function set_contact_validator(){

    (function ($) {
        "use strict"; // Start of use strict



        $(document).ready(function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            // var forms = document.querySelectorAll('.needs-validation')



            // Loop over them and prevent submission
            /*
               Array.prototype.slice.call(forms)
                   .forEach(function (form) {
                       form.addEventListener('submit', function (event) {
                           event.preventDefault();
                           if (!form.checkValidity()) {
                               event.preventDefault()
                               event.stopPropagation()
                           }

                           form.classList.add('was-validated')
                       }, false)
                   })
       */

            /*
            $('#contactForm').validator({
                feedback: {
                    success: 'glyphicon-ok',  // Bootstrap success icon
                    error: 'glyphicon-remove'  // Bootstrap error icon
                },
                custom: {
                    // Custom validator for fields (if necessary)
                    phoneNumber: function($el) {
                        var phoneRegex = /^[0-9]{10}$/;  // Example regex for a 10-digit phone number
                        if (!phoneRegex.test($el.val())) {
                            // Log the error message directly to the console
                            var errorMessage = 'Please enter a valid 10-digit phone number.';
                            console.log(errorMessage);  // This will log the error message to the console
                            return errorMessage;  // Return the message to trigger validation feedback
                        }
                    }
                }
            });
    */



            $(contact_form_css).validator().on("submit", function (event) {
                let is_good=false;
                let my_validation=validateForm();
                console.log(`my_validation : ${my_validation}`)
                //console.log(`FORM STATUS : ${$(this).data('bs.validator').hasErrors()}`)

               /* if(my_validation!=null){
                    if(my_validation.length>0){}
                    else{
                        is_good=true;
                    }
                }*/
                if(my_validation!=null){
                    if(my_validation.hasOwnProperty('error')){

                    }

                    else if(my_validation.hasOwnProperty('form_data')){
                        is_good=true;
                    }

                }

                if (!is_good // event.isDefaultPrevented()
                ) {
                    show_swal_toast('error','Fix errors 1st please')
                    //  event.preventDefault();
                    // handle the invalid form...
                    formError();
                    submitMSG(false,  my_validation.error.join('<BR>'));
                }
                else{
                    // let this_action_name='contact_form';
                    let reCaptch_INFO={
                        action:'contact_form',

                    }
                    modal_body.innerHTML="Loading.. Making Sure your not a bot !!"
                    btn.click();

                    handleFormSubmission(reCaptch_INFO.action,function(data){
                        console.log(`data after reCaptcha : ${JSON.stringify(data)}`);

                        reCaptch_INFO.data=data;
                        if(reCaptch_INFO.hasOwnProperty('data')&&reCaptch_INFO.hasOwnProperty('action')){
                            parse_recaptcha_for_next(reCaptch_INFO, function (){


                                send_form();
                            })
                        }else{
                            show_swal_toast('error','reCaptcha Error')
                        }




                    })
                }




            });


            $(teacher_contact_form_css).validator().on("submit", function (event) {
                let is_good=false;
              //  let my_validation=validateForm();
            //    console.log(`my_validation : ${my_validation}`)
                //console.log(`FORM STATUS : ${$(this).data('bs.validator').hasErrors()}`)

                let is_loggedIn=false;
                try{
                    if(eval(final_page_user!=null)){
                        if(final_page_user!=null&&Object.keys(final_page_user).length>0){
                            is_loggedIn=true;
                        }

                    }
                }
                catch(err_LOGGEDIN){
                    console.log(`err_LOGGEDIN : ${err_LOGGEDIN}`)
                }
                modal_body.innerHTML="Loading.. Making Sure your not a bot !!"
                btn.click();
                if(!is_loggedIn){
                    show_swal_toast('error','Not Logged in');

                    modal_body.classList.add('text-secondary');
                    modal_body.classList.add('dark:text-secondary-light');

                    modal_body.innerHTML=`<a href='/login/local?redirectUrl=${window.location.pathname}'>Need to Login 1st ?</a>`;

                    btn.click();

                    return "Need to Login";
                }
                else{
                    let my_validation=validateForm();
                    console.log(`my_validation : `,my_validation)
                    if(my_validation!=null){
                        if(my_validation.hasOwnProperty('error')){

                        }

                        else if(my_validation.hasOwnProperty('form_data')){
                            is_good=true;
                        }

                        try{
                            if(eval(final_page_user!=null)&&(eval(this_teacher_details_json!=null))){
                                if(final_page_user!=null&&Object.keys(final_page_user).length>0){
                                    if(this_teacher_details_json.teacher_user_json.email===my_validation.form_data.email){
                                        is_good=false;
                                        my_validation.error=[];
                                        my_validation.error.push('Cant Send mail to yourself !!')
                                    }else{
                                        is_good=true;
                                    }

                                }

                            }
                        }
                        catch(err_LOGGEDIN){
                            console.log(`err_LOGGEDIN : ${err_LOGGEDIN}`)
                        }

                    }
                    if (!is_good // event.isDefaultPrevented()
                    ) {
                        span.click();
                        show_swal_toast('error','Fix errors 1st please')
                        //  event.preventDefault();
                        // handle the invalid form...
                        formError();
                        submitMSG(false,  my_validation.error.join('<BR>'));
                    }
                    else {
                        // let this_action_name='contact_form';
                        let reCaptch_INFO = {
                            action: 'teacher_contact_form',

                        }

                        console.log(`reCaptch_INFO : `,reCaptch_INFO)
                        console.log(`my_validation : `,my_validation.form_data);

                        handleFormSubmission(reCaptch_INFO.action,
                            function(data){
                                console.log(`data after reCaptcha : ${JSON.stringify(data)}`);
                                reCaptch_INFO.data=data;
                                if(reCaptch_INFO.hasOwnProperty('data')&&
                                    reCaptch_INFO.hasOwnProperty('action')
                                ){
                                    parse_recaptcha_for_next(reCaptch_INFO,
                                        function (){
                                            //   send_form();
                                            //       contact_teacher_message(my_validation.form_data);

                                            contact_teacher_message(this_teacher_details_json,my_validation.form_data);
                                        })
                                }else{
                                    show_swal_toast('error','reCaptcha Error')
                                }

                            })
                    }

                }




            });


        });





    }(jQuery)); // End of use strict
}



function contact_teacher_message(my_teacher_details,form_data){
    // Initiate Variables With Form Content


    /*
    var name = $("#name").val();

    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var phone_number = $("#phone_number").val();
    var message = $("#message").val();

    let my_post_data={
        name:name,
        email:email,
        subject:msg_subject,
        phone:phone_number,
        message:message
    }

     */
    let now=new Date().getTime();
    let can_send=false;
    if(last_send_time!=null){
        if(now>last_send_time) {
            can_send=true;
        }
    }else{
        can_send=true;

    }

    console.log(`my_teacher_details : `,my_teacher_details.teacher_user_code)

    let contact_url='/teacher/'+my_teacher_details.teacher_user_code+'/contact';


    if(can_send){
        $.ajax({
            type: "POST",
            url: contact_url ,  // "/contact",
            data:JSON.stringify(form_data), // "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&phone_number=" + phone_number + "&message=" + message,


            contentType: "application/json",  // Set content-type to JSON
            success : function(my_response){
                console.log(`CONTACT SERVER SAID : ${JSON.stringify(my_response)}`)

                if(my_response.hasOwnProperty('status')){

                    let statustxt=my_response.status;
                    if (statustxt == "success"){
                        //formSuccess();
                        $("#contact_teacher_form")[0].reset();
                        modal_body.innerHTML="Message Submitted!";
                        submitMSG(true, "Message Submitted!")
                        last_send_time=new Date().getTime()+next_send_time;
                    } else {
                        formError();
                        span.click();
                        let reasons='';
                        if(  my_response.reasons){
                            my_response.reasons
                                .forEach(found_reason=>{
                                      reasons+=`${
                                          contact_error_messages[found_reason].icon
                                      } ${contact_error_messages[found_reason].status}<BR>`;
                                 })
                        }

                        submitMSG(false,statustxt+`<BR><small style="color: red;">${reasons}</small>`);
                    }
                }



            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                console.error("Status:", status);
                console.error("Response:", xhr.responseText);
                // You can display an error message or take other actions here
            }
        });
    }
    else{
        console.log(`CANT SEND BEFORE ${new Date(last_send_time*1).toLocaleString()}`)

        submitMSG(false,`Cant Send Till <BR><small style="color: red;">${new Date(last_send_time*1).toLocaleString()}</small>`);
    }




}


set_contact_validator();