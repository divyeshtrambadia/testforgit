sap.ui.controller("testmaster.login", {

    onInit: function () {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
    },

    onBeforeRendering: function () {

    },

    onAfterRendering: function () {

    },

    onExit: function () {

    },

    onLogin: function () {
        sap.ui.core.BusyIndicator.show(0);
        var oView = this.getView();
        oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        var username = oView.byId("username").getValue();
        var Password = oView.byId("inputPassword").getValue();

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);


//        var siteUrl = 'http://localhost/smartphonebizgstn/'
//        var baseUrl = siteUrl + 'action/wbser/';
//        var fioriUrl = 'http://localhost/fiorigstn/WebContent/?sk=';
//        var goBack = 'http://localhost/SmartApp/WebContent/';
//        localStorage.setItem('MAINAPP', 'http://localhost/SmartApp/WebContent/');

        /* AWS Server Start */
       var siteUrl ='http://52.36.91.176/smartphonebizgstn/'
        //	var siteUrl = "proxy/http/52.36.91.176/smartphonebizgstn/";
        var baseUrl = siteUrl+'action/wbser/';
        var fioriUrl = 'http://52.36.91.176/fiorigstn/WebContent/?sk=';
        localStorage.setItem('MAINAPP', 'http://52.36.91.176/SmartApp/WebContent/');
var goBack = 'http://52.36.91.176/SmartApp/WebContent/';
        /* AWS Server End */

        /* Go4hosting Server Start */
//        var siteUrl = 'http://49.50.77.11/~smartphonebiz/smartphonebizgstn/';
//        var baseUrl = siteUrl+'action/wbser/';
//        var fioriUrl = 'http://49.50.77.11/~smartphonebiz/fiorigstn/WebContent/?sk=';
//        localStorage.setItem('MAINAPP', 'http://49.50.77.11/~smartphonebiz/SmartApp/WebContent/');
//var goBack = 'http://49.50.77.11/~smartphonebiz/SmartApp/WebContent/';
        /* Go4hosting Server End */

        oStorage.put('SITEURL', siteUrl);
        oStorage.put('BASEURL', baseUrl);
        oStorage.put('GOBACK', goBack);
        oStorage.put('FIORIURL', fioriUrl);
        localStorage.setItem('BASEURL', baseUrl);



        var oView = sap.ui.getCore().byId('app');

        if (username === "" || Password === "") {
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageToast.show('Please provide your login details');
        } else {

            $.ajax({
                url: baseUrl + 'login_ws.php',
                dataType: 'jSon',
                type: 'GET',
                data: {
                    USERID: username,
                    PASSWORD: calcMD5(Password)
                },
                success: function (configresponse) {

                    oStorage.put('USERNAME', configresponse.username);
                    oStorage.put('USERIMAGEURL', configresponse.vImage);
                    oStorage.put('USERID', configresponse.Userid);
                    oStorage.put('EPOPWINDOW', configresponse.ePopWindow);
                    oStorage.put('EDASHBOARD', configresponse.eDashboard);

                    oStorage.put('ROLE', configresponse.Role);

                    $.ajax({
                        url: baseUrl + 'tile_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            USERROLE: configresponse.Role,
                            USERID: configresponse.Userid,

                        },
                        success: function (tileresponse) {
                            var oModel1 = new sap.ui.model.json.JSONModel(tileresponse);
                            sap.ui.getCore().setModel(oModel1, 'oModel1');
                            sap.ui.getCore().setModel(tileresponse, 'oModel');
                        }
                    });
                    $.ajax({
                        url: baseUrl + 'getgstnno_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            USERID: configresponse.Userid,
                            Role: configresponse.Role

                        },
                        success: function (configresponse) {
                            var gstNoModel = new sap.ui.model.json.JSONModel(configresponse.collection);
                            var gstModel = new sap.ui.model.json.JSONModel(configresponse);
                            oStorage.put('SEARCHFIELD', configresponse.searchField)
                            oView.setModel(gstNoModel, 'gstNoModel');
                            oView.setModel(gstModel, 'gstModel');
                            sap.ui.getCore().setModel(gstModel, 'gstModel');

                        }
                    });
                    $.ajax({
                        url: baseUrl + 'userdefault_ws.php', //http://52.36.91.176/smartphonebiz/action/wbser/tile_ws.php?USERROLE=Employee&USERID=RoshniG
//            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            switchcase: 'getapprole',
                            USERROLE: oStorage.get('ROLE') //configresponse.Role,
//                          USERID: username          //configresponse.Userid,

                        },
                        success: function (response) {
                            var oModel1 = new sap.ui.model.json.JSONModel(response);
                            oModel1.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                            oView.setModel(oModel1, 'Apps');
                        }
                    });
                    setTimeout(function () {
                        sap.ui.core.BusyIndicator.hide();
                        if (oStorage.get('EDASHBOARD') == 'New') {
                            oRouter.navTo("new");
                        } else {
                            oRouter.navTo("Classic");
                        }


                    }, 3000);

                },
                error: function (configresponse) {

                    sap.ui.core.BusyIndicator.hide();
                    sap.m.MessageToast.show('Error occurred:' + configresponse.responseText);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        };
        
        
      // this model will get data from user manage table for the user who has logged in.  
        var oModel = new sap.ui.model.json.JSONModel('model/user.json');
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
        oView.setModel(oModel, 'Users');
    },

    onClear: function () {
        var oView = this.getView();
        oView.byId("username").setValue(null);
        oView.byId("inputPassword").setValue(null);
    },

    onForgot: function () {
    	this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("forgotPW");
//        sap.m.MessageBox.alert(
//                "Resetting is still under construction",
//                {
//                    title: "Error"
//                }
//        );
    }


});