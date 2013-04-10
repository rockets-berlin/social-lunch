var ChatWindow  =   function(Chat, container) {
                        this.client = Chat;
                        this.container = container;
                    };
ChatWindow.prototype = {

    container   :   null,
    elements    :   {
                        input   : document.createElement('input'),
                        output  : document.createElement('div'),
                        memberList  : document.createElement('div')
                    },
    client  :   null,
    build   :   function ()
                {
                    this.container.innerHTML = '';

                    this.elements.input.name = 'chat-source';
                    this.elements.input.type = 'text';

                    this.elements.output.className = 'message-list';
                    this.elements.memberList.className = 'member-list';

                    var submitBtn = document.createElement('button');
                    submitBtn.name = 'submit';
                    submitBtn.innerHTML = 'Talk';
                    submitBtn.className = 'btn-primary';


                    var form = document.createElement('form');
                    form.className = 'chat-form';
                    form.appendChild(this.elements.input);
                    form.appendChild(submitBtn);

                    var self = this;
                    form.onsubmit = function(event){
                        event.preventDefault();
                        self.client.talk(self.elements.input.value);
                        self.elements.input.value = '';
                    }
                    this.container.appendChild(this.elements.output);
                    this.container.appendChild(this.elements.memberList);
                    this.container.appendChild(form);

                },
    enter   :   function(user)
                {
                    var self = this;
                    this.client.enter(user, function(message){
                        var userHandle = document.createElement('a');
                            userHandle.innerHTML = message.from.name;
                            userHandle.href = "#";
                        var messageContainer = document.createElement('span');
                            messageContainer.appendChild(userHandle);
                            messageContainer.innerHTML += ':' + message.message;
                        var entry = document.createElement('div');
                            entry.appendChild(messageContainer);
                        self.elements.output.appendChild(entry);
                    }, this.client);

                    this.elements.memberList.innerHTML = '';
                    for(var i in Chat.members) {
                        var elem = document.createElement('a');
                            elem.className = 'member-link';
                            elem.innerHTML = this.client.members[i].name;
                        this.elements.memberList.appendChild(elem);
                        this.elements.memberList.appendChild(document.createElement('br'));

                    }

                }
};
var RegistrationWindow = {
    user    :   null,
    elements:   {
                    form: null,
                    user: null,
                    pass: null
                },
    attach  :   function(form, userField, passwordField)
                {
                    this.elements.form = form;
                    this.elements.user = userField;
                    if(passwordField !== undefined)
                        this.elements.pass = passwordField;
                    return this;
                },
    init    :   function()
                {

                    var self = this;
                    self.user = new User();
                    this.elements.form.onsubmit = function()
                    {
                        event.preventDefault();
                        self.user.name = self.elements.user.value;
                        self.elements.user.value = '';
                        delete self.form;
                        return false;
                    }
                    return this;
                }
};