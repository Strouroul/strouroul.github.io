

Pusher.log = (msg) => {

    if((msg.indexOf("[")>0)&&(msg.indexOf("]")>0)){

        //  console.log(msg.substring(msg.indexOf("[")));
        if((msg.indexOf("{")>0)&&(msg.indexOf("}")>0)){

            var thisEVEjsonTOclass=msg.substring(msg.indexOf("{"),msg.lastIndexOf("}")+1);
            var thisJSONeve=JSON.parse(thisEVEjsonTOclass);
            var evenTXT= JSON.parse(msg.substring(msg.indexOf("[")).replace(thisEVEjsonTOclass,"").replace(",",""));
            //  console.log(evenTXT);
            var thisEVENNT=new EVENT_CLASS(evenTXT[0],thisJSONeve);
            var count = Object.keys(thisEVENNT).length;
            if(count>0){
            // console.log(JSON.stringify(thisEVENNT));

                if(thisEVENNT.hasOwnProperty("TYPE")){
                    if(thisEVENNT["TYPE"].includes("recd")){
                       // document.getElementById("divMSGrecd").innerHTML="RECV : "+JSON.stringify(thisEVENNT);
                    }

                  else  if(thisEVENNT["TYPE"].includes("sent")){
                       // document.getElementById("divMSGsent").innerHTML="SENT : "+JSON.stringify(thisEVENNT);
                    }

                    else{
                       // document.getElementById("divLOG").innerHTML=JSON.stringify(thisEVENNT);
                    }

                }
            }
         /*   // Network type that browser uses
            console.log('         type: ' + navigator.connection.type);
            // Effective bandwidth estimate
            console.log('     downlink: ' + navigator.connection.downlink + 'Mb/s');
            // Effective round-trip time estimate
            console.log('          rtt: ' + navigator.connection.rtt + 'ms');
            // Upper bound on the downlink speed of the first network hop
            console.log('  downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s');
            // Effective connection type determined using a combination of recently
            // observed rtt and downlink values: ' +
            console.log('effectiveType: ' + navigator.connection.effectiveType);
            // True if the user has requested a reduced data usage mode from the user
            // agent.
            console.log('     saveData: ' + navigator.connection.saveData);*/
        }

    }//PARSE HTML MSG

    var myARR= JSON.parse(  msg.substring(    msg.indexOf("[")    ) )             ;
  //   console.log(JSON.stringify(myARR));

    for(var i=0;i<myARR.length;i++){
          //  console.log(myARR[i]);
        if(typeof myARR[i] ==="object"){
            //   console.log(myARR[i]);
            var thisJSON=  myARR[i] ;
            if(thisJSON.hasOwnProperty("event") ){
             // console.log("EVENT : "+thisJSON["event"]);
            }
            if(thisJSON.hasOwnProperty("data") ){
                var thisDATAnow=thisJSON['data'];
                if(thisDATAnow.hasOwnProperty("user_data")){

                    var thisUSER=JSON.parse(thisDATAnow["user_data"]);

                    if(myPAGEUSER.id==null){
                        myPAGEUSER =thisUSER ;
                        pageLISTEN.set_user_JSON=myPAGEUSER ;
                        document.getElementById("user_INFO").innerHTML=JSON.stringify( pageLISTEN.get_user_JSON);
                        //   console.log("USER FOUND NOW : "+  myPAGEUSER.id);
                    }
                    else{
                        //console.log("USER Already FOUND  : "+  myPAGEUSER.id);
                    }

                }

            }
        }
        if(typeof myARR[i] ==="string"){}
    }

};




function addCHATMSGtoDIV(myDIV,myMSG,type){
    var thisMSGtype="";
    if(type==null){thisMSGtype="ME";}
    else{thisMSGtype="OTHER";}

    var thisMSGdiv=document.createElement("div");
    thisMSGdiv.id='divRECVMSGCHAT'+myMSG.id;
    thisMSGdiv.innerHTML=thisMSGtype+"   :"+myMSG.message + "<div id='divSTATUSmsgID"+myMSG.MSGID+"'>"+myMSG.STATUS+"</div>";

    if(document.getElementById(myDIV)!=null){
        document.getElementById(myDIV).appendChild(thisMSGdiv) ;
    }else{
        console.log("DIV NOT FOUND : "+myDIV.id);
    }

}