
let channelName ='presence-ishopper';

let pusher =null;

var repeatInterval = 1000; // 2000 ms == 2 seconds


var statTIMER;


let myEVENTS={
    "myCHANNEL":null,
    "channelName":'presence-ishopper',

        "client-online-user":function(data)  {
          //  console.log("client-online-user DATA NOW : "+JSON.stringify(data));
            //add to list if not there

            if( data.hasOwnProperty("id")){
                if(document.getElementById( "user_" +data.id)!=null){
                 //   console.log("ALREADY IN LIST  : "+data.id);
                }else{
                    let channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe( myEVENTS.channelName );
                    let user = channelNOW.members.get(data.id);
                    addMemberToUserList(user);
                }
            }

           // document.getElementById("divLOG").innerHTML=JSON.stringify(data);

        },
    "client-chat-msg-seen":function(data) {
     /*   console.log("client-chat-msg-seen DATA NOW : " + JSON.stringify(data));
        if(document.getElementById('divSTATUSmsgID'+data.MSGID)!=null){
            document.getElementById('divSTATUSmsgID'+data.MSGID).innerHTML="SEEN";
        }else{
            console.log('divSTATUSmsgID'+data.MSGID);
        }*/
    },
    "client-chat-msg-seen-other":function(data) {
        console.log("client-chat-msg-seen-other DATA NOW : " + JSON.stringify(data));
    },
    "client-chat-msg-seen-me":function(data) {
        //console.log("client-chat-msg-seen-me DATA NOW : " + JSON.stringify(data));


        if(document.getElementById("divSTATUSmsgID"+data.MSGID)!=null){
            if(document.getElementById("divSTATUSmsgID"+data.MSGID).innerHTML==="SEEN"){}
            else{
                let myJSONnow={
                    MSGID:data.MSGID,
                    STATUS:"SEEN",
                    time:new Date().getTime(),
                    FROM:data.FROM,
                    TO:data.TO,
                    message:"client-chat-msg-seen-me  FROM  "+data.FROM + "  MSGID : "+data.MSGID,
                };
                if(document.getElementById("divSTATUSmsgID"+data.MSGID)!=null){
                    document.getElementById("divSTATUSmsgID"+data.MSGID).innerHTML=myJSONnow.STATUS;
                }else{
                    console.log("divSTATUSmsgID"+data.MSGID+ "   NOT FOUND");
                }
            }
        }



    },
 
    "client-chat-msg":function(data)  {
       // console.log("client-chat-msg DATA NOW : "+JSON.stringify(data));

        if(pageLISTEN.get_user_JSON.id===data.TO){
            var otherID;
            otherID=data.FROM;
        let myJSONnow={
            MSGID:data.MSGID,
            STATUS:"RECV",
            time:new Date().getTime(),
            FROM:data.FROM,
            TO:data.TO,
            message:data.message,
        };


            addCHATMSGtoDIV( "divRECVMSGCHAT"+otherID,myJSONnow,"OTHER");

       // else{otherID=data.FROM;    }


        let triggered = myEVENTS.myCHANNEL.trigger("client-chat-msg-seen-me", myJSONnow  ,       { socket_id: otherID });
     //   document.getElementById("divMSGrecd").innerHTML="MSG FROM USER : "+data.FROM+
      //      "<BR>"+JSON.stringify(data);
        }
    },
    "client-user-ping":function(data)  {
        console.log("client-user-ping DATA NOW : "+JSON.stringify(data));
      //  document.getElementById("divMSGrecd").innerHTML="MSG FROM USER : "+data.FROM+
        //    "<BR>"+JSON.stringify(data);

    },

    "client-sys-msg":function(data)  {
        console.log("client-sys-msg DATA NOW : "+JSON.stringify(data));
        document.getElementById("divLOG").innerHTML=JSON.stringify(data);

    },
    "pusher:subscribe":function(data)  {
        console.log("pusher:subscribe NOW : "+JSON.stringify(data));
        document.getElementById("divLOG").innerHTML=JSON.stringify(data);

    },

    "pusher:signin":function(data)  {
        console.log("pusher:signin DATA NOW : "+JSON.stringify(data));
        document.getElementById("divLOG").innerHTML=JSON.stringify(data);

    },

    "pusher:ping":function(data)  {
        console.log("pusher:ping  DATA NOW : "+JSON.stringify(data));
        document.getElementById("divLOG").innerHTML=JSON.stringify(data);

    },
    "pusher:member_added":function(member)  {
        console.log("member_added : "+JSON.stringify( member));
        //getROOMUSER();

        if(member.id===pageLISTEN.get_user_JSON.id){}
        else{
            if(document.getElementById( "user_" +member.id)!=null){
                console.log("ALREADY IN LIST  : "+member.id);
            }else{
              //  var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe( channelName );
              //  var user = channelNOW.members.get(data.id);
                addMemberToUserList(member);
            }

        }
    },


    "pusher:member_removed":function (member)  {
        const userEl = document.getElementById("user_" + member.id);
        if(userEl!=null){
            userEl.parentNode.removeChild(userEl);
        }
    },
    "client-online-call-answer":function(data) {
      //  console.log("client-online-call-answer  :"+JSON.stringify(data));
        if ((data["ACTION"] === 'ANSWER_MSG') && (data["TO"] === pageLISTEN.get_user_JSON.id)) {
            let  myCONN = get_CONNECTION_FOR_PEER(data["FROM"], "");
            let   myCONNJSON = myCONN["PC_CONNECTION"];
            myCONNJSON.setRemoteDescription(new RTCSessionDescription(data["DESC"]));


            myCONN.PC_CONNECTION_STATUS=   window.setInterval(function(){
                myCONNJSON.getStats( ) .then(function(results){
                    showRemoteStats(results,myCONNJSON);
                }, function(err) {

                    console.log("TIMER CLEARED");
                    window.clearInterval(myCONN.PC_CONNECTION_STATUS);
                    myCONN.PC_CONNECTION_STATUS=null;
                    console.log(err);}) ;

            }, 1000);
            console.log("START STATS FOR CONN");

        }

    },



    "client-online-call-offer":function(data) {
     //   console.log("client-online-call-offer  :"+JSON.stringify(data));
        if ((data["ACTION"] === 'OFFER_MSG') && (data["OTHER"] === pageLISTEN.get_user_JSON.id)) {
            //OFFER COMMING TO ME NOW TO ANSWER
            if (startTime == null) { startTime = window.performance.now(); }
            let message =  data["DESC"] ;
            //  console.log("message : " + JSON.stringify(message.sdp));
            let otherID =  data["ME"];
            // if (data["OTHER"] ===pageLISTEN.get_user_JSON.id) { console.log("ID SWITCHED RTC ??");otherID = data["ME"]; }

            let   myCONN = get_CONNECTION_FOR_PEER(otherID, "");
            let  myCONNJSON = myCONN["PC_CONNECTION"];

            //check to make sure if connection already available for the person recieving the offer
            //    if not then start a Connection for this USER
            if (myCONNJSON == null) {
                let thisSTARTbtn = "btnSTART_" + otherID;
                let thisBTNtoUSE = document.getElementById(thisSTARTbtn);
                startRTC(otherID);
                myCONN = get_CONNECTION_FOR_PEER(otherID, "");
                myCONNJSON = myCONN["PC_CONNECTION"];


            }else{
                console.log("CONN SET FOR RTC");
            }

            //  console.log("myCONN : " + JSON.stringify(myCONN));
            let offerTYPE = data["DESC"]["type"];
            console.log("OFFER TYPE NOW :" + offerTYPE);
            if (data["DESC"].hasOwnProperty("sdp")) {
                let desc = new RTCSessionDescription(message);
                //   console.log("descSTR NOW :" + JSON.stringify(desc));
                myCONNJSON.setRemoteDescription(desc).then(function () {
                    if (TTConst.hasOwnProperty("DISABLED") ) {
                        return navigator.mediaDevices.getUserMedia(TTConst);
                    } else {
                        let videoID = videoSelect.options[videoSelect.selectedIndex].id ||videoSelect.options[0].id ;
                        let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id ||audioInputSelect.options[0].id ;
                        console.log(videoID);
                        console.log(audioID);
                        // pc_constraints.audio.deviceId=audioID;
                        pc_constraints.video.deviceId=videoID;
                        pc_constraints.video.facingMode =true;
                        return navigator.mediaDevices.getUserMedia(pc_constraints);
                    }
                }) .then(function (stream) {
                    // gotStream(stream);
                    mylocalStream = stream;
                    localVideoHTML.srcObject = stream;

                    mylocalStream.getTracks().forEach(track => myCONNJSON.addTrack(track, mylocalStream));
                    //myCONNJSON
                })
                    .then(function () {
                        return myCONNJSON.createAnswer();
                    })
                    .then(function (answer) {
                        return myCONNJSON.setLocalDescription(answer);

                    })
                    .then(function () {
                        let thisANSWERMSG = {
                            "FROM": pageLISTEN.get_user_JSON.id,
                            "TO": otherID,
                            "ACTION": "ANSWER_MSG",
                            "DESC": myCONNJSON.localDescription.toJSON()
                        };
                        let triggered = myEVENTS.myCHANNEL.trigger("client-online-call-answer", thisANSWERMSG,     { socket_id: otherID });

                        //fewfwefwefwe  wwef  fddd    webSocket.send(JSON.stringify(thismsg));
                    })
                    .catch(handleGetUserMediaError);
            }

        }






    },
    "client-online-call-remove":function(data)  {
        console.log("client-online-call-remove : "+JSON.stringify(data));
        console.log(data["FROM"]+"    DID    "+data[pageLISTEN.get_user_JSON.id]);
        if(data.TO===pageLISTEN.get_user_JSON.id){
            if(data.hasOwnProperty(pageLISTEN.get_user_JSON.id)){
                if(data[pageLISTEN.get_user_JSON.id]){
                    console.log("CONFIRMED BOTH HUNG UP");
                }
            }else{
                data[pageLISTEN.get_user_JSON.id]=true;
                console.log("CONFIRM CLOSING JSON "+JSON.stringify(data));
                hangupRTC(data["FROM"],data);
                let newPEERSnow=[];
                for(let x=0;x<myPEERS.length;x++){
                    if(myPEERS[x]["UID"]===data["FROM"]){}
                    else{   newPEERSnow.push(myPEERS[x]);   }
                }
                myPEERS=newPEERSnow;
                console.log("OTHER HUNG UP NOW TOO");
                let triggered = myEVENTS.myCHANNEL.trigger("client-online-call-remove-done", data,     { socket_id: data["FROM"] });
            }
        }
    },
    "client-online-call-remove-done":function(data)  {
        console.log("client-online-call-remove-done : "+JSON.stringify(data));





    },

    "client-online-call-start":function(data)  {
        console.log("client-online-call-start : "+JSON.stringify(data));
        let myCONN=null;
        let otherID=data["FROM"];

        if(data["TO"]===pageLISTEN.get_user_JSON.id){
            myCONN = get_CONNECTION_FOR_PEER(otherID, "");
            /*  if (data["FROM"] ===pageLISTEN.get_user_JSON.id) { myCONN = get_CONNECTION_FOR_PEER(data["TO"], ""); }
              if (data["TO"] === pageLISTEN.get_user_JSON.id) {    myCONN = get_CONNECTION_FOR_PEER(data["FROM"], ""); }*/
            if(myCONN!=null){console.log("CONN CONFIRMED open on the other side");
                if(myCONN.PC_CONNECTION!=null){
                    remove_CONNECTION(otherID);
                    add_CONNECTION(pageLISTEN.get_user_JSON.id,otherID);
                    startRTC(otherID);
                }else{
                    remove_CONNECTION(otherID);

                }

                document.getElementById("divREMOTES").appendChild(myCONN.REMOTE_VIDEO_HTML);

            }
            else{console.log("CONN WILL BE MADE NOW");
                startRTC(otherID);

            }



        }




    },


    "client-online-candidate-msg":function(data)  {
       // console.log("client-online-candidate-msg : "+JSON.stringify(data));
        let myCONN=null;
        if((data["TO"] ===pageLISTEN.get_user_JSON.id) ){//|| (data["TO"] ===pageLISTEN.get_user_JSON.id)){
            if (data["FROM"] ===pageLISTEN.get_user_JSON.id) {   myCONN = get_CONNECTION_FOR_PEER(data["TO"], "");   }
            if (data["TO"] === pageLISTEN.get_user_JSON.id)  {   myCONN = get_CONNECTION_FOR_PEER(data["FROM"], ""); }
            let CONNJSONNOW = myCONN.PC_CONNECTION;
            if (CONNJSONNOW != null) {
              //  console.log(" PEER CONN  STATUS    :" + GETCONNSTATUS(CONNJSONNOW));
                if ((data["label"] != null) && (data["candidate"] != null)) {
                    let candidate = new RTCIceCandidate({ sdpMLineIndex: data["label"], candidate: data["candidate"] });
                    CONNJSONNOW.addIceCandidate(candidate);
                }
            }
        }
    },

    "pusher:ping":function(data)  {
        console.log("PING DATA NOW : "+JSON.stringify(data));

    },

    "pusher:subscription_succeeded":function(data) {
       //  console.log("pusher:subscription_succeeded  :"+JSON.stringify(data));


        if(data.myID==pageLISTEN.get_user_JSON.id){
            console.log("ID SYNCED");
            getROOMUSER();
        }

        //THIS TO ANNOUNCE TO THE WHOLE CHANNEL SOMEONE IS ONLINE NOW
        let triggered = myEVENTS.myCHANNEL.trigger("client-online-user", {id:pageLISTEN.get_user_JSON.id,message:"subscription_succeeded",status:"ONLINE"} );



        /*
      data.members.forEach(memberTXT => {
                console.log(memberTXT);
            }
        );
        if(pageLISTEN.get_user_JSON.id!=null){
           //
        }else{
            console.log(pageLISTEN.get_user_JSON.id+" FOUND");
        }*/

        /*
if(data.hasOwnProperty("members")){
    var allMEMBERS=data["members"];
    var memberSTR;
    for (memberSTR in allMEMBERS)   {
        var memberNOW = allMEMBERS[memberSTR];
        var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe( channelName );
        var user = channelNOW.members.get(memberNOW);

       var userId = user.id;
        if(userId===pageLISTEN.get_user_JSON.id && data.myID==pageLISTEN.get_user_JSON.id){
            document.getElementById("user_INFO").innerHTML=JSON.stringify(myPAGEUSER);
        }  else{
            if(userId!=null ){
                if(document.getElementById( "user_" +userId)!=null){
                    console.log("ALREADY IN LIST  : "+userId);
                }else{
                    addMemberToUserList(user );
                }

            }
            // console.log(userId);
            //  console.log(userInfo);

        }
    }
}
*/

        },



};