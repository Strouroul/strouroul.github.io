
let myPEERS = [];

//console.log('Creating PEER Connections ');

let pc_config = {
    "iceServers": [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: 'stun:stun1.l.google.com:19302' },

        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },

    ]
};

//var sdpConstraints = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };

let localVideoHTML = document.getElementById("localVideo");
// let remoteVideoHTML = document.getElementById("remoteVideo");

let videoDevicesNOW = [];
let audioDevicesNOW = [];

let mylocalStream = null;
let myremoteStream = null;

let videoUSERS = [];


let startTime;
let endTime;

let pc_constraints = {
    "audio": false,
    // "video": { width: 100, height: 100, facingMode: { exact: "user" } }
    "video": { width: 100, height: 100,
        frameRate: {
            ideal: 60,
            min: 5
        }
    }
};

let TTConst;

localVideoHTML.addEventListener('loadedmetadata', function () {
    console.log("Local video videoWidth: " + this.videoWidth + "px,  videoHeight: " + this.videoHeight + "px");
});
/*
remoteVideoHTML.addEventListener('loadedmetadata', function () {
    console.log("Remote video videoWidth: " + this.videoWidth + "px,  videoHeight: " + this.videoHeight + "px");

});

remoteVideoHTML.onresize = () => {
    console.log("Remote video size changed to " + remoteVideo.videoWidth + "," + remoteVideo.videoHeight);
    // We'll use the first onsize callback as an indication that video has started
    // playing out.
    endTime = window.performance.now();
    if (startTime) {
        //  const elapsedTime = window.performance.now() - startTime;
        const elapsedTime = endTime - startTime;
        console.log("Setup time: " + elapsedTime.toFixed(3) + "ms");
        startTime = null;
    }
};*/



let offerOptions = null;

function add_CONNECTION(myUID, otherID ) {
    let isALREADY = find_CONNECTION_INDEX();
    if (isALREADY < 0) {
        //ADD
        console.log("ADD NEW CONNEC CLASS");
        let thisPEERConnCLASS = new PEER_CONNECTION_CLASS(myUID, otherID );
        myPEERS[myPEERS.length] = {
            "UID": otherID,
            "pc": thisPEERConnCLASS
        };
      //  console.log("myPEERS INDEX" + myPEERS.length);
    }
    else {
        //CHANGE
        console.log("CHANGE CONNEC CLASS");
        let thisPEERConnCLASS = new PEER_CONNECTION_CLASS(myUID, otherID );
        myPEERS[isALREADY] = {
            "UID": otherID,
            "pc": thisPEERConnCLASS
        };
    }
    if(myPEERS[isALREADY]!=null){
        if(myPEERS[isALREADY]["pc"]!=null){
            rtcPEERS[otherID]={};
            rtcPEERS[otherID]["rtcLISTEN"]=rtcLISTEN;
            rtcPEERS[otherID].rtcLISTEN.set_RTC_CONNECTION=myPEERS[isALREADY]["pc"];
        }
    }




}

function change_CONNECTION(myUID) {


}

function remove_CONNECTION(myUID) {
    let myRETURN = -1;
    for (let i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i] instanceof PEER_CONNECTION_CLASS) {
            let thisPEERNOW = myPEERS[i];
            if (myUID === thisPEERNOW["UID"]) {
                 myRETURN = myPEERS.slice(i, 1);
                console.log("USER ID :" + thisPEERNOW["UID"] + "    FOUND    TO    REMOVE");
            } 
        }
    }
    return myRETURN;
}



function get_CONNECTION_FOR_PEER(UID, myTYPE) {
    let whichCONN;
    if (myTYPE === "ME") { whichCONN = "ME"; }
    else { whichCONN = "OTHER"; }
    let myRETURN = null;
    for (let i = 0; i < myPEERS.length; i++) {
        let thisPEERNOW = myPEERS[i];
        if (UID === thisPEERNOW["UID"]) {
            //  console.log("USER ID :" + thisPEERnow["UID"] + "    FOUND");
            myRETURN = thisPEERNOW["pc"];
        }
    }
    return myRETURN;

}
function find_CONNECTION_INDEX(UID) {
    let myRETURN = -1;
    for (let i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i] instanceof PEER_CONNECTION_CLASS) {
            let thisPEERNOW = myPEERS[i];
            if (UID === thisPEERNOW["UID"]) {
                console.log("USER ID :" + thisPEERNOW["pc"]["ME"] + "    FOUND");
                myRETURN = i;
            }
        }
    }

    return myRETURN;

}


function GETCONNSTATUS(myCONNtoCHECK) {
    var state = myCONNtoCHECK.signalingState;
    return state;

}
function switchSTREAM(userID){
    let thisRTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    /////////////////////////
    let myCONNnow =  get_CONNECTION_FOR_PEER(userID, "OTHER");

   // myCONNnow = get_CONNECTION_FOR_PEER(userID, "OTHER");
    console.log("SWITCHING MEDIA TO  USER " + userID);
    try { if (agentInfo != null) {
        let videoID = videoSelect.options[videoSelect.selectedIndex].id || videoSelect.options[0].id;
        let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id || audioInputSelect.options[0].id;
        console.log(videoID);
        console.log(audioID);
        let thisCONNpc = myCONNnow["PC_CONNECTION"];

        if(thisCONNpc!=null){
            pc_constraints.video.deviceId = videoID;
            pc_constraints.video.facingMode = true;
            if (agentInfo["browser"]["name"].includes("Chrome")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {
                        localVideoHTML.srcObject = stream;
                        mylocalStream = stream;
                        console.log('Got MediaStream:', stream);


                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }


                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                    });
            }
            if (agentInfo["browser"]["name"].includes("Firefox")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {

                        let sender = thisCONNpc .getSenders().find(function(s) {
                            return (s.track.kind === mylocalStream.getVideoTracks()[0].kind
                                    &&s.track.id === mylocalStream.getVideoTracks()[0].id
                           // &&(s.track && (s.transport.state === "connected"))
                            );
                        });
                        console.log('Got MediaStream: OLD  : ', mylocalStream);
                        console.log('Got MediaStream: NEW  : ', stream);
                        console.log('found sender:', sender);

                        const audioTracks = stream.getAudioTracks();
                        const videoTracks = stream.getVideoTracks();

                        sender.replaceTrack(stream.getVideoTracks()[0]);
                        mylocalStream=stream;
                        localVideoHTML.srcObject = mylocalStream;

                        thisCONNpc.createOffer()
                            .then(offer => {
                                //   console.log("OFFER:" + JSON.stringify(offer));
                                return thisCONNpc.setLocalDescription(offer);
                            })
                            .then(() => {
                                var workJSON = {};
                                workJSON["ACTION"] = "OFFER_MSG";
                                workJSON["ME"] = pageLISTEN.get_user_JSON.id;
                                workJSON["OTHER"] = userID;
                                workJSON["DESC"] = thisCONNpc.localDescription.toJSON();
                                // webSocket.send(JSON.stringify(workJSON));
                                var triggered = myEVENTS.myCHANNEL.trigger("client-online-call-offer", workJSON,{ socket_id: userID });

                                ////this.send("offer", {
                                ////    sdp: pc1.localDescription
                                ////});
                            })
                            .catch(err =>{ console.log("err in hangling negotiationneeded:"+ err); } );


                        /*
                         let sender = thisCONNpc .getSenders().find(function(s) {
                            return s.track.kind === mylocalStream.getVideoTracks()[0].kind;
                        });
                        console.log('Got MediaStream: OLD  : ', mylocalStream);
                        console.log('Got MediaStream: NEW  : ', stream);
                        console.log('found sender:', sender);
                      //  mylocalStream.getVideoTracks()[0].stop();

                        sender.replaceTrack(stream.getVideoTracks()[0]);

                        mylocalStream.getAudioTracks().forEach(function(track) {
                            track.enabled = true
                        })
                        mylocalStream.getVideoTracks().forEach(function(track) {
                            track.enabled = true
                        })

                        myCONNnow.PC_CONNECTION.getSenders().forEach((sender) => {
                            mylocalStream.getTracks().forEach((track) => {

                                if(sender.track.id===stream.getVideoTracks()[0].id){
                                    console.log("MATCH");
                                }else{
                                    myCONNnow.PC_CONNECTION.addTrack(track,mylocalStream);
                                }
                            });

                        });
                        mylocalStream=stream;
                        console.log('Got MediaStream: OLD  : ', mylocalStream);
                        console.log('Got MediaStream: NEW  : ', stream);
                         */







                        //  mylocalStream.getVideoTracks()[0].stop();

                        /*    stream.getTracks().forEach(track => {
                                thisCONNpc.addTrack(track, mylocalStream);
                            });

                            mylocalStream.getAudioTracks().forEach(function(track) {
                                track.enabled = true
                            });
                            mylocalStream.getVideoTracks().forEach(function(track) {
                                track.enabled = true
                            });
                            mylocalStream=stream;
                            thisCONNpc.addStream(mylocalStream);
                           */







                        //  let videoTrack;

                        /*  sender.getTracks().forEach((track) => {
                              console.log("FOUND track id :"+track.id);
                          if(sender.track.kind===track.kind){
                              console.log("FOUND track TO REPLACE id :"+track.id);
                              sender.replaceTrack(track);
                          }
                      });*/


                        /*  mylocalStream.getTracks().forEach((track) => {
                              console.log("FOUND track id :"+track.id);

                              myCONNnow.PC_CONNECTION.getSenders().forEach((sender) => {
                                  if (sender.track.kind === track.kind) {
                                      console.log("FOUND track kind :"+track.kind);
                                      if (sender.track.id === track.id) {
                                       //  track.stop();
                                        //  sender.replaceTrack(videoTracks[0] );
                                          console.log("FOUND track  SAME kind :"+track.kind);
                                     //
                                           let videoTrack = videoTracks[0];
                                      //    sender.replaceTrack(videoTrack);
                                      //    mylocalStream = stream;
                                      //    localVideoHTML.srcObject = mylocalStream;
                                          console.log("REPLACED track  SAME kind :"+videoTrack.kind);
                                          console.log("REPLACED track  SAME ID :"+videoTrack.id);

                                      }

                                  }
                              });
                          });*/


                        /*  let videoTrack = mylocalStream.getVideoTracks()[0];
                          var sender = myCONNnow.PC_CONNECTION.getSenders().find(function(s) {
                              console.log(s.track.id);
                              console.log(s.track.kind);

                              return s.track.kind == videoTrack.kind;
                          });
                          console.log('found sender:', sender);
                          const audioTracks = stream.getAudioTracks();
                          const videoTracks = stream.getVideoTracks();
                          if (audioTracks.length > 0) {
                              console.log(`Using audio device: ${audioTracks[0].label}`);
                          }

                          if (videoTracks.length > 0) {
                              console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                          }

                          sender.replaceTrack(stream);
                          mylocalStream = stream;
                          localVideoHTML.srcObject = mylocalStream;
                          console.log('Got MediaStream:', mylocalStream);
      */

                        // myCONNnow.addStream(mylocalStream);



                        if(myCONNnow!=null){
                            // console.log(JSON.stringify(myCONNnow));
                            /* var transceivers =myCONNnow.getTransceivers();// myCONNnow.getRemoteStreams();                  getSenders
                             transceivers.forEach(transceiver => {
                                 //transceiver.stop();
                                 console.log(JSON.stringify(transceiver));
                                 transceiver.forEach(data => {
                                     console.log(JSON.stringify(data));
                                 });

                             });*/
                            // for(let sender of myCONNnow.PC_CONNECTION.getSenders()){}

                            /* for (var streamNOW of streams) {
                                console.log("Remote streams: " + stream.id);
                                streamNOW.getTracks().forEach(track => {
                                    console.log(track.id);
                                    //  peerConnection.addTrack(track, localStream);
                                });
                            }*/
                            /* */
                        }


                        /*  var sender = thisCONNpc.getSenders().find(function(s) {
                              return s.track.kind == videoTrack.kind;
                          });
                          console.log('found sender:', sender);
                          sender.replaceTrack(videoTrack);*/



                    })
                    .catch(err => {
                        console.error('Error accessing media devices.', err);
                        // alert('Error accessing media devices.' + error);
                        if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
                            //required track is missing

                        } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
                            //webcam or mic are already in use
                        } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
                            //constraints can not be satisfied by avb. devices
                        } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
                            //permission denied in browser
                        } else if (err.name == "TypeError" || err.name == "TypeError") {
                            //empty constraints object
                        } else {
                            //other errors
                        }

                        // console.log(err);
                    });


            }
            if (agentInfo["browser"]["name"].includes("Edge")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {

                        mylocalStream = stream;
                        localVideoHTML.srcObject = mylocalStream;

                        var thisSTREAMinfo;
                        var mySTR="";
                        for(thisSTREAMinfo in mylocalStream){
                            mySTR=mySTR+
                                thisSTREAMinfo+" : "+JSON.stringify(mylocalStream[thisSTREAMinfo])+"<BR>";
                        }
                        document.getElementById("divLOG").innerHTML=mySTR;

                        console.log('Got MediaStream:', mylocalStream);

                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }



                    })
                    .catch(error => {
                        alert('Error accessing media devices.' + error); console.error('Error accessing media devices.', error);
                    });
            }
            if (agentInfo["browser"]["name"].includes("Safari")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {
                        localVideoHTML.srcObject = stream;
                        mylocalStream = stream;
                        console.log('Got MediaStream:', stream);
                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }



                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                        alert('Error accessing media devices.' + error);
                    });


            }

        }




    }



    } catch(e) {console.log( JSON.stringify(e));}



    //   let senders= myCONNnow.getSenders() ;
    /*   senders.forEach(function (thisSENDER){
           // console.log(typeof thisSENDER);
           var i;
           for (i = 0; i < senders.length; i++) {
               if (thisSENDER.id == id)
                   console.log( JSON.stringify(thisSENDER ));
           }
          /* for (i = 0; i < remoteStreams.length; i++) {
               if (remoteStreams[i].id == id)
                   console.log( JSON.stringify(remoteStreams[i]));
           }* /
        }) ; */

    /*
    var localStreams = myCONNnow.PC_CONNECTION.getLocalStreams();
    var remoteStreams = myCONNnow.PC_CONNECTION.getRemoteStreams();
    var i;
    for (i = 0; i < localStreams.length; i++) {
        if (localStreams[i].id == id)
           console.log( JSON.stringify(localStreams[i]));
    }
    for (i = 0; i < remoteStreams.length; i++) {
        if (remoteStreams[i].id == id)
            console.log( JSON.stringify(remoteStreams[i]));
    }

    */
    /*
    if (myCONNnow != null) {
        let thisCONNpc = myCONNnow["PC_CONNECTION"];
        startTime = window.performance.now();
        if (agentInfo != null) {
            let videoID = videoSelect.options[videoSelect.selectedIndex].id ||videoSelect.options[0].id ;
            let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id ||audioInputSelect.options[0].id ;
            console.log(videoID);
            console.log(audioID);
            //  pc_constraints.audio.deviceId=audioID;
            pc_constraints.video.deviceId=videoID;
            pc_constraints.video.facingMode =true;


        }
    } else {
        // alert("CALLING :" + myUSERid + "    BUT myCONNnowis EMPTRY");
    }
*/
}



function startRTC(myUIDtoCALL) {


    // alert();

    // List cameras and microphones.

    var iVID = 0;
    var iAUD = 0;
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                var thisKIND = device.kind;

                if (thisKIND.includes("video")) {
                    console.log("VIDEO DEVICE TO ADD");
                    if (videoDevicesNOW.length == 0) {
                        videoDevicesNOW[0] = device.deviceId; iVID++;
                    }
                    else {
                        videoDevicesNOW[iVID] = device.deviceId;
                        iVID++;
                    }

                }
                if (thisKIND.includes("audio")) {
                    console.log("audio DEVICE TO ADD");
                    if (audioDevicesNOW.length == 0) {
                        audioDevicesNOW[0] = device.deviceId; iAUD++;
                    }
                    else {
                        audioDevicesNOW[iAUD] = device.deviceId;
                        iAUD++;
                    }
                    console.log("audio LEN:" + audioDevicesNOW.length);

                }
                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });

            let videoID = videoSelect.options[videoSelect.selectedIndex].id ||videoSelect.options[0].id ;
            let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id ||audioInputSelect.options[0].id ;
            console.log(videoID);
            console.log(audioID);
            //  pc_constraints.audio.deviceId=audioID;
            pc_constraints.video.deviceId=videoID;
            pc_constraints.video.facingMode =true;
            if (videoDevicesNOW.length > 0) {
                TTConst = {
                    "audio": true,
                    // "video": { width: 100, height: 100, facingMode: { exact: "user" } }
                    "video": { deviceId: videoID, width: 100, height: 100 }
                };
            }

            console.log('Added local stream to '+myUIDtoCALL);
           // console.log("ALL PEERS: " + JSON.stringify(myPEERS));
            ////////////////////////////////////////////


            add_CONNECTION(pageLISTEN.get_user_JSON.id, myUIDtoCALL);
              // console.log("myPEERS   LEN : " + myPEERS.length + " " + JSON.stringify(myPEERS));



        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });

    document.getElementById("btnSTART_"+myUIDtoCALL).disabled=true;
    //myBTN.disabled = true;
    // navigator.mediaDevices.getUserMedia(pc_constraints, OnMediaSuccess, OnMediaError);

}
function sendSTARTcallTRIGGER(otherIDtoSEND){
    let thisSTARTMSG={
        ACTION:"START_CALL",
        TO:otherIDtoSEND,
        FROM:pageLISTEN.get_user_JSON.id,
        ME:true
    };
    let triggered = myEVENTS.myCHANNEL.trigger("client-online-call-start", thisSTARTMSG,     { socket_id: thisSTARTMSG.TO });
}


function callRTC(myUSERid) {
    console.log('Starting call to USER ID' + myUSERid);
    let thisRTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    /////////////////////////
    let myCONNnow = get_CONNECTION_FOR_PEER(myUSERid, "OTHER");
    if (myCONNnow==null) {
        var thisBTN = "btnSTART_" + myUSERid;
        var btnHTMLnow = document.getElementById(thisBTN);
        if ((myUSERid != null) && (btnHTMLnow != null)) { startRTC(myUSERid ); }
        else { alert("SOMETHING NULL"); }
    }
    myCONNnow = get_CONNECTION_FOR_PEER(myUSERid, "OTHER");
    console.log("CALLING USER " + myUSERid);
    if (myCONNnow != null) {
        let thisCONNpc = myCONNnow["PC_CONNECTION"];
        startTime = window.performance.now();
        if (agentInfo != null) {
            let videoID = videoSelect.options[videoSelect.selectedIndex].id ||videoSelect.options[0].id ;
            let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id ||audioInputSelect.options[0].id ;
            console.log(videoID);
            console.log(audioID);
          //  pc_constraints.audio.deviceId=audioID;
            pc_constraints.video.deviceId=videoID;
            pc_constraints.video.facingMode =true;

            if (agentInfo["browser"]["name"].includes("Chrome")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {

                        mylocalStream = stream;
                        localVideoHTML.srcObject = mylocalStream;
                        console.log('Got MediaStream:', stream);


                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }

                        thisCONNpc.addStream(mylocalStream);
                        thisCONNpc.createOffer()
                            .then(offer => {
                               console.log("OFFER:" + JSON.stringify(offer));
                                return thisCONNpc.setLocalDescription(offer);
                            })
                            .then(() => {
                                var workJSON = {};
                                workJSON["ACTION"] = "OFFER_MSG";
                                workJSON["ME"] = pageLISTEN.get_user_JSON.id;
                                workJSON["OTHER"] = myUSERid;
                                workJSON["DESC"] = thisCONNpc.localDescription.toJSON();
                                // webSocket.send(JSON.stringify(workJSON));
                                var triggered = myEVENTS.myCHANNEL.trigger("client-online-call-offer", workJSON,{ socket_id: myUSERid });
                            })
                            .catch(err => console.log("err in hangling negotiationneeded:", err));
                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                    });
            }
            if (agentInfo["browser"]["name"].includes("Firefox")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {
                        localVideoHTML.srcObject = stream;
                        mylocalStream = stream;
                        console.log('Got MediaStream:', stream);
                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }
                        thisCONNpc.addStream(mylocalStream);
                        thisCONNpc.createOffer()
                            .then(offer => {
                             //   console.log("OFFER:" + JSON.stringify(offer));
                                return thisCONNpc.setLocalDescription(offer);
                            })
                            .then(() => {
                                var workJSON = {};
                                workJSON["ACTION"] = "OFFER_MSG";
                                workJSON["ME"] = pageLISTEN.get_user_JSON.id;
                                workJSON["OTHER"] = myUSERid;
                                workJSON["DESC"] = thisCONNpc.localDescription.toJSON();
                               // webSocket.send(JSON.stringify(workJSON));
                                var triggered = myEVENTS.myCHANNEL.trigger("client-online-call-offer", workJSON,{ socket_id: myUSERid });

                                ////this.send("offer", {
                                ////    sdp: pc1.localDescription
                                ////});
                            })
                            .catch(err =>{ console.log("err in hangling negotiationneeded:"+ err); } );


                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                        alert('Error accessing media devices.' + error);
                    });


            }
            if (agentInfo["browser"]["name"].includes("Edge")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {

                        mylocalStream = stream;
                        localVideoHTML.srcObject = mylocalStream;

                        var thisSTREAMinfo;
                        var mySTR="";
                        for(thisSTREAMinfo in mylocalStream){
                            mySTR=mySTR+
                                thisSTREAMinfo+" : "+JSON.stringify(mylocalStream[thisSTREAMinfo])+"<BR>";
                        }
                        document.getElementById("divLOG").innerHTML=mySTR;

                        console.log('Got MediaStream:', mylocalStream);

                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }
                        thisCONNpc.addStream(mylocalStream);


                        thisCONNpc.createOffer()
                            .then(offer => {
                              //  console.log("OFFER:" + JSON.stringify(offer));
                                return thisCONNpc.setLocalDescription(offer);
                            })
                            .then(() => {

                                var workJSON = {};
                                workJSON["ACTION"] = "OFFER_MSG";
                                workJSON["ME"] = pageLISTEN.get_user_JSON.id;
                                workJSON["OTHER"] = myUSERid;
                                workJSON["DESC"] = thisCONNpc.localDescription.toJSON();

                                // webSocket.send(JSON.stringify(workJSON));
                                var triggered = myEVENTS.myCHANNEL.trigger("client-online-call-offer", workJSON,{ socket_id: myUSERid });
                                ////this.send("offer", {
                                ////    sdp: pc1.localDescription
                                ////});
                            })
                            .catch(err => alert("err in hangling negotiationneeded:" + err));


                    })
                    .catch(error => {
                        alert('Error accessing media devices.' + error); console.error('Error accessing media devices.', error);
                    });
            }
            if (agentInfo["browser"]["name"].includes("Safari")) {
                navigator.mediaDevices.getUserMedia(pc_constraints)
                    .then(stream => {
                        localVideoHTML.srcObject = stream;
                        mylocalStream = stream;
                        console.log('Got MediaStream:', stream);
                        const audioTracks = mylocalStream.getAudioTracks();
                        const videoTracks = mylocalStream.getVideoTracks();
                        if (audioTracks.length > 0) {
                            console.log(`Using audio device: ${audioTracks[0].label}`);
                        }

                        if (videoTracks.length > 0) {
                            console.log(`Using videoTracks device: ${videoTracks[0].label}`);
                        }
                        thisCONNpc.addStream(mylocalStream);
                        thisCONNpc.createOffer()
                            .then(offer => {
                                //   console.log("OFFER:" + JSON.stringify(offer));
                                return thisCONNpc.setLocalDescription(offer);
                            })
                            .then(() => {
                                var workJSON = {};
                                workJSON["ACTION"] = "OFFER_MSG";
                                workJSON["ME"] = pageLISTEN.get_user_JSON.id;
                                workJSON["OTHER"] = myUSERid;
                                workJSON["DESC"] = thisCONNpc.localDescription.toJSON();
                                // webSocket.send(JSON.stringify(workJSON));
                                var triggered = myEVENTS.myCHANNEL.trigger("client-online-call-offer", workJSON,{ socket_id: myUSERid });

                                ////this.send("offer", {
                                ////    sdp: pc1.localDescription
                                ////});
                            })
                            .catch(err =>{ console.log("err in hangling negotiationneeded:"+ err); } );


                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                        alert('Error accessing media devices.' + error);
                    });


            }
        }
    } else {
        // alert("CALLING :" + myUSERid + "    BUT myCONNnowis EMPTRY");
    }
    ///////////////////////////////////////
}


function hangupRTC(myUID) {
    //  alert("myUID: " + myUID);
    var mySTARTBTNAGAIN = "btnSTART_" + myUID;
    if(document.getElementById(mySTARTBTNAGAIN)!=null){
        document.getElementById(mySTARTBTNAGAIN).disabled = false;
    }
    var mycllBTNAGAIN = "btnCALL_" + myUID;
    if(document.getElementById(mycllBTNAGAIN)!=null){
        document.getElementById(mycllBTNAGAIN).disabled = false;
    }
    let myCONNTODISCONNECT = get_CONNECTION_FOR_PEER(myUID);
    if(myCONNTODISCONNECT!=null){
        let myUIDtoDISC = myUID;
        clearInterval(myCONNTODISCONNECT.PC_CONNECTION_STATUS);
        let myUIDtoPC = myCONNTODISCONNECT["PC_CONNECTION"];
        if (myCONNTODISCONNECT != null) {
            let thisCONNtoREMOVE = myCONNTODISCONNECT["REMOTE_VIDEO_HTML"];
            thisCONNtoREMOVE.srcObject = null;
            let remVidvideosTr = "video_" + myUID;
            let remVIDel = document.getElementById(remVidvideosTr);
            if(remVIDel!=null){
                document.getElementById("divREMOTES").removeChild(remVIDel);
            }
            myUIDtoPC.close();
            myUIDtoPC = null;
            if (myUIDtoPC != null) {
                var connSTAT = myUIDtoPC.GETCONNSTATUS;
                alert("CONN STATUS : " + connSTAT);
                console.log("CONN STATUS : "+connSTAT);
            }
        }
    }


    remove_CONNECTION(myUID);

}

function hangupTRIGGERsend(otherIDtoSEND,myMSGtoSENDnow){
   /* var thiSKEY=pageLISTEN.get_user_JSON.id;
    let thisANSWERMSG = {
        "FROM": pageLISTEN.get_user_JSON.id,
        "TO": otherIDtoSEND ,
        "ACTION": "HANGUP_MSG",

         [pageLISTEN.get_user_JSON.id]:true
    };*/
    let triggered = myEVENTS.myCHANNEL.trigger("client-online-call-remove", myMSGtoSENDnow,     { socket_id: myMSGtoSENDnow.TO });
}
function restartICE(myUID){
    let myCONNTORESTARTICE = get_CONNECTION_FOR_PEER(myUID);
    myCONNTORESTARTICE.PC_CONNECTION.restartIce();
    console.log("RESTART ICE GOOD");
}
function onIceStateChange(pc, event,myUSER,myOtherID) {

    //console.log(getName(myotherID) + " ICE state: " + pc.iceConnectionState);
  //  console.log('ICE state change event: ', event);

    if ((pc != null)) {
        if ((pc.iceConnectionState === "failed")) {
            console.log("CAND FAILED ?????");
            pc.restartIce();
        }


        if (pc.iceConnectionState === "disconnected") {
            if (myOtherID !== pageLISTEN.get_user_JSON.id) {
                let CONNtoREMOVE = get_CONNECTION_FOR_PEER(myOtherID, "");
                hangupRTC(myOtherID);
                let thisANSWERMSG = {
                    FROM : pageLISTEN.get_user_JSON.id,
                    TO: myOtherID  ,
                    "ACTION": "HANGUP_MSG",
                    [pageLISTEN.get_user_JSON.id ]:true
                };
                hangupTRIGGERsend(thisANSWERMSG.TO,thisANSWERMSG);
         

            }
        }


        if (pc.iceConnectionState === "connected") {
            console.log("CAND CONNECTED");
            if (myOtherID !== pageLISTEN.get_user_JSON.id) {
                let mycllBTNAGAIN = "btnCALL_" + myOtherID;
                // remove_CONNECTION(myotherID);
                document.getElementById(mycllBTNAGAIN).disabled = true;
            }
        }


        if (pc.iceConnectionState === "checking") {
            // console.log("CAND CHECKING");
            //let myJSON = {};
            //  console.log("CHECKING ICE");


            if ((event.candidate != null) && (myUSER != null) && (myOtherID != null)) {
                let candidate = new RTCIceCandidate({ sdpMLineIndex: event.candidate.sdpMLineIndex, candidate: event.candidate.candidate });
                pc.addIceCandidate(candidate);
                let myJSON={};
                myJSON["ACTION"] = "CANDIDATE_MSG";
                myJSON["FROM"] = pageLISTEN.get_user_JSON.id;
                myJSON["TO"] = myOtherID;

                myJSON["candidate"] = event.candidate.candidate;
                //myJSON["candidate"] = event.candidate;
                myJSON["label"] = event.candidate.sdpMLineIndex;
                myJSON["id"] = event.candidate.sdpMid;
              //  console.log(myUSER + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');
            //    console.log(myOtherID + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');


                let triggered = myEVENTS.myCHANNEL.trigger("client-online-candidate-msg", myJSON,     { socket_id: myOtherID });

            }


        }
    }


    if ((event.candidate   != null)) {
        let myJSON = {};
        if ((myUSER != null) && (myOtherID != null)) {
            myJSON["ACTION"] = "CANDIDATE_MSG";
            myJSON["FROM"] = myUSER;
            myJSON["TO"] = myOtherID;
            myJSON["candidate"] = event.candidate.candidate;
            //myJSON["candidate"] = event.candidate;
            myJSON["label"] = event.candidate.sdpMLineIndex;
            myJSON["id"] = event.candidate.sdpMid;
          //  console.log(myUSER + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');
            //console.log(myOtherID + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');


            let triggered = myEVENTS.myCHANNEL.trigger("client-online-candidate-msg", myJSON,     { socket_id: myOtherID });

        } else {
            if (myOtherID == null) {
                console.log("myOtherID == null");
            }
        }



    }

    rtcLISTEN.set_RTC_SIGNAL_STAT=pc.connectionState;
    rtcLISTEN.set_RTC_ICE_STAT=pc.iceConnectionState;
    rtcLISTEN.set_ICE_GATHERING_STATE=pc.iceGatheringState;


}



function getName(pcID) {
    console.log("MY PC NAME : " + pcID);

    for (let i = 0; i < myPEERS.length; i++) {
        if (myPEERS[i]["UID"] === pcID) {
            return myPEERS[i]["UID"];
        }
    }
    // return (pc === pc1) ? 'pc1' : 'pc2';

}



function handleGetUserMediaError(e){
    console.log(e);
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    return !!window.RTCPeerConnection;
}


function muteMic(myStreamNOW) {
    myStreamNOW.getAudioTracks().forEach(track => track.enabled = !track.enabled);
}

function muteCam(myStreamNOW) {
    myStreamNOW.getVideoTracks().forEach(track => track.enabled = !track.enabled);
}