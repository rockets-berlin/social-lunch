var Message = function(proprieties){

    this.message    = proprieties.message;
    this.from       = proprieties.from;
    if(proprieties.to !== undefined) {
        this.to = to;
    }
};
Message.prototype = {
    from        :   null,
    to          :   null,
    message     :   null
};