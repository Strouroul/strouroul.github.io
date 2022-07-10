




class EVENT_CLASS{
    constructor(myEVENTtype,thisEVENTjson) {
        //  console.log(thisEVENTjson);
        //  var thisEVENTjsonNOW=JSON.parse(thisEVENTjson);
        // this.EVENT=null;
        // this.DATA=null;
        //this.CHANNEL=null;
        if(myEVENTtype!=null){  this.TYPE=myEVENTtype; }
        if(thisEVENTjson.hasOwnProperty("event")){  this.EVENT=thisEVENTjson["event"]; }

        if(thisEVENTjson.hasOwnProperty("data")){this.DATA=thisEVENTjson["data"];}

        if(thisEVENTjson.hasOwnProperty("channel")){  this.CHANNEL=thisEVENTjson["channel"];}

    }
}


class PEER_CONNECTION_CLASS {
    constructor(meID,otherID ) {
        this.ME = meID;
        this.OTHER = otherID;
        this.REMOTE_VIDEO_HTML_ID = null;
        if (pageLISTEN.get_user_JSON.id=== meID) {
            this.setREMOTE_VIDEO_HTML_ID = "video_" + otherID;
        }
        else { this.setREMOTE_VIDEO_HTML_ID = "video_" + meID; }


        //let RTCPeerConnection = window.webkitRTCPeerConnection     || window.mozRTCPeerConnection   || window.RTCPeerConnection;
        let thisRTCPeerConnection =window.webkitRTCPeerConnection ||  window.mozRTCPeerConnection || window.RTCPeerConnection;
        let videoID = videoSelect.options[videoSelect.selectedIndex].id ||videoSelect.options[0].id ;
        let audioID = audioInputSelect.options[audioInputSelect.selectedIndex].id ||audioInputSelect.options[0].id ;
       // console.log(videoID);
      //  console.log(audioID);
           // pc_constraints.audio.deviceId=audioID;
            pc_constraints.video.deviceId=videoID;
            pc_constraints.video.facingMode =true;

        if (agentInfo!=null) {

            if (agentInfo["browser"]["name"].includes("Chrome")) {

                offerOptions = {
                    mandatory: {
                        OfferToReceiveAudio: 1,
                        OfferToReceiveVideo: 1
                    }
                };
                this.PC_CONNECTION = new thisRTCPeerConnection(pc_config);
                //  this.PC_CONNECTION = new window.webkitRTCPeerConnection(pc_config);
            }
            if (agentInfo["browser"]["name"].includes("Firefox")) {
                offerOptions = {

                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                    iceRestart: true,
                    voiceActivityDetection: true
                };
                this.PC_CONNECTION = new   thisRTCPeerConnection(pc_config, pc_constraints);
            }
            if (agentInfo["browser"]["name"].includes("Edge")) {
                offerOptions = {

                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                    iceRestart: true,
                    voiceActivityDetection: true
                };
                this.PC_CONNECTION = new thisRTCPeerConnection(pc_config);

            }
            if (agentInfo["browser"]["name"].includes("Safari")) {
                offerOptions = {

                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                    iceRestart: true,
                    voiceActivityDetection: true
                };
                this.PC_CONNECTION = new thisRTCPeerConnection(pc_config);

            }
            //new thisRTCPeerConnection(pc_config, pc_constraints);
        }else{
            console.log("AGENT INFO MISSING");
        }
        this.CONNECTION_STATUS = this.PC_CONNECTION.signalingState;
        console.log("CONNECTION MADE" + this.CONNECTION_STATUS);
        this.PC_CONNECTION_STATUS=null;
        let thisCONNobj=this.PC_CONNECTION;
        let thisSTATobj=   this.PC_CONNECTION_STATUS;
        ////this.PC_CONNECTION.onicecandidate = event => this.PC_CONNECTION.addIceCandidate(event.candidate)
        ////    .then(() => onAddIceCandidateSuccess(this.PC_CONNECTION, event.candidate), err => onAddIceCandidateError(this.PC_CONNECTION, err));
        if(this.PC_CONNECTION!=null){
    this.PC_CONNECTION.addEventListener('signalingstatechange', event => {
        console.log(JSON.stringify(event));

    });
    this.PC_CONNECTION.addEventListener("icecandidate", event => {
            if (event.candidate) {

                //SEND TO FIRST
                let myJSON = {};
                myJSON["ACTION"] = "CANDIDATE_MSG";
                myJSON["FROM"] = this.ME;
                myJSON["TO"] = this.OTHER ;
                myJSON["candidate"] = event.candidate.candidate;
                //myJSON["candidate"] = event.candidate;
                myJSON["label"] = event.candidate.sdpMLineIndex;
                myJSON["id"] = event.candidate.sdpMid;
                if ((myEVENTS.myCHANNEL != null)  ) {

                    let triggered = myEVENTS.myCHANNEL.trigger("client-online-candidate-msg", myJSON ,{ socket_id:  myJSON["TO"] });
                    console.log("SENDING CANDIDATE");
                }

               // console.log(this.OTHER  + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');
            }
        }  );
    this.PC_CONNECTION.addEventListener('iceconnectionstatechange', event => {
        onIceStateChange(    this.get_THIS_PEER_CONNECTION_OBJ, event, this.ME, this.OTHER);
    });
    this.PC_CONNECTION.addEventListener('connectionstatechange', event => {
        console.log(JSON.stringify(event));

    });
    this.PC_CONNECTION.addEventListener('icecandidateerror', event => {
                console.log(JSON.stringify(event));
            });

    this.PC_CONNECTION.addEventListener('datachannel', event => {
                console.log(JSON.stringify(event));
            });
    this.PC_CONNECTION.addEventListener('icegatheringstatechange', event => {
        console.log(JSON.stringify(event));
    });
    this.PC_CONNECTION.addEventListener('negotiationneeded', event => {
          console.log( "negotiationneeded :"+JSON.stringify(event));

        if (event.candidate) {
            //SEND TO FIRST
            let myJSON = {};
            myJSON["ACTION"] = "CANDIDATE_MSG";
            myJSON["FROM"] =meID;
            myJSON["TO"] = otherID ;
            myJSON["candidate"] = event.candidate.candidate;
            //myJSON["candidate"] = event.candidate;
            myJSON["label"] = event.candidate.sdpMLineIndex;
            myJSON["id"] = event.candidate.sdpMid;
            if ((myEVENTS.myCHANNEL != null)  ) {
                let triggered = myEVENTS.myCHANNEL.trigger("client-online-candidate-msg", myJSON ,{ socket_id:  myJSON["TO"] });

            }

            // console.log(this.OTHER  + " ICE candidate:\n" + event.candidate ? event.candidate.candidate : '(null)');
        }
        thisCONNobj.restartIce();
      /*  this.PC_CONNECTION.getSenders().map(sender => {
           const kindOfTrack = sender.track?.kind;
            if (sender.transport) {
                const iceTransport = sender.transport.iceTransport;
                const logSelectedCandidate = (e) => {
                    const selectedCandidatePair = iceTransport.getSelectedCandidatePair();
                    console.log(`SELECTED ${kindOfTrack || 'unknown'} SENDER CANDIDATE PAIR`, selectedCandidatePair);
                };
                iceTransport.onselectedcandidatepairchange = logSelectedCandidate;
                logSelectedCandidate();
            } else {
                // retry at some time later
            }

        });*/

       /* this.PC_CONNECTION.getReceivers().map(sender => {
            const kindOfTrack = sender.track?.kind;
            if (sender.transport) {
                const iceTransport = sender.transport.iceTransport;
                const logSelectedCandidate = (e) => {
                    const selectedCandidatePair = iceTransport.getSelectedCandidatePair();
                    console.log(`SELECTED ${kindOfTrack || 'unknown'} SENDER CANDIDATE PAIR`, selectedCandidatePair);
                };
                iceTransport.onselectedcandidatepairchange = logSelectedCandidate;
                logSelectedCandidate();
            } else {
                // retry at some time later
            }
        });*/



    });
    this.PC_CONNECTION.addEventListener('track', event => {
        console.log("ontrack fired!");
        console.log("STREAM COUNT : " + event.streams.length);
        try {
            thisREMOTEVID.srcObject = event.streams[0];
        } catch (error) {
            thisREMOTEVID.src = URL.createObjectURL(event.streams[0]);
        }
        console.log("ontrack THE REMOTE VIDEO HTML ELM  " + "  ID :" +  thisREMOTEVID.id);
        if (thisREMOTEVID != null) {
            console.log("ONTARACK ID:" + thisREMOTEVID.id);
            let myREMOteHTMLview = document.getElementById(thisREMOTEVID.id);
            try {
                myREMOteHTMLview.srcObject = event.streams[0];
            } catch (error) {
                myREMOteHTMLview.src = URL.createObjectURL(event.streams[0]);
            }
        } else {
            console.log("REMOTE_VIDEO_HTML   is still null");
            alert("MY VID EMPTY");
        }
    });



            this.PC_CONNECTION.onclose= function () {
                remove_CONNECTION(otherID);
                let mySTARTBTNAGAIN = "btnSTART_" + otherID;
                if( document.getElementById(mySTARTBTNAGAIN)!=null){
                    document.getElementById(mySTARTBTNAGAIN).disabled = false;
                }

                let mycllBTNAGAIN = "btnCALL_" + otherID;
                // remove_CONNECTION(myotherID);
                if( document.getElementById(mycllBTNAGAIN)!=null){
                    document.getElementById(mycllBTNAGAIN).disabled = false;
                }

                // delete users[connection.name];

            };

           /* this.PC_CONNECTION.getSenders().map(sender => {
                const kindOfTrack = sender.track?.kind;
                if (sender.transport) {
                    const iceTransport = sender.transport.iceTransport;
                    const logSelectedCandidate = (e) => {
                        const selectedCandidatePair = iceTransport.getSelectedCandidatePair();
                        console.log(`SELECTED ${kindOfTrack || 'unknown'} SENDER CANDIDATE PAIR`, selectedCandidatePair);
                    };
                    iceTransport.onselectedcandidatepairchange = logSelectedCandidate;
                    logSelectedCandidate();
                } else {
                    // retry at some time later
                }
            });
            this.PC_CONNECTION.getReceivers().map(sender => {
                const kindOfTrack = sender.track?.kind;
                if (sender.transport) {
                    const iceTransport = sender.transport.iceTransport;
                    const logSelectedCandidate = (e) => {
                        const selectedCandidatePair = iceTransport.getSelectedCandidatePair();
                        console.log(`SELECTED ${kindOfTrack || 'unknown'} SENDER CANDIDATE PAIR`, selectedCandidatePair);
                    };
                    iceTransport.onselectedcandidatepairchange = logSelectedCandidate;
                    logSelectedCandidate();
                } else {
                    // retry at some time later
                }
            });*/


            thisSTATobj= window.setInterval(function(){
          /*    if(    thisCONNobj.getSenders()!=null){
                   let senders= thisCONNobj.getSenders() ;
                   senders.forEach(function (thisSENDER){
                      // console.log(typeof thisSENDER);
                       thisSENDER.getStats() .then(function(resultsSS){
                           showRemoteStats(resultsSS,thisCONNobj);
                       }).catch(function (err){
                           console.log(err);
                           clearInterval( thisSTATobj);
                           thisSTATobj=null;
                           console.log("TIMER CLEARED");

                       }) .then(function(){
                           rtcLISTEN.set_RTC_SIGNAL_STAT=thisCONNobj.signalingState;
                           rtcLISTEN.set_RTC_ICE_STAT=thisCONNobj.iceConnectionState;
                           rtcLISTEN.set_ICE_GATHERING_STATE=thisCONNobj.icegatheringstatechange;
                       }) ;

                    } ) ;
                }*/

             /* if(thisCONNobj.getReceivers()!=null){

                        let recieverss= thisCONNobj.getReceivers() ;
                        recieverss.forEach(function (thisRECIEVER){
                        //    console.log(typeof thisRECIEVER);

                            thisRECIEVER.getStats() .then(function(resultsSS){
                                showRemoteStats(resultsSS,thisCONNobj);
                            }).catch(function (err){
                                console.log(err);
                                clearInterval( thisSTATobj);
                                thisSTATobj=null;
                                console.log("TIMER CLEARED");

                            }).then(function(){
                                rtcLISTEN.set_RTC_SIGNAL_STAT=thisCONNobj.signalingState;
                                rtcLISTEN.set_RTC_ICE_STAT=thisCONNobj.iceConnectionState;
                                rtcLISTEN.set_ICE_GATHERING_STATE=thisCONNobj.icegatheringstatechange;
                            }) ;
                        } ) ;
                }*/



             thisCONNobj.getStats() .then(function(resultsSS){
                 showRemoteStats(resultsSS,thisCONNobj);
             }).catch(function (err){
                    console.log(err);
                    clearInterval( thisSTATobj);
                    thisSTATobj=null;
                    console.log("TIMER CLEARED");
                }).then(function(){
                    rtcLISTEN.set_RTC_SIGNAL_STAT=thisCONNobj.signalingState;
                    rtcLISTEN.set_RTC_ICE_STAT=thisCONNobj.iceConnectionState;
                   rtcLISTEN.set_ICE_GATHERING_STATE=thisCONNobj.iceGatheringState;
                }) ;



            }, 1000);

            /*getStats(thisCONNobj, function(result) {
                result.connectionType.remote.ipAddress
                result.connectionType.remote.candidateType
                result.connectionType.transport

                result.bandwidth.speed // bandwidth download speed (bytes per second)

                // to access native "results" array
                result.results.forEach(function(item) {
                    if (item.type === 'ssrc' && item.transportId === 'Channel-audio-1') {
                        var packetsLost = item.packetsLost;
                        var packetsSent = item.packetsSent;
                        var audioInputLevel = item.audioInputLevel;
                        var trackId = item.googTrackId; // media stream track id
                        var isAudio = item.mediaType === 'audio'; // audio or video
                        var isSending = item.id.indexOf('_send') !== -1; // sender or receiver

                        console.log('SendRecv type', item.id.split('_send').pop());
                        console.log('MediaStream track type', item.mediaType);
                    }
                });
            }, 1000);*/


    }

        //////////////////////////////////////////////////////////////////////////////////////
        //HTML STUFF NOW FOR THE DIV CONTAINING THIS PEER VIDEO
        this.REMOTE_VIDEO_HTML = null;


        if(this.REMOTE_VIDEO_HTML==null&&this.getREMOTE_VIDEO_HTML == null){
            this.setREMOTE_VIDEO_HTML = "";
        }
        let thisREMOTEVID = this.getREMOTE_VIDEO_HTML;

        if ((this.getREMOTE_VIDEO_HTML != null) && (this.getREMOTE_VIDEO_HTML_ID != null)) {
            this.getREMOTE_VIDEO_HTML.addEventListener('loadedmetadata', function () {
                console.log("LISNTERS thisREMOTEVID Remote video videoWidth: " + this.videoWidth + "px,  videoHeight: " + this.videoHeight + "px");

            });
            thisREMOTEVID = this.getREMOTE_VIDEO_HTML;
            this.getREMOTE_VIDEO_HTML.onresize = () => {
                console.log("LISNTERS thisREMOTEVID Remote video size changed to " +  this.videoWidth + "," +   this.videoHeight);
                // We'll use the first onsize callback as an indication that video has started
                // playing out.
                endTime = window.performance.now();
                if (startTime) {
                    //  const elapsedTime = window.performance.now() - startTime;
                    const elapsedTime = endTime - startTime;
                    console.log("Setup time: " + elapsedTime.toFixed(3) + "ms");
                    startTime = null;

                    let mydisableCALLBTN = "btnCALL_" + otherID;
                    // alert(disableCALLBTN);
                    let  disableCALLBTN = document.getElementById(mydisableCALLBTN);
                    disableCALLBTN.disabled = true;

                }
            };

            //this.REMOTE_VIDEO_HTML=  thisREMOTEVID;
          //  document.getElementById("divREMOTES").innerHTML = document.getElementById("divREMOTES").innerHTML + "<BR>";

            ////document.getElementById("divREMOTES").innerHTML = document.getElementById("divREMOTES").innerHTML + "<BR>" +
            ////    " Client ID : " + otherID + thisREMOTEVID.outerHTML;

        } else {
            alert("HTML IS NOT  SET");
            console.log("SOMETHING NULL");
        }

    }


    get getREMOTE_VIDEO_HTML () {
        return this.REMOTE_VIDEO_HTML;
    }

    set setREMOTE_VIDEO_HTML(val) {
        let myVidTOADD=null;
        let testID;
        if (pageLISTEN.get_user_JSON.id === this.ME) {
            testID = "video_" + this.OTHER;
            //source.id = "src_" + this.OTHER;
        }else{
            testID = "video_" + this.ME;
        }
        let hasChildElements, child;
        hasChildElements = false;
        let thisREMOTES=document.getElementById("REMOTES");
        if(thisREMOTES!=null){
            for (child = thisREMOTES.firstChild; child; child = child.nextSibling) {
                if (child.id == 1) { // 1 == Element
                    hasChildElements = true;
                    break;
                }
            }
        }


        if(document.getElementById(testID)==null&&!hasChildElements){

            myVidTOADD= document.createElement("video");
            //  var source = document.createElement('source');
            // myVidTOADD.appendChild(source);

            if (pageLISTEN.get_user_JSON.id === this.ME) {
                myVidTOADD.id = "video_" + this.OTHER;
                //source.id = "src_" + this.OTHER;
            }else{
                myVidTOADD.id = "video_" + this.ME;
            }

            myVidTOADD.autoplay = true;
            // myVidTOADD.playsinline = true;

            myVidTOADD.addEventListener('loadedmetadata', function () {
                console.log("LISNTERS myVidTOADD Remote video videoWidth: " + this.videoWidth + "px,  videoHeight: " + this.videoHeight + "px");

            });
            myVidTOADD.onresize = () => {
                console.log("LISNTERS myVidTOADD Remote video size changed to " + this.videoWidth + "," + this.videoHeight);
                // We'll use the first onsize callback as an indication that video has started
                // playing out.
                endTime = window.performance.now();
                if (startTime) {
                    //  const elapsedTime = window.performance.now() - startTime;
                    const elapsedTime = endTime - startTime;
                    console.log("Setup time: " + elapsedTime.toFixed(3) + "ms");
                    startTime = null;
                }
            };
            this.REMOTE_VIDEO_HTML=myVidTOADD;
            this.setREMOTE_VIDEO_HTML_ID = myVidTOADD.id;
            console.log("video made ID : "+this.getREMOTE_VIDEO_HTML_ID);
            document.getElementById("divREMOTES").appendChild(this.REMOTE_VIDEO_HTML);
        }
        else{
            // myVidTOADD=document.getElementById(testID);
            this.REMOTE_VIDEO_HTML=document.getElementById(testID);
            this.setREMOTE_VIDEO_HTML_ID = document.getElementById(testID).id;
            console.log("video EXIST ID : "+this.getREMOTE_VIDEO_HTML_ID);
        }




    }

    get getREMOTE_VIDEO_HTML_ID() {
        return this.REMOTE_VIDEO_HTML_ID;
    }

    set setREMOTE_VIDEO_HTML_ID(val) {
        this.REMOTE_VIDEO_HTML_ID=val;
    }


    get get_THIS_PEER_CONNECTION_OBJ() {
        return this.PC_CONNECTION;
    }
    get get_THIS_PEER_CONNECTION_OTHER() {
        return this.OTHER;
    }

    get get_THIS_PEER_CONNECTION_ME() {
        return this.ME;
    }

    get getCONNECTION_STATUS() {
        return this.PC_CONNECTION.signalingState;
    }
    set setCONNECTION_STATUS(mySTAT) {
        this.CONNECTION_STATUS = this.PC_CONNECTION.signalingState;
    }


    /*
 set setCONN(myCONN) {



                this.PC_CONNECTION.onicecandidate = handleICECandidateEvent;
                this.PC_CONNECTION.ontrack = handleTrackEvent;
                this.PC_CONNECTION.onnegotiationneeded = handleNegotiationNeededEvent;
                this.PC_CONNECTION.onremovetrack = handleRemoveTrackEvent;
                this.PC_CONNECTION.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
                this.PC_CONNECTION.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
                this.PC_CONNECTION.onsignalingstatechange = handleSignalingStateChangeEvent;




 }
   */
}



// functions for dumpStatsNEW
let wait = ms => new Promise(r => setTimeout(r, ms));
let repeat = (ms, func) => new Promise(r => (setInterval(func, ms), wait(ms).then(r)));
let log = msg => divLOG.innerHTML = divLOG.innerHTML + msg +"<br>";
let update = (div, msg) => div.innerHTML = msg;
    function dumpStatsNEW(o) {
        let s = "Timestamp: "+ new Date(o.timestamp).toTimeString() +" Type: "+ o.type +"<br>";
        if (o.ssrc !== undefined) s += "SSRC: " + o.ssrc + " ";
        if (o.packetsReceived !== undefined) {
            s += "Recvd: " + o.packetsReceived + " packets";
            if (o.bytesReceived !== undefined) {
                s += " ("+ (o.bytesReceived/1024000).toFixed(2) +" MB)";
            }
            if (o.packetsLost !== undefined) s += " Lost: "+ o.packetsLost;
        } else if (o.packetsSent !== undefined) {
            s += "Sent: " + o.packetsSent + " packets";
            if (o.bytesSent !== undefined) s += " ("+ (o.bytesSent/1024000).toFixed(2) +" MB)";
        } else {
            s += "<br><br>";
        }
        s += "<br>";
        if (o.bitrateMean !== undefined) {
            s += " Avg. bitrate: "+ (o.bitrateMean/1000000).toFixed(2) +" Mbps";
            if (o.bitrateStdDev !== undefined) {
                s += " ("+ (o.bitrateStdDev/1000000).toFixed(2) +" StdDev)";
            }
            if (o.discardedPackets !== undefined) {
                s += " Discarded packts: "+ o.discardedPackets;
            }
        }
        s += "<br>";
        if (o.framerateMean !== undefined) {
            s += " Avg. framerate: "+ (o.framerateMean).toFixed(2) +" fps";
            if (o.framerateStdDev !== undefined) {
                s += " ("+ o.framerateStdDev.toFixed(2) +" StdDev)";
            }
        }
        if (o.droppedFrames !== undefined) s += " Dropped frames: "+ o.droppedFrames;
        if (o.jitter !== undefined) s += " Jitter: "+ o.jitter;
        return s;
    }


function dumpStats(results) {
    let statsString={};
    results.forEach(res => {
        console.log(typeof res);
        statsString["type"]=res.type;
        statsString["id"]=res.id;
        statsString["time"]=res.timestamp;
        statsString["data"]= {};
        console.log("TYPE : "+res.type);
        console.log("ID : "+res.id);
        // statsString += '<h3>Report type=';
        //  statsString += res.type;
        //  statsString += '</h3>\n';
        // statsString += `id ${res.id}<br>`;
        //  statsString += `time ${res.timestamp}<br>`;
        Object.keys(res).forEach(k => {
            if (k !== 'timestamp' && k !== 'type' && k !== 'id') {
                statsString["data"][k]= JSON.stringify(res[k]) ;
                console.log(k+" :"+statsString["data"][k]);
                if (typeof res[k] === 'object') {
                    //statsString += `${k}: ${JSON.stringify(res[k])}<br>`;
                    statsString["data"][k]= res[k] ;
                } else {
                    //  statsString += `${k}: ${res[k]}<br>`;
                    statsString["data"][k]=res[k];
                }
            }
        });
    });

    return statsString;
}

function showRemoteStats(results,myCONNnowTOcheck) {

    // figure out the peer's ip
    let activeCandidatePair = null;
    let remoteCandidate = null;


    results.forEach(report => {
        const now = report.timestamp;

        rtcLISTEN.set_rtc_STAT_TYPE=report.type;
        rtcLISTEN.set_RTC_SIGNAL_STAT=myCONNnowTOcheck.signalingState;
        rtcLISTEN.set_RTC_ICE_STAT=myCONNnowTOcheck.iceConnectionState;
        rtcLISTEN.set_ICE_GATHERING_STATE=myCONNnowTOcheck.iceGatheringState;
        rtcLISTEN.set_rtc_TRACK_ID=mylocalStream.id;


        if (report.type === 'transport') {
            activeCandidatePair = results.get(report.selectedCandidatePairId);
        }


        //CALC BITRATE
        if (report.type === 'inbound-rtp' && report.kind === 'video') {
            let bitrate;
            const bytes = report.bytesReceived;
            if (timestampPrev) {
                bitrate =   (bytes - bytesPrev) / (now - timestampPrev);
                bitrate = bitrate.toFixed(1);            //Math.floor(bitrate);
            }
            bytesPrev = bytes;
            timestampPrev = now;
            if (!isNaN(bitrate)) {
                bitrate += ' kb/sec';
                rtcLISTEN.set_RTC_BITRATE=bitrate;

                //  document.getElementById("divRTCBITRATE").innerHTML = `<strong>Bitrate:</strong>${bitrate}`;
            }
        }

        /////////////////////////////////

        // Fallback for Firefox.
        if (!activeCandidatePair) {
            results.forEach(report => {
                if (report.type === 'candidate-pair' && report.selected) {
                    activeCandidatePair = report;
                }
            });
        }
        if (activeCandidatePair && activeCandidatePair.remoteCandidateId) {
            remoteCandidate = results.get(activeCandidatePair.remoteCandidateId);
        }
        if (remoteCandidate) {
            if (remoteCandidate.address && remoteCandidate.port) {
                //  document.getElementById("divRTCSTATS").innerHTML = `<strong>Connected to:</strong>${remoteCandidate.address}:${remoteCandidate.port}`;
                rtcLISTEN.set_RTC_CONNECTION_STATUS=`<strong>Connected to:</strong>${remoteCandidate.address}:${remoteCandidate.port}`;
            } else if (remoteCandidate.ip && remoteCandidate.port) {
                // document.getElementById("divRTCSTATS").innerHTML = `<strong>Connected to:</strong>${remoteCandidate.ip}:${remoteCandidate.port}`;
                rtcLISTEN.set_RTC_CONNECTION_STATUS=`<strong>Connected to:</strong>${remoteCandidate.ip}:${remoteCandidate.port}`;
            } else if (remoteCandidate.ipAddress && remoteCandidate.portNumber) {
                // Fall back to old names.
                //document.getElementById("divRTCSTATS").innerHTML = `<strong>Connected to:</strong>${remoteCandidate.ipAddress}:${remoteCandidate.portNumber}`;
                rtcLISTEN.set_RTC_CONNECTION_STATUS=`<strong>Connected to:</strong>${remoteCandidate.ipAddress}:${remoteCandidate.portNumber}`;
            }
            // console.log(remoteCandidate);
        }
    ////////////////////////////////////////////////////////////////////////////////




    });





}
