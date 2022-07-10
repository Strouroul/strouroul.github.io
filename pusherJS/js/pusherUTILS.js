var testMSG=0;


function connectPUSHER(){
    let state = pusher.connection.state;
    console.log("STATE NOW : "+state);
    if(state!="connected"){
        try{
            pusher.connect();
        }
        catch (e) {
            console.log("ERROR Connecting  : "+e);
        }
    }

}

function disconnectPUSHER(){

    if(pusher!=null){
        let state = pusher.connection.state;
        console.log("STATE NOW : "+state);
        pusher.disconnect();
        state = pusher.connection.state;
        console.log("STATE NOW : "+state);
    }
}


function signinUSER(){
    if(pusher!=null){
        pusher.signin();
        document.getElementById("user_INFO").innerHTML=JSON.stringify(myPAGEUSER);
    }else{
        document.getElementById("user_INFO").innerHTML="NEED TO SET NAME FIRST";

        console.log("NEED TO SET NAME FIRST");
    }

}


function subUSER(myCHANNELname){
    let channelNOW =myEVENTS.myCHANNEL || pusher.subscribe(myEVENTS.channelName );
    myEVENTS.myCHANNEL=channelNOW;

    document.getElementById("user_list").innerHTML="";

let myEVEobj;

for (myEVEobj in myEVENTS){
    if(myEVEobj !="myCHANNEL"){  //REGITER EVENTS ONLY
        myEVENTS.myCHANNEL.bind(myEVEobj,myEVENTS[myEVEobj]    );
    }

}

/*
    myEVENTS.myCHANNEL.bind("pusher:member_added",myEVENTS["pusher:member_added"]    );
    myEVENTS.myCHANNEL.bind("pusher:member_removed", myEVENTS["pusher:member_removed"]  );

    myEVENTS.myCHANNEL.bind("pusher:ping", myEVENTS["pusher:ping"] );
    myEVENTS.myCHANNEL.bind("pusher:signin",   myEVENTS["pusher:signin"]);

    myEVENTS.myCHANNEL.bind("pusher:subscribe",   myEVENTS["pusher:subscribe"]);

    myEVENTS.myCHANNEL.bind("client-sysmsg", myEVENTS["client-sysmsg"]);



    myEVENTS.myCHANNEL.bind('pusher:subscription_succeeded',  myEVENTS["pusher:subscription_succeeded"]);
*/


 /*   pusher.allChannels().forEach(channel => {
            console.log(channel.name);
        }
    );*/


}



function getROOMUSER(){
    document.getElementById("user_list").innerHTML="";

    var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe(myEVENTS.channelName );
    channelNOW.members.each(function (member) {
        var userId = member.id;
        var userInfo = member.info;
        if(userId===pageLISTEN.get_user_JSON.id){
            document.getElementById("user_INFO").innerHTML=JSON.stringify(myPAGEUSER);
        }
        else{
            if(userId!=null&&userInfo!=null){
                if(document.getElementById( "user_" +userId)!=null){
                    console.log("ALREADY IN LIST  : "+userId);
                }else{

                    addMemberToUserList(member );
                }

            }
           // console.log(userId);
          //  console.log(userInfo);

        }


    });
}

function sendUSERCHATMSG(myUSERNOW){
    var myMSG="";

    if(document.getElementById("txtCHATuser"+myUSERNOW)!=null){
        myMSG=document.getElementById("txtCHATuser"+myUSERNOW).value;

    }else{
        myMSG="CHAT DIV NOT FOUND ?????????";
    }



    var myMSGtoSEND=  {

        MSGID:IDGenerate(),
        FROM:pageLISTEN.get_user_JSON.id,
        TO:myUSERNOW,
        CHANNEL: channelName,
        message:  myMSG,
        STATUS:  "SEND",
        TIME:new Date().getTime()
    };
    var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe(myEVENTS.channelName );
    // pusher.trigger(channelName, "sysmsg-test", {message:"HELLO"}, { socket_id: myUSER });
    var triggered = channelNOW.trigger("client-chat-msg",myMSGtoSEND    ,       { socket_id: myUSERNOW });
     addCHATMSGtoDIV( "divRECVMSGCHAT"+myMSGtoSEND.TO,myMSGtoSEND ,null);


   /* if( document.getElementById("divRECVMSGCHAT"+myUSERNOW)!=null){
        if(document.getElementById("divRECVMSGCHAT"+myUSERNOW).innerHTML!=""){
            document.getElementById("divRECVMSGCHAT"+myUSERNOW).innerHTML=
                document.getElementById("divRECVMSGCHAT"+myUSERNOW).innerHTML+
                "ME : "+document.getElementById("txtCHATuser"+myUSERNOW).value +
                "<div id='divSTATUSmsgID"+myMSGtoSEND.MSGID+"'>"+myMSGtoSEND.STATUS+"</div>"
                +"<BR>";
        }else{
            document.getElementById("divRECVMSGCHAT"+myUSERNOW).innerHTML=
                "ME : "+document.getElementById("txtCHATuser"+myUSERNOW).value+
                "<div id='divSTATUSmsgID"+myMSGtoSEND.MSGID+"'>"+myMSGtoSEND.STATUS+"</div>" +
                "<BR>";
        }


    }*/
    // pusher.sendToUser(myUSER, "client-sysmsg", { message: "hello world" });
}

function sendTESTMSG(myUSERNOW){

    var myMSGtime=new Date();
    // console.log(myUSER);
    var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe(myEVENTS.channelName );
    // pusher.trigger(channelName, "sysmsg-test", {message:"HELLO"}, { socket_id: myUSER });
    var triggered = channelNOW.trigger("client-chat-msg",
        {

            FROM:pageLISTEN.get_user_JSON.id,
            TO:myUSERNOW,
            CHANNEL: channelName,
            message:   "TEST MSG "+(testMSG++),
            TIME:new Date().getTime()
        },
        { socket_id: myUSERNOW });
    // pusher.sendToUser(myUSER, "client-sysmsg", { message: "hello world" });
}

function getUSERINFO(userIDforINFO){
    var channelNOW =myEVENTS.myCHANNEL   || pusher.subscribe( myEVENTS.channelName );
    var user = channelNOW.members.get(userIDforINFO);
    console.log("USER INFO IS : "+JSON.stringify(user));
   // document.getElementById("divLOG").innerHTML="USER INFO IS : "+JSON.stringify(user);


}

const hashCode = (s) =>
    s.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
function addMemberToUserList(memberJSON) {
   let userEl = document.createElement("div");
    //var myNAME= memberJSON.info.name+"  ("+memberJSON.info.jsID+")";


  /*  let userCHAT = document.createElement("input");
    userCHAT.id="txtCHATuser"+memberJSON.id;
    userCHAT.type="text";*/

    userEl.id = "user_" + memberJSON.id;


    userEl.innerHTML = "<button onclick='sendTESTMSG(\""+memberJSON.id+"\")'>PING : "+memberJSON.info.name+"</button>"+
        "   "+
        "<button onclick='getUSERINFO(\""+memberJSON.id+"\")'>"+"GET INFO"+"</button>"+

        "<button id='btnSTART_"+memberJSON.id+"' onclick='startRTC(\""+memberJSON.id+"\");sendSTARTcallTRIGGER(\""+memberJSON.id+"\");'>"+"START CONNS"+"</button>"+
        "<button id='btnCALL_"+memberJSON.id+"' onclick='callRTC(\""+memberJSON.id+"\")'>"+"CALL"+"</button>"+
        "<button id='btnEND_"+memberJSON.id+"' onclick='hangupRTC(\""+memberJSON.id+"\");" +
        "let thisANSWERMSG = {" +
        "       \"FROM\": pageLISTEN.get_user_JSON.id,\n" +
        "        \"TO\": "+memberJSON.id+" ,\n" +
        "        \"ACTION\": \"HANGUP_MSG\",\n" +
        "\n" +
        "         ["+pageLISTEN.get_user_JSON.id+"]:true\n" +
        "    };" +
        "hangupTRIGGERsend(\""+memberJSON.id+"\",thisANSWERMSG);'>"+"HUNG UP"+"</button>"+

        "<button id='btnSWITCH_"+memberJSON.id+"' onclick='switchSTREAM(\""+memberJSON.id+"\")'>"+"SWITCH VIDEO"+"</button>"+

        "<button id='btnRESTART_"+memberJSON.id+"' onclick='restartICE(\""+memberJSON.id+"\")'>"+"RESTART ICE TEST"+"</button>"+
"<BR></BR>"+




    "SEND MSG : <input type='text' id='txtCHATuser"+memberJSON.id+"' ><button onclick='sendUSERCHATMSG(\""+memberJSON.id+"\")'>SEND</button>"+
    "<div id='divRECVMSGCHAT"+memberJSON.id+"'></div>";
    userEl.style.backgroundColor =  "hsl(" + (hashCode(memberJSON.id) % 360) + ",70%,60%)";
    userEl.style.width="100%";

    document.getElementById("user_list").appendChild(userEl);
}
