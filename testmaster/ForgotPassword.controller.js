sap.ui.controller("testmaster.ForgotPassword", {
    goBack: function () {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo("login");
    },
    Submit: function () {
                sap.ui.core.BusyIndicator.show(0);

//        var baseUrl = 'http://localhost/smartphonebizgstn/action/wbser/'; //local
//        var baseUrl = 'http://52.36.91.176/smartphonebizgstn/action/wbser/';
//        var baseUrl = 'http://49.50.77.11/~wwwsapapp/smartphonebizgstn/action/wbser/';
               var host = "http://smartphonebizapps.com/";

        var baseUrl = host+'smartphonebizapps/action/wbser/';
        var userid = sap.ui.getCore().byId("UserID").getValue();
        var emailid = sap.ui.getCore().byId("forgotusername").getValue();
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        if (emailid === '') {
            sap.m.MessageToast.show('Please Enter User Name/EmailID');
            sap.ui.getCore().byId("forgotusername").setValueState('Error');
        } else if (userid === '') {
            sap.m.MessageToast.show('Please Enter UserID');
            sap.ui.getCore().byId("UserID").setValueState('Error');
        }
        if (userid === '' && emailid === '') {
            sap.m.MessageToast.show('Please Enter Valid UserID AND Email');
            sap.ui.getCore().byId("forgotusername").setValueState('Error');
            sap.ui.getCore().byId("UserID").setValueState('Error');
        }
        else {
            $.ajax({
                url: baseUrl + 'forgotpassword.php',
                type: 'GET',
                data: {
                    Userid: userid,
                    Email: emailid,
                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                },
                success: function (configresponse) {
                    sap.m.MessageToast.show(configresponse, {duration: 3000});
//                    sap.m.MessageToast.show("Password updated successfully please check your email", {duration: 2000});
                    setTimeout(
                            function ()
                            {
                                router.navTo('login');
                            }, 2000);
                                    sap.ui.core.BusyIndicator.hide();

                    var oInput1 = sap.ui.getCore().byId("forgotusername");
                    oInput1.setValue("");
                    var oInput2 = sap.ui.getCore().byId("UserID");
                    oInput2.setValue("");

//                    var oInput2 = sap.ui.getCore().byId("ip02");
//                    oInput2.setValue("");
                },
                error: function (configresponse) {
                    if (configresponse.session === "expired") {
                        sap.m.MessageToast.show("There some problem,Please login again..");
                        setTimeout(function () {
                            location.assign(oStorage.get('GOBACK'));
                        }, 3000);
                    } else {

                        sap.m.MessageToast.show(configresponse.responseText, {duration: 3000});
//                    sap.m.MessageToast.show("Invalid User Name/EmailID", {duration: 3000});
                    }
                }
            });
        }
    }
});