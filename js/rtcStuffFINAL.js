var myPC;

var myPEERS = [];


var pc1;
var pc2;


//var sdpConstraints = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };


var videoDevicesNOW = [];
var audioDevicesNOW = [];

var mylocalStream=null;
var myremoteStream = null;

var videoUSERS = [];

var TTConst;

console.log('webRTC PEER Connections Utils Loaded ');

function add_CONNECTION(myUID,otherID,mySTREAM) {
    var isALREADYHERE = find_CONNECTION_INDEX();


    if (isALREADYHERE < 0) {
        //ADD
        console.log("ADD NEW CONNEC CLASS");
        var thisPEERconnCLASS = new PEER_CONNECTION_CLASS(myUID, otherID, mySTREAM);
        myPEERS[myPEERS.length] = thisPEERconnCLASS;
        console.log("myPEERS INDEX" + myPEERS.length);
        return  thisPEERconnCLASS;
    }
    else {
         //CHANGE
        console.log("CHANGE CONNEC CLASS "+isALREADYHERE);
        return   myPEERS[isALREADYHERE];
    }



}

function change_CONNECTION(myUID) {


}

function remove_CONNECTION(myUID) {
    let myreturn = -1;

    var isALREADYHERE = find_CONNECTION_INDEX();


    console.log(`isALREADYHERE   : ${isALREADYHERE}`)

    for (let i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i] instanceof PEER_CONNECTION_CLASS) {
            let thisPEERnow = myPEERS[i];
            if (myUID === thisPEERnow["OTHER"]) {
                console.log("USER ID :" + thisPEERnow["OTHER"] + "    FOUND    TO    REMOVE");
              
                myreturn = myPEERS.splice(i, 1);
            }


        }
    }
    return myreturn;
}

function get_CONNECTION_FOR_PEER(UID, myTYPE) {     
    var whichCONN;
    if (myTYPE === "ME") { whichCONN = "ME"; }
    else { whichCONN = "OTHER"; }

    console.log("whichCONN:" + whichCONN);

    var myreturn = null;
    for (i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i] instanceof PEER_CONNECTION_CLASS) {
            var thisPEERnow = myPEERS[i];
            if (UID === thisPEERnow[whichCONN]) {
                console.log("USER ID :" + thisPEERnow[whichCONN] + "    FOUND");
                myreturn = myPEERS[i];
            }
                   
        }
    }

    return myreturn;

}

function find_CONNECTION_INDEX(UID) {
    var myreturn = -1;
    for (let i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i] instanceof PEER_CONNECTION_CLASS) {
            var thisPEERnow = myPEERS[i];

            if (UID === thisPEERnow["ME"]) {
                console.log("USER ID :" + thisPEERnow["ME"] + "    FOUND");
                myreturn = i;
            }
            if (UID === thisPEERnow["OTHER"]) {
                console.log("USER ID :" + thisPEERnow["OTHER"] + "    FOUND");
                myreturn = i;
            }
            
        }
    }

    return myreturn;

}




function GETCONNSTATUS(myCONNtoCHECK) {
    var state = myCONNtoCHECK.signalingState;
    return state;

}


function getName(pcID) {
    console.log("MY PC NAME : " + pcID);
   // return (pc === pc1) ? 'pc1' : 'pc2';
    console.log(`getName : ${JSON.stringify(myPEERS)}`)

    console.log(`GETCONNSTATUS : ${GETCONNSTATUS(pcID)}`)
    return myPEERS.indexOf(pcID);
}

function getOtherPc(pcID) {
   // return (pc === pc1) ? pc2 : pc1;
    return myPEERS.indexOf(pcID);
}

function gotStream(stream) {
    console.log('Received local stream');
    document.getElementById("remoteVideo").srcObject = stream;
    mylocalStream = stream;
    
}

function gotLOCALStream(stream) {
    console.log('Received local stream');
    document.getElementById("localVideo").srcObject = stream;
    return stream;

}



function stop_cam(my_stream){
    // stop both mic and camera
    if(my_stream!=null){
        my_stream.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }


}


function start(myUIDtoCALL) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");

    }
    localVideoHTML = document.getElementById("localVideo");
    remoteVideoHTML = document.getElementById("remoteVideo");

    localVideoHTML.addEventListener('loadedmetadata', function () {
        console.log("localVideoHTML Local video videoWidth: "+this.videoWidth+"px,  videoHeight: "+this.videoHeight+"px");
    });

    remoteVideoHTML.addEventListener('loadedmetadata', function () {
        console.log("remoteVideoHTML Remote video videoWidth: " + this.videoWidth + "px,  videoHeight: " + this.videoHeight + "px");

    });

    remoteVideoHTML.onresize = () => {
        console.log("remoteVideoHTML Remote video size changed to "+
            document.getElementById("remoteVideoHTML").videoWidth+
            ","+ document.getElementById("remoteVideoHTML").videoHeight);
        // We'll use the first onsize callback as an indication that video has started
        // playing out.
        endTime = window.performance.now();
        if (startTime) {
            //  const elapsedTime = window.performance.now() - startTime;
            const elapsedTime = endTime - startTime ;
            console.log("remoteVideoHTML Setup time: " + elapsedTime.toFixed(3)+"ms");
            startTime = null;
        }
    };

    let other_USERIDPROV=null;
    let my_USER_ID_PROV=final_page_user.user_json.id+"_"+final_page_user.user_json.provider;
    this_audio_call.ME=my_USER_ID_PROV;

    if(final_page_user.hasOwnProperty("order")){
        let userNOW=  final_page_user.order.order_user_id+"_"+final_page_user.order.order_user_provider;
        let driverNOW=  final_page_user.order.order_driver_id+"_"+final_page_user.order.order_driver_provider;
        if(userNOW===my_USER_ID_PROV){other_USERIDPROV=driverNOW;}
        if(driverNOW===my_USER_ID_PROV){other_USERIDPROV=userNOW;}
        this_audio_call.OTHER=other_USERIDPROV;
    }
    console.log("CALLER : "+this_audio_call.ME)
    console.log("CALLING : "+this_audio_call.OTHER)
    // List cameras and microphones.

    var iVID = 0;
    var iAUD = 0;
    navigator.mediaDevices.enumerateDevices()
        .then(async function (devices) {
            devices.forEach(function (device) {
                var thisKIND = device.kind;

                if (thisKIND.includes("video")) {
                    console.log("VIDEO DEVICE TO ADD");
                    if (videoDevicesNOW.length == 0) {
                        videoDevicesNOW[0] = device.deviceId;
                        iVID++;
                    } else {
                        videoDevicesNOW[iVID] = device.deviceId;
                        iVID++;
                    }

                }
                if (thisKIND.includes("audio")) {
                    console.log("audio DEVICE TO ADD");
                    if (audioDevicesNOW.length == 0) {
                        audioDevicesNOW[0] = device.deviceId;
                        iAUD++;
                    } else {
                        audioDevicesNOW[iAUD] = device.deviceId;
                        iAUD++;
                    }
                    console.log("audio LEN:" + audioDevicesNOW.length);

                }


                ////document.getElementById("txtCONSt").innerHTML = document.getElementById("txtCONSt").innerHTML + "<BR>" +
                ////    device.kind + ": " + device.label +
                ////    " id = " + device.deviceId;

                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });


            if (videoDevicesNOW.length > 0) {
                TTConst = {
                    "audio": true,
                    // "video": { width: 100, height: 100, facingMode: { exact: "user" } }
                    "video": {deviceId: videoDevicesNOW[0], width: 100, height: 100}
                };
            }

            //DEAL WITH THE ARRAYS HERE
            console.log('Requesting local stream');

      let my_new_conn=      await navigator.mediaDevices.getUserMedia(TTConst)
                .then(stream => {


                    document.getElementById("localVideo").srcObject = stream;
                    mylocalStream = stream;
                    console.log('Got MediaStream:', stream);

                  let new_CONN=  add_CONNECTION(this_audio_call.ME, this_audio_call.OTHER, stream);
                    console.log(`ADDED CONN JSON :${JSON.stringify(new_CONN)}`)
                  return new_CONN;


                })
                .catch(error => {
                    console.error('Error accessing media devices.', error);
                    return null;
                });

            console.log('Added local stream to pc1');
            console.log("ALL PEERS: " + JSON.stringify(myPEERS));

            if (mylocalStream != null) {
                mylocalStream.getTracks().forEach(track => my_new_conn.PC_CONNECTION.addTrack(track, mylocalStream));
            } else {
                mylocalStream = gotLOCALStream();
            }

            if (get_CONNECTION_FOR_PEER(myUIDtoCALL, "OTHER") != null) {

                if(mylocalStream!=null){
                    console.log(`RTC SET AND GOOD TO CONNECT`);
                //    document.getElementById("call_rtc_start_btn").disabled=true;
                }else{
                 //   document.getElementById("call_rtc_start_btn").disabled=false;
                }
            }

        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });





   // navigator.mediaDevices.getUserMedia(pc_constraints, OnMediaSuccess, OnMediaError);
   

   
    



}

  function call(myUIDtoCALL) {
    //document.getElementById("txt_callee").value = myUSERid;

    console.log('Starting call to USER ID' + myUIDtoCALL);
                 
    var myCONNnow = get_CONNECTION_FOR_PEER(myUIDtoCALL,"OTHER");

    var thisCONNpc = myCONNnow["PC_CONNECTION"];


    startTime = window.performance.now();
    const audioTracks = mylocalStream.getAudioTracks();
    const videoTracks = mylocalStream.getVideoTracks();
    if (audioTracks.length > 0) {
        console.log(`Using audio device: ${audioTracks[0].label}`);
    }
    
    if (videoTracks.length > 0) {
        console.log(`Using videoTracks device: ${videoTracks[0].label}`);
    }

    navigator.mediaDevices.getUserMedia(pc_constraints)
        .then(stream => {
            document.getElementById("localVideo").srcObject = stream;
            mylocalStream = stream;
            console.log('Got MediaStream:', stream);




            try{
                let videoTracks = mylocalStream.getVideoTracks();
                let track_ALREADY_SENDER=false;
                videoTracks.forEach(videoTrack => {

                    console.log(`videoTrack : ${JSON.stringify(videoTrack.id)}`)
                });
                thisCONNpc.addStream(mylocalStream);
            }
            catch(add_STREAM_ERROR){
                console.log(`add_STREAM_ERROR : ${add_STREAM_ERROR}`)
            }


            thisCONNpc.createOffer()
                .then(offer => {
                    //   console.log("OFFER:" + JSON.stringify(offer));
                    return thisCONNpc.setLocalDescription(offer).then(() => onSetLocalSuccess(thisCONNpc), onSetSessionDescriptionError);
                })
                .then(() => {

                    var workJSON = {};
                    // workJSON["ACTION"] = "OFFER_MSG";
                    workJSON["ME"] = this_audio_call.ME;
                    workJSON["OTHER"] = this_audio_call.OTHER;
                    workJSON["DESC"] = thisCONNpc.localDescription.toJSON();

                    //      webSocket.send(JSON.stringify(workJSON));



                    if (final_page_user != null  ) {
                        let myMGS = {
                            action: {type: "audio_call_offer_msg"},
                            time: new Date().getTime(),
                            user: {id: final_page_user.user_json.id, provider: final_page_user.user_json.provider},
                            js_user: {jsID: final_page_user.jsID, secureID: final_page_user.secureID},
                            order_id: final_page_user.order.order_id,

                            to:this_audio_call.OTHER,
                            offer:workJSON

                        };
                        sender_to_ws(myMGS)
                    } else {
                        console.log("LOGIN FIRST")
                    }
                    ////this.send("offer", {
                    ////    sdp: pc1.localDescription
                    ////});
                })
                .catch(err => console.log("err in hangling negotiationneeded:", err));

        })
        .catch(error => {
            console.error('Error accessing media devices.', error);

            show_alert('Error accessing media devices. ' + error)
        });


    
             
    
}

function onCreateSessionDescriptionError(error) {
    console.log("Failed to create session description: "+error.toString());
}

function onCreateOfferSuccess(desc) {
    console.log("Offer from pc1\n"+desc.sdp);
    console.log('pc1 setLocalDescription start');
    pc1.setLocalDescription(desc).then(() => onSetLocalSuccess(pc1), onSetSessionDescriptionError);
    console.log('pc2 setRemoteDescription start');   
    pc2.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc2), onSetSessionDescriptionError);

   
    //console.log('pc2 createAnswer start');

    ////var workJSON = {};
    ////workJSON["ACTION"] = "OFFER_MSG";
    ////workJSON["TO"] = document.getElementById("txt_callee").value;
    ////workJSON["DESC"] = desc;
     
    ////webSocket.send(JSON.stringify(workJSON));
    //////// Since the 'remote' side has no media stream we need
    //////// to pass in the right constraints in order for it to
    //////// accept the incoming offer of audio and video.
    //////pc2.createAnswer().then(onCreateAnswerSuccess, onCreateSessionDescriptionError);
}

function onSetLocalSuccess(pc) {
    console.log(getName(pc)+" setLocalDescription complete");
}

function onSetRemoteSuccess(pc) {
    console.log(getName(pc)+" setRemoteDescription complete");
}

function onSetSessionDescriptionError(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
}

function gotRemoteStream(e) {
    console.log('gotRemoteStream', e.track, e.streams[0]);

    // reset srcObject to work around minor bugs in Chrome and Edge.
    document.getElementById("remoteVideo").srcObject = null;
    document.getElementById("remoteVideo").srcObject = e.streams[0];
}

function onCreateAnswerSuccess(desc) {
    console.log("Answer from pc2: "+desc.sdp);
    console.log('pc2 setLocalDescription start');
    pc2.setLocalDescription(desc).then(() => onSetLocalSuccess(pc2), onSetSessionDescriptionError);
    console.log('pc1 setRemoteDescription start');
    pc1.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc1), onSetSessionDescriptionError);
}

function onIceCandidate(pc, event,toCAND) {
    var myJSON = {};


   // pc.onicecandidate = e => pc.addIceCandidate(event.candidate);

   // pc2.onicecandidate = e => pc1.addIceCandidate(event.candidate);
    ////var myCONNnow = get_CONNECTION_FOR_PEER(myUSERid);

    //var thisCONNpc = myCONNnow["PC_CONNECTION"];
   

    if ((event.candidate != null) && (toCAND != null)) {
        myJSON["ACTION"] = "CANDIDATE_MSG";
        myJSON["TO"] = toCAND;
        myJSON["pc"] = pc;

        myJSON["candidate"] = event.candidate.candidate;
        //myJSON["candidate"] = event.candidate;
        myJSON["label"] = event.candidate.sdpMLineIndex;
        myJSON["id"] = event.candidate.sdpMid;
        console.log(toCAND + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');
    } else {
        if (toCAND == null) {
            console.log("toCAND != null"); }
    }
    if (final_page_user != null  ) {
        var myMGS = {
            action: {type: "audio_call_candidate_msg"},
            time: new Date().getTime(),
            user: {id: final_page_user.user_json.id, provider: final_page_user.user_json.provider},
            js_user: {jsID: final_page_user.jsID, secureID: final_page_user.secureID},
            order_id: final_page_user.order.order_id,

            to:toCAND,
            candidate:myJSON

        };
        if ( (event.candidate != null)) {
            sender_to_ws(myMGS)
        }

    } else {
        console.log("LOGIN FIRST")
    }



   
       
     
   
  
       
}

function onAddIceCandidateSuccess(pc, Myevent) {
    console.log(GETCONNSTATUS(pc)+ " addIceCandidate success");
   // console.log(GETCONNSTATUS(pc) + " addIceCandidate success");
    //console.log(getName(pc)+" addIceCandidate success");
      
   
}

function onAddIceCandidateError(pc, error) {
    console.log(GETCONNSTATUS(pc) + " failed to add ICE Candidate: " + error.toString());
   // console.log(getName(pc) + " failed to add ICE Candidate: " + error.toString());
}


function upgrade() {
   
    navigator.mediaDevices.getUserMedia(pc_constraints)
        .then(stream => {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                console.log(`Using video device: ${videoTracks[0].label}`);
            }
            mylocalStream.addTrack(videoTracks[0]);
            document.getElementById("localVideo").srcObject = null;
            document.getElementById("localVideo").srcObject = mylocalStream;
            pc1.addTrack(videoTracks[0], mylocalStream);
            return pc1.createOffer();
        })
        .then(offer => pc1.setLocalDescription(offer))
        .then(() => pc2.setRemoteDescription(pc1.localDescription))
        .then(() => pc2.createAnswer())
        .then(answer => pc2.setLocalDescription(answer))
        .then(() => pc1.setRemoteDescription(pc2.localDescription));
}


function hangup_without_other(){
    console.log('Ending call');

    let myUIDtoCALL=this_audio_call.OTHER;
    var myCONNnow = get_CONNECTION_FOR_PEER(myUIDtoCALL,"OTHER");

    if(myCONNnow.hasOwnProperty("PC_CONNECTION")){
        var thisCONNpc = myCONNnow.PC_CONNECTION||null;

        if(thisCONNpc!=null){
            try{ thisCONNpc.close();}
            catch(eHANGUP){
                console.log(`eHANGUP  : ${eHANGUP}`)
            }
        }
        else{
            console.log(`thisCONNpc NULL ??????????????????`)
        }


        try{  let removed_CONN=  remove_CONNECTION(myUIDtoCALL );
            /*  const videoTracks = mylocalStream.getVideoTracks();
              videoTracks.forEach(videoTrack => {
                  videoTrack.stop();
                  mylocalStream.removeTrack(videoTrack);
              });*/
            stop_cam(mylocalStream)

            //removed_CONN?.PC_CONNECTION.close();

            //  if(  removed_CONN.hasOwnProperty("PC_CONNECTION")){
            console.log(`REMOVE THIS PC CONN`)
            //    }

        }
        catch(eHANGUP){

            console.log(`eHANGUP  : ${eHANGUP}`)
        }
    }
    else{}


    mylocalStream=null;

    // thisCONNpc = null;
    //get_CONNECTION_FOR_PEER(myUIDtoCALL,"OTHER") = null;

    document.getElementById("localVideo").srcObject = null;
    document.getElementById("localVideo").srcObject = mylocalStream;
}


function hangup( ) {
    console.log('Ending call');

    let myUIDtoCALL=this_audio_call.OTHER;
     var myCONNnow = get_CONNECTION_FOR_PEER(myUIDtoCALL,"OTHER");

    var thisCONNpc = myCONNnow.PC_CONNECTION||null;

if(thisCONNpc!=null){
    try{ thisCONNpc.close();}
    catch(eHANGUP){
        console.log(`eHANGUP  : ${eHANGUP}`)
    }
}
else{
    console.log(`thisCONNpc NULL ??????????????????`)
}


    try{  let removed_CONN=  remove_CONNECTION(myUIDtoCALL );
      /*  const videoTracks = mylocalStream.getVideoTracks();
        videoTracks.forEach(videoTrack => {
            videoTrack.stop();
            mylocalStream.removeTrack(videoTrack);
        });*/
        stop_cam(mylocalStream)

     //   removed_CONN?.PC_CONNECTION.close();

    //  if(  removed_CONN.hasOwnProperty("PC_CONNECTION")){
            console.log(`REMOVE THIS PC CONN`)
  //    }

    }
    catch(eHANGUP){

        console.log(`eHANGUP  : ${eHANGUP}`)
    }

    mylocalStream=null;
    hangup_call_other();
   // thisCONNpc = null;
    //get_CONNECTION_FOR_PEER(myUIDtoCALL,"OTHER") = null;

    document.getElementById("localVideo").srcObject = null;
    document.getElementById("localVideo").srcObject = mylocalStream;
    
}

function doAnswer() {
    pc2.createAnswer(setLocalAndSendMessage, errorCallBack, sdpConstraints);
};

  

function onCreateAnswerError(error) {
    console.log(`Failed to set createAnswer: ${error.toString()}`);
    stop();
}

function onSetLocalDescriptionError(error) {
    console.log(`Failed to set setLocalDescription: ${error.toString()}`);
    stop();
}

function onSetLocalDescriptionSuccess() {
    console.log('localDescription success.');
}



function gotDescription3(desc) {
    // Final answer, setting a=recvonly & sdp type to answer.
    ////desc.sdp = desc.sdp.replace(/a=inactive/g, 'a=recvonly');
    ////desc.type = 'answer';
    var answerTOSENDBACKfinal = {};
    answerTOSENDBACKfinal["type"] = "answer";
    answerTOSENDBACKfinal["DESC"] = desc;
    answerTOSENDBACKfinal["FROM"] = desc;
    console.log(`Answer from pc2\n${desc.sdp}`);
    console.log("answerTOSENDBACKfinal::"+JSON.stringify(answerTOSENDBACKfinal));
    ////pc2.setLocalDescription(desc).then(onSetLocalDescriptionSuccess, onSetLocalDescriptionError);
    ////
    ////pc1.setRemoteDescription(desc);
}

function accept(myUSERidhere) {
    
    var myCONNnow = get_CONNECTION_FOR_PEER(myUSERidhere);

    var thisCONNpc = myCONNnow["PC_CONNECTION"];
    const myanswer = thisCONNpc.createAnswer().then(gotDescription3, onCreateAnswerError);
    var workJSON = {};
    workJSON["ACTION"] = "answer";
    workJSON["FROM"] = myUSERidhere;
    workJSON["answer"] = myanswer;

    webSocket.send(JSON.stringify(workJSON)); 
}


function handleGetUserMediaError(e) {
    switch (e.name) {
        case "NotFoundError":
            alert("Unable to open your call because no camera and/or microphone" +
                "were found.");
            break;
        case "SecurityError":
        case "PermissionDeniedError":
            // Do nothing; this is the same as the user canceling the call.
            break;
        default:
            alert("Error opening your camera and/or microphone: " + e.message);
            break;
    }

    //closeVideoCall();
}

////////////////////////////////////////////////////////////////////////////////
/*  
 
  

function gotDescription1(desc) {
    pc1.setLocalDescription(desc).then(
        onSetLocalDescriptionSuccess,
        onSetLocalDescriptionError
    );
    console.log(`Offer from pc1\n${desc.sdp}`);
    pc2.setRemoteDescription(desc);
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    pc2.createAnswer().then(gotDescription2, onCreateSessionDescriptionError);
}

function gotDescription2(desc) {
    // Provisional answer, set a=inactive & set sdp type to pranswer.
    desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');
    desc.type = 'pranswer';
    pc2.setLocalDescription(desc).then(onSetLocalDescriptionSuccess, onSetLocalDescriptionError);
    console.log(`Pranswer from pc2\n${desc.sdp}`);
    pc1.setRemoteDescription(desc);
}




async function createOffer() {
    
  
    const numRequestedAudioTracks = parseInt(numAudioTracksInput.value);

    for (let i = 0; i < numRequestedAudioTracks; i++) {
        const acx = new AudioContext();
        const dst = acx.createMediaStreamDestination();

        // Fill up the peer connection with numRequestedAudioTracks number of tracks.
        const track = dst.stream.getTracks()[0];
        peerConnection.addTrack(track, dst.stream);
    }

    const offerOptions = {
        // New spec states offerToReceiveAudio/Video are of type long (due to
        // having to tell how many "m" lines to generate).
        // http://w3c.github.io/webrtc-pc/#idl-def-RTCOfferAnswerOptions.
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
        iceRestart: true,
        voiceActivityDetection: true
    };

    try {
        const offer = await pc1.createOffer(offerOptions);
        await pc1.setLocalDescription(offer);
       
    } catch (e) {
       console.log( `Failed to create offer: ${e}`);
    }
}






function OnMediaSuccess(mediaStream) {

    gotStream(mediaStream);

    console.log('Created local peer connection object pc1');
    mediaStream.getTracks().forEach(track => pc1.addTrack(track, mediaStream));
    pc1.addStream(mediaStream);

    pc1.onaddstream = function (mediaStream) {
        console.log('Received local stream');
        localVideoHTML.srcObject = mediaStream;
        mylocalStream = mediaStream;
    };



    pc1.onicecandidate = e => onIceCandidate(pc2, e);
    pc1.oniceconnectionstatechange = e => onIceStateChange(pc2, e);

    pc2.onicecandidate = e => onIceCandidate(pc1, e);

    pc2.oniceconnectionstatechange = e => onIceStateChange(pc1, e);
   // pc2.ontrack = gotRemoteStream;
   // mylocalStream = gotStream;
    console.log('Created remote peer connection object pc2');

}

function OnMediaError(error) {
    console.error(error);
}
*/