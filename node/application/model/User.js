/**
 * Created with JetBrains WebStorm.
 * User: alin
 * Date: 4/10/13
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */

exports.User = {
    userList:{},
    login : function(user){
        this.userList[user.uid] = user;
    },
    logout: function(user){
        delete this.userList[user];
    },
    getUserList : function() {
        return this.userList;
    }

}