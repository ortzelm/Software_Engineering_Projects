//fajax class - fake ajax , to connection with the server
class fajax {
    //initialize all properties in the constructor
    constructor() {
        this.url = "";
        this.status = "";
        this.state = "";
        this.responsText = "";
        this.funcName = "";
        this.method = "";
    }
    open(url, method) {
        this.url = url;
        this.method = method;
    }
    //send function - send to start function that declered in the network
    send() {
        return start(this);
    }
    //Update the capacitor service
    onload(enableF) {
        if(enableF == 404){
            this.status = 404;
        }
        else{
            this.status = 200;
        }
        this.state = 4;
    }
}