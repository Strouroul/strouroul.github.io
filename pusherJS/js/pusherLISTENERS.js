let rtcPEERS={};




let rtcLISTEN = {
    rtc_USER_ID: null,
    rtc_CONNECTION: null,
    rtc_CONNECTION_STATS: null,
    rtc_SIGNAL_STAT:null,
    rtc_ICE_STAT:null,
    bitrate: null,

    rtc_ICE_GATHERING_STATE:null,
    rtc_STAT_TYPE:null,
    rtc_TRACK_ID:null,

    rtcListener: function (val) {

    },
    get get_rtc_TRACK_ID ( ) {
        return this.rtc_TRACK_ID;
    },

    set set_rtc_TRACK_ID (thisSTATE) {
        this.rtc_TRACK_ID = thisSTATE;
        this.rtcListener(thisSTATE);
    },


    get get_rtc_STAT_TYPE ( ) {
        return this.rtc_STAT_TYPE;
    },

    set set_rtc_STAT_TYPE (thisSTATE) {
        this.rtc_STAT_TYPE = thisSTATE;
        this.rtcListener(thisSTATE);
    },
    get get_ICE_GATHERING_STATE ( ) {
        return this.rtc_ICE_GATHERING_STATE;
    },

    set set_ICE_GATHERING_STATE (thisSTATE) {
        this.rtc_ICE_GATHERING_STATE = thisSTATE;
        this.rtcListener(thisSTATE);
    },
    get get_RTC_USER_ID ( ) {
        return this.rtc_ICE_GATHERING_STATE;
    },

    set set_RTC_USER_ID (thisUSER) {
        this.rtc_USER_ID = thisUSER;
        this.rtcListener(thisUSER);
    },
    get get_RTC_CONNECTION ( ) {
        return this.rtc_CONNECTION;
    },

    set set_RTC_CONNECTION (thisCONN) {
        this.rtc_CONNECTION = thisCONN.PC_CONNECTION;
        this.set_RTC_SIGNAL_STAT=this.rtc_CONNECTION.signalingState;
        this.set_RTC_ICE_STAT=thisCONN.iceConnectionState;
        this.set_ICE_GATHERING_STATE=thisCONN.iceGatheringState;
        this.rtcListener(thisCONN);
    },

    get get_RTC_CONNECTION_STATUS( ) {
        return this.rtc_CONNECTION_STATS;
    },

    set set_RTC_CONNECTION_STATUS(val) {
        this.rtc_CONNECTION_STATS = val;
        this.rtcListener(val);
    },

    get get_RTC_SIGNAL_STAT( ) {
        return this.rtc_SIGNAL_STAT;
    },

    set set_RTC_SIGNAL_STAT(val) {
        this.rtc_SIGNAL_STAT = val;
        this.rtcListener(val);
    },

    get get_RTC_ICE_STAT( ) {
        return this.rtc_ICE_STAT;
    },

    set set_RTC_ICE_STAT(val) {
        this.rtc_ICE_STAT = val;
        this.rtcListener(val);
    },


    get get_RTC_BITRATE( ) {
       /* let thisBITRATEnow=this.bitrate;
        if(thisBITRATEnow!=null&&!isNaN(thisBITRATEnow)){
            thisBITRATEnow='0 kb/sec';
        }*/
        return this.bitrate  || '0 kb/sec';
    },

    set set_RTC_BITRATE(val) {
        this.bitrate = val;
        this.rtcListener(val);
    },



    register_RTC_Listener: function (listener) {
        this.rtcListener = listener;

    },

};

rtcLISTEN.register_RTC_Listener(function (val) {
    // alert("Someone changed the value of connInternal to " + val);
   // console.log("SOMEONE CHANGED RTC  : " + val);

    let mySTRnowHTML=  "rtc_CONNECTION_STATS : "+rtcLISTEN.rtc_CONNECTION_STATS+"<BR>"+
    "rtc_SIGNAL_STAT : "+rtcLISTEN.rtc_SIGNAL_STAT+"<BR>"+
    "rtc_ICE_STAT : "+rtcLISTEN.rtc_ICE_STAT+"<BR>"+
    "ICE_GATHERING_STATE : "+rtcLISTEN.get_ICE_GATHERING_STATE+"<BR>"+
    "RTC_STAT_TYPE : "+rtcLISTEN.get_rtc_STAT_TYPE+"<BR>"+
    "RTC_TRACK_ID : "+rtcLISTEN.get_rtc_TRACK_ID+"<BR>"+
        "bitrate : "+rtcLISTEN.get_RTC_BITRATE+"<BR>" ;

    document.getElementById("divLOG").innerHTML=mySTRnowHTML;



});

/////////////////////////LISTNERS now
var pageLISTEN = {
    connInternal: false,
    connListener: function (val) { },

    userInternal:null,
    userListener: function (val) { },

    get get_user_JSON( ) {
        return this.userInternal;
    },

    set set_user_JSON(val) {
        this.userInternal = val;
        this.userListener(val);
    },


    get get_user_id() {
        return this.userInternal.id;
    },
    get get_user_jsID() {
        return this.userInternal.jsID;
    },
    get get_user_name() {
        return this.userInternal.name;
    },


    set set_conn_status(val) {
        this.connInternal = val;
        this.connListener(val);
    },
    get get_conn_status() {
        return this.connInternal;
    },


    register_CONN_Listener: function (listener) {
        this.connListener = listener;

    },
    register_USER_Listener: function (listener) {
        this.userListener = listener;

    },


};

pageLISTEN.register_CONN_Listener(function (val) {
    // alert("Someone changed the value of connInternal to " + val);
    console.log("SOMEONE CHANGED CONN STATUS " + val);


});
pageLISTEN.register_USER_Listener(function (val) {
    // alert("Someone changed the value of connInternal to " + val);
    console.log("SOMEONE CHANGED USER STATUS " + JSON.stringify(val));


});


