

let my_env_console ="test";

let is_App_Android=false;
let is_App_iOS=false;
let is_Web=true;


let isLoggingEnabled = false; // Toggle this to enable/disable logging


let loggin_status=true;

// Save the original console.log function
const originalConsoleLog = console.log;

let alert_console_disabled=false;


function check_user_phone_number(){
    /*  if(!isLoggingEnabled){
          enable_console_log();
      }*/
    try{
        if(eval(user_phone_app!=null)){

            console_log_success('PHONE APP : '+user_phone_app);
            is_App_Android=true;
            is_App_iOS=true;
            is_Web=false;
        }
    }
    catch(e_PHONE){
        //console_log_error(`e_PHONE : ${e_PHONE}`);

        //   console_log_success(`WEB BROWSER ? `)
        console_log_success( "BROWSER NOT APP: "+JSON.stringify(agentInfo)) ;
        is_Web=true;
        is_App_Android=false;
        is_App_iOS=false;
    }



    /* if(!isLoggingEnabled){
          disable_console_log();
      }*/
}





function show_page_device_info(){

    if(!loggin_status&&my_env_console!=="test"){
        enable_console_log(); //later for production ONLY
    }
    if(is_App_Android){

        if(loggin_status){
            console_log_success(`is_App_Android : ${is_App_Android}`)
        }
        else{
            console_log_warn(`is_App_Android : ${is_App_Android}`)
        }
    }
    else{
        console_log_error(`is_App_Android : ${is_App_Android}`)
    }

    if(is_App_iOS){
        if(loggin_status){
            console_log_success(`is_App_iOS : ${is_App_iOS}`)
        }
        else{
            console_log_warn(`is_App_iOS : ${is_App_iOS}`)
        }

    }
    else{
        console_log_error(`is_App_iOS : ${is_App_iOS}`)
    }

    if(is_Web){
        if(loggin_status){
            console_log_success(`is_Web : ${is_Web}`)
        }
        else{
            console_log_warn(`is_Web : ${is_Web}`)
        }


    }
    else{
        console_log_error(`is_Web : ${is_Web}`)
    }


    if(!loggin_status&&my_env_console!=="test"){
        disable_console_log(); //later for production ONLY
    }


}





function set_console_setting_now(args){
    var font_color='';
    if (isLoggingEnabled) {
        font_color='color: yellow; font-size: 18px';

        // Your custom logic here
        // For example, prepend a custom message to all log messages

        originalConsoleLog.apply(console, [(`%cEnabled log: ${args.toString()}`  ),
            font_color  ]);   //  ...args*/


    }
    else{
        if(!alert_console_disabled){
            font_color='color: red; font-size: 18px';
            originalConsoleLog.apply(console, ['%cLog Disabled', font_color ]);
            alert_console_disabled=true;
        }
    }
}

function disable_console_log(){


    isLoggingEnabled=false;
    let font_color= ''; //'color: yellow; font-size: 18px';

// Overwrite console.log
    console.log = function(...args) {

        set_console_setting_now(args);


    };
}


function enable_console_log(){

    isLoggingEnabled=true;
    alert_console_disabled=false;
    // Overwrite console.log
    // console.log =  originalConsoleLog;

    console.log = function(...args) {


        set_console_setting_now(args);

    };




}



function console_log_warn(my_MSG){
    // console.log(`%c${my_MSG}`, 'color: yellow; font-size: 20px;');
    var font_color='color: yellow; font-size: 20px';

    // Your custom logic here
    // For example, prepend a custom message to all log messages

    originalConsoleLog.apply(console, [(`%c console_log_warn: ${my_MSG.toString()}`  ),
        font_color  ])
}
function console_log_success(my_MSG){
    //console.log(`%c${my_MSG}`, 'color: green; font-size: 16px;');
    var font_color='color: green; font-size: 20px';

    // Your custom logic here
    // For example, prepend a custom message to all log messages

    originalConsoleLog.apply(console, [(`%c console_log_success: ${my_MSG.toString()}`  ),
        font_color  ])
}

function console_log_error(my_MSG){
    //console.log(`%c${my_MSG}`, 'color: red; font-size: 20px;');
    var font_color='color: red; font-size: 20px';

    // Your custom logic here
    // For example, prepend a custom message to all log messages

    originalConsoleLog.apply(console, [(`%c console_log_error: ${my_MSG.toString()}`  ),
        font_color  ])
}

var    agentInfo = detect.parse(navigator.userAgent);



// Access the variable
document.addEventListener('DOMContentLoaded', function () {


    //WORKS FINE BUT DOESNT SHOW THE LINES OF CODE NOW TOO
    //UNCOMMENT FOR PRODUCTION WHEN SECURE_JS IS READY TOO
    /*if(my_env_console==="test"){

        enable_console_log();

        //   disable_console_log();

    }
    else{
        if(!loggin_status){
            disable_console_log(); //later for production ONLY
        }

    }*/



   // console_log_success(`userAgent (agentInfo): ${ (navigator.userAgent)}`)
    console.log(`userAgent (agentInfo): ${ (navigator.userAgent)}`)


    show_page_device_info();


    // console.log('PHONE NUMBER FROM APP fully loaded and parsed');

    //CHECK IF APP with PHONE #
    try {
        check_user_phone_number();
    } catch (e_APP_PHONE) {
        console.log(`e_APP_PHONE : ${e_APP_PHONE}`)
    }


    /*console.log(`my_env_console : ${my_env_console}`)
    console.log(`loggin_status : ${loggin_status}`)
    console.log(`isLoggingEnabled : ${isLoggingEnabled}`)*/

  /*  if(my_env_console==="test" ){
        if(loggin_status){
            if( !isLoggingEnabled){
                enable_console_log();
            }else{
                console_log_warn(`LOGGING ENABLED ALREADY`)
            }

        }else{
            console_log_error(`LOGGING DISABLED`)
        }

        //  disable_console_log();

    }
    else{
        if(loggin_status||isLoggingEnabled){
            disable_console_log(); //later for production ONLY
        }

    }*/
    //disable_console_log(); //later for production ONLY




});
