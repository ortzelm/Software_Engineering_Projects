//A function to transfer the request from the client to the server
function start(fajax){
    var serv = new Server;
    var rtext = serv.whichFunc(fajax);
    fajax.responsText = rtext;
    fajax.onload(rtext);
    return rtext;
}

