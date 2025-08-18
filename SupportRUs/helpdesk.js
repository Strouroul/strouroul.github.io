


let zammad_check_counter=0;



let agents_online_check_interval=30; //seconds

let agent_button_show=false;

let agent_button_last_status=false;

let agent_check_timer=null;

let agent_toast_alerted=false;


    function refresh_tooltips(){
    // Initialize tooltips
    /* var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
     var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
         return new bootstrap.Tooltip(tooltipTriggerEl)
     })*/

    document.addEventListener("DOMContentLoaded", () => {
        $('[data-bs-toggle="tooltip"]').tooltip();
    })

    /*
     $(document).ready(function(){

    });*/

}

function show_toast_msg(my_status,my_msg){


    let this_toast_obj={
        text: my_msg,
        duration: 3000,
        //  destination: "https://github.com/apvarun/toastify-js",
        //   newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #db122c, #7d2934)",
            zIndex: 9999,
        },
        //  onClick: function(){} // Callback after click
    };

    if(my_status==='success'){
        //
        this_toast_obj.style.background=  "linear-gradient(to right, #29692e, #17bf25)";
    }
    else if(my_status==='error'){
        this_toast_obj.style.background=  "linear-gradient(to right, #7d2934, #db122c)";
    }
    Toastify(this_toast_obj).showToast();
}

function check_zammad_chat(){
    const chat_window =document.querySelector('.zammad-chat')
    if (!chat_window) {
        console.error("chat_window not found.");
        return false;
    }

    const style = window.getComputedStyle(chat_window);
    const isVisible = (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        document.querySelector('.open-zammad-chat').offsetParent !== null
    );

    console.debug("Agent button visible:", isVisible);
    return isVisible;
}


function checkAgentButton() {
    const btn = document.querySelector('.open-zammad-chat');
    if (!btn) {
        console.error("Button not found.");
        return false;
    }

    const style = window.getComputedStyle(btn);
    const isVisible = (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        btn.offsetParent !== null
    );

    console.debug("Agent button visible:", isVisible);
    return isVisible;
}


async function check_helpdesk_agent_status() {

    let this_agent_status = null;

    let event_name = 'chat_status_customer';

    let my_return = {};
    let all_zammad_stats=[];
    return await new Promise((resolve, reject) => {

        try{
            const socket = new WebSocket("wss://helpdesk.ishopper.info/ws");
            // To subscribe to a specific channel for agents' statuses (example):
            const subscribeMessage = /*{
    command: 'subscribe',
    identifier: JSON.stringify({
      channel: 'Support::AgentChannel',
    }),
  }*/
                {
                    "event": event_name,
                    "data": {"session_id": null, "url": "https://supportrus.ishopper.info/", "chat_id": 3}
                }
            ;


            socket.onopen = () => {
             //   console.debug("Connected to Zammad WebSocket!");
                all_zammad_stats.push({success:"Connected to Zammad WebSocket!"})
                socket.send(JSON.stringify(subscribeMessage));
                my_return.ws=true;
                my_return.check_msg=true;
            };

            socket.onmessage = function (event) {
                const message = JSON.parse(event.data);
              //  console.debug('HELPDESK Received message   ');//, message
                all_zammad_stats.push({success:'HELPDESK Received message'})

                let this_RESP = message.filter(resp => resp.event === event_name);
                my_return.got_msg=true;
                if (this_RESP.length > 0) {
                    this_agent_status = this_RESP[0];

                    if (this_agent_status.data.hasOwnProperty('state')) {
                        if (this_agent_status.data.state === 'offline') {
                            my_return.status = 'offline';
                        } else {
                            my_return.status = 'online';
                        }

                    }
                    all_zammad_stats.push({success:`agent_status : `+ this_agent_status.data.state})

                    my_return.zammad=all_zammad_stats;
                   // console.debug(`this_agent_status : `, this_agent_status)
                }
               // console.debug(`ZAMMAD : `,all_zammad_stats);
                socket.close();
                resolve(my_return)

            };

            /*
              socket.onmessage = (event) => {
                console.log("Received message:", event.data);
              };*/

            socket.onerror = (error) => {
              //  console.error("WebSocket error:", error);
                all_zammad_stats.push({'error':"WebSocket error:"+error})
                my_return.error=error;
                reject(my_return)
            };

            socket.onclose = () => {
               // console.log("WebSocket connection closed.");
                all_zammad_stats.push({'error':"WebSocket connection closed."})
                my_return.error="closed";
                reject(my_return)
            };



        }
        catch(err_WS){
            resolve({status:'error',error:err_WS})
        }

    })

}




function check_status_now_live(){
    (async()=>{
        zammad_check_counter++;
        let my_check_status=  await check_helpdesk_agent_status();
        console.debug(
            `check_status_now_live (${zammad_check_counter}) : `,
            my_check_status,
            my_check_status.hasOwnProperty('zammad')
                ? Object.entries(my_check_status.zammad).map(([k, v]) => `${typeof v === 'object' ? JSON.stringify(v) : v}`).join(', ')
                : 'Zammad Status Unknown'
        );

        if(my_check_status.hasOwnProperty('error')){
            agent_button_show=false;

        }
        else{
            if(my_check_status.hasOwnProperty('data')){
                if(my_check_status.data.state === 'offline'){
                    agent_button_show=false;
                }
                else   if(my_check_status.data.state === 'online'){
                    // if(!agent_button_show){}

                    agent_button_show=true;
                }



            }
            else    if(my_check_status.hasOwnProperty('status')){
                if(my_check_status.status  === 'offline'){
                    agent_button_show=false;
                }
                else   if(my_check_status.status  === 'online'){
                    // if(!agent_button_show){}

                    agent_button_show=true;
                }
            }
        }

        try{
            if(document.querySelector('.zammad-chat')){
                document.querySelector('.zammad-chat').style.zIndex=9999;

            }

        }
        catch(err_ZIND){
            console.error(`err_ZIND : `,err_ZIND);
            agent_button_show=false;
        }
   //     console.log(`agent_button_show : `,agent_button_show)

      //  console.log(`agent_button_last_status : `,agent_button_last_status)
        if(agent_button_show!==agent_button_last_status){
            agent_toast_alerted=false;
        }
    //    console.log(`agent_button_last_status : `,agent_button_last_status)

        if(!agent_button_show){

            if(window.location.href.includes('contacts.shtml')){
                /*   document.querySelector('.open-zammad-chat').onclick=function(){
                       //     window.location='/LAYOUT/call_center/contacts.shtml#contact_us_form'
                       // Scroll to the element with id="contact_us_form" without reloading
                       document.getElementById('contact_us_form')?.scrollIntoView({ behavior: 'smooth' });
                   }*/
                //   document.querySelector('.open-zammad-chat').id='zammad_to_contacts';
                //   document.querySelector('.open-zammad-chat').innerHTML='Send Us a message<BR>on this page';
                //   document.getElementById('zammad_to_contacts').style.display='block';
                document.querySelectorAll('.order_service_agent_status').forEach(
                    function(el) {
                        // el.innerText = 'Click me';

                        //this_ITEM.innerHTML+='No Agents Online<BR>Please Leave us a Message';
                        el. onclick=function(){
                            document.getElementById('contact_us_form')?.scrollIntoView({ behavior: 'smooth' });
                        }

                        el. innerHTML='Please Leave us a Message<BR>On this page';
                    }

                )
            }
            else{
                document.querySelectorAll('.order_service_agent_status').forEach(
                    function(el) {
                        // el.innerText = 'Click me';
                        //this_ITEM.innerHTML+='No Agents Online<BR>Please Leave us a Message';

                        el. onclick=function(){
                            window.location='/LAYOUT/call_center/contacts.shtml#contact_us_form'
                        }




                        el. innerHTML='No Agents Online<BR>Please Leave us a Message';
                    }


                )

                //   document.getElementById('zammad_to_contacts').style.display='block';
            }




            setTimeout(function(){

                //  show_layout_alert('No Agents ON')

                if(!agent_toast_alerted){
                    show_toast_msg('error','No Agents Online')
                    agent_toast_alerted=true;
                }

                /*
                document.addEventListener("DOMContentLoaded", async function () {


                })
*/

                /*     vanillaToast
                         .show('Hello, this is vanilla-toast.')
                         .default('A toast notification module writtern in vanilla js that has no dependencies on other libraries.')
                         .default('10', {duration:700, fadeDuration:200})*/


            },3000)

        }
        else{
            document.querySelectorAll('.order_service_agent_status').forEach(
                function(el) {
                    // el.innerText = 'Click me';
                    //this_ITEM.innerHTML+='No Agents Online<BR>Please Leave us a Message';

                    el. onclick=function(){
                        console.log(`OPEN AGENT CHAT`)
                        // window.location='/LAYOUT/call_center/contacts.shtml#contact_us_form'
                        document.querySelector('.open-zammad-chat').click();
                    }

                    //  el. innerHTML='Chat with an Agent';
                } )
            document.querySelectorAll('.agent_status_text').forEach(
                function(el) {
                    //  el.innerHTML = 'Agents Online Found';
                    //this_ITEM.innerHTML+='No Agents Online<BR>Please Leave us a Message';



                      el. innerHTML=`<a href="javascript:void(0);" 
                      onclick="document.querySelector('.open-zammad-chat')!=null?
                      document.querySelector('.open-zammad-chat').click(): false;">
<i class="iconify"  data-bs-toggle="tooltip"
               data-bs-placement="bottom" title="Speak to an agent"
               data-icon="material-symbols:online-prediction-rounded" width="24" height="24"  style="color: #56c162"></i>
Chat with an Agent</a>`;
                } )
            setTimeout(function(){
                if(!agent_toast_alerted){
                    show_toast_msg('success','Agents Online Found')
                    agent_toast_alerted=true;
                }


            },3000)
        }




        agent_button_last_status=agent_button_show;
   //     console.log(`agent_button_show : `,agent_button_show)


        try{
            refresh_tooltips();
        }
        catch(err_NO_REFRESH_TOOLTIP){
            console.error(`err_NO_REFRESH_TOOLTIP : `,err_NO_REFRESH_TOOLTIP)
        }

    })()
}



///////////////////////////////////////////////////////////////////////////////


async function load_HelpDesk_JS() {
    let url='https://helpdesk.ishopper.info/assets/chat/chat-no-jquery.min.js';
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;

        script.onload = () => resolve({ status: 'loaded', url });
        script.onerror = () => reject({ status: 'error', url });

        document.head.appendChild(script);
    });
}



function start_helpDesk_HOOK(){
        let helpDesk_params={
            fontSize: '12px',
            chatId: 3,
            show: true,
            host:'https://helpdesk.ishopper.info/ws',
            debug:false,
            cssUrl:'https://helpdesk.ishopper.info/assets/chat/chat.css'
        };
    (function() {
        try{
            new ZammadChat(helpDesk_params);


            setTimeout(function(){

                try{
                    if(document.querySelector('.zammad-chat')){
                        document.querySelector('.zammad-chat').style.zIndex=9999;
                        agent_button_show=true;
                    }
                    else{
                        agent_button_show=false;
                    }

                    //  console.log(`check_zammad_chat : `,check_zammad_chat())
                }
                catch(err_ZIND){
                    console.log(`err_ZIND : `,err_ZIND)
                }



                /*
                document.addEventListener('DOMContentLoaded', () => {

                });*/

                // Wait for the Zammad chat button to load
                setTimeout(() => {
                    var this_chat_window=document.querySelector('.zammad-chat')||null;
                    var all_agent_stats=  document.querySelectorAll('.agent_status_text') ||null;


                    if(this_chat_window!=null){
                        console.log(`check_zammad_chat isConnected : `,this_chat_window.isConnected);

                        if(this_chat_window.isConnected){


                            if(all_agent_stats!=null){
                                all_agent_stats.forEach(this_txt=>{
                                    this_txt.innerHTML+="<BR>(Speak to an agent)"
                                })
                                agent_button_show=true;
                            }

                        }
                    }
                    else{
                        console.log(`this_chat_window NOT FOUND `);
                        if(all_agent_stats!=null){
                            all_agent_stats.forEach(this_txt=>{
                                this_txt.innerHTML+=`<BR>No Agents Online <i class="iconify"  data-bs-toggle="tooltip"
               data-bs-placement="bottom" title="Send us a message"
               data-icon="famicons:cloud-offline" width="512" height="512"  style="color: #b9512c"></i><BR><a href='/LAYOUT/call_center/contacts.shtml'>(Send Us a Message)</a>`
                            })
                        }

                    }

                    try{
                        // console.log(`AGENT SHOW IS : `,document.querySelector('.open-zammad-chat').style.display)

                        //  console.log(`AGENT zammad-chat SHOW IS : `,document.querySelector('.zammad-chat'))
                        //    console.log("SHOW : "+checkAgentButton());
                        console.log(`check_zammad_chat : `,check_zammad_chat());

                        console.log("agent_button_show : "+agent_button_show);

                        check_status_now_live();

                        agent_check_timer=setInterval(function(){
                            try{
                                check_status_now_live();
                            }
                            catch(err_CHECK){
                                console.error(`err_CHECK : `,err_CHECK)
                            }
                        },agents_online_check_interval*1000)






                    }
                    catch(err_SHOW){
                        console.log(`err_SHOW : `,err_SHOW)
                    }
                }, 1000); // 1 second delay – adjust if needed



            },600)
        }
        catch(err_ONLINE_AGENT_CHAT){

            console.log(`err_ONLINE_AGENT_CHAT : `,err_ONLINE_AGENT_CHAT);

            show_toast_msg('error','Help Desk Offline ?????')
        }



    })();
}



function refresh_helpdesk_status(){
    try{
        // console.log(`AGENT SHOW IS : `,document.querySelector('.open-zammad-chat').style.display)

        //  console.log(`AGENT zammad-chat SHOW IS : `,document.querySelector('.zammad-chat'))
        //    console.log("SHOW : "+checkAgentButton());
        console.log(`check_zammad_chat : `,check_zammad_chat());

        console.log("agent_button_show : "+agent_button_show);

        check_status_now_live();

        if(agent_check_timer==null){
            agent_check_timer=setInterval(function(){
                try{
                    check_status_now_live();
                }
                catch(err_CHECK){
                    console.error(`err_CHECK : `,err_CHECK)
                }
            },agents_online_check_interval*1000)
        }







    }
    catch(err_SHOW){
        console.log(`err_SHOW : `,err_SHOW)
    }
}

if(window.ZammadChat){
    console.debug(`load_HelpDesk : loaded already` );
    start_helpDesk_HOOK();
}
else{

    load_HelpDesk_JS().then(load_HelpDesk=>{
        console.debug(`load_HelpDesk : `,load_HelpDesk);
        start_helpDesk_HOOK();

    }).catch(err_HELPDESK=>{
        console.debug(`err_HELPDESK : `,err_HELPDESK);
        show_toast_msg('error','Error Loading Helpdesk Chat ?')
    });
}

