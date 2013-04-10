var User    =   function(properties)
                {
                    if(properties !== undefined){
                        this.uid = properties.uid;
                        this.name = properties.name;
                    }

                }

User.prototype = {
    uid     :   'user-' + Math.floor(Math.random()*11),
    name    :   'Anonymous',
    login   :   function()
                {},
    logout  :   function()
                {},

    getData :   function()
                {
                   return {
                       uid     :   this.uid,
                       name    :   this.name
                   }
                }
}

