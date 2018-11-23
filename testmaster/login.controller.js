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
        oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

        var oView = this.getView();
        var username = oView.byId("username").getValue();
        var Password = oView.byId("inputPassword").getValue();

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

//        var siteUrl = 'http://localhost/smartphonebizgstn/'
//        var baseUrl = siteUrl + 'action/wbser/';
//        var fioriUrl = 'http://localhost/fiorigstn/WebContent/?sk=';
//        var goBack = 'http://localhost/SmartApp/WebContent/';
//        localStorage.setItem('MAINAPP', 'http://localhost/SmartApp/WebContent/');

        /* AWS Server Start */
//        var siteUrl ='http://52.36.91.176/smartphonebizgstn/'
//        var baseUrl = siteUrl+'action/wbser/';
//        var fioriUrl = 'http://52.36.91.176/fiorigstn/WebContent/?sk=';
//        localStorage.setItem('MAINAPP', 'http://52.36.91.176/SmartApp/WebContent/');
//var goBack = 'http://52.36.91.176/SmartApp/WebContent/';
        /* AWS Server End */

        /* Go4hosting Server Start */
        var host = "http://smartphonebizapps.com/";
        var siteUrl = host + 'smartphonebizapps/';
        var baseUrl = siteUrl + 'action/wbser/';
        var fioriUrl = host + 'gstnapp/WebContent/?sk=';
        var groupCalUrl = host + 'calendarPlanner/WebContent/?sk=';
        localStorage.setItem('MAINAPP', host + 'SmartApp/WebContent/');
        var goBack = host + 'SmartApp/WebContent/';
        /* Go4hosting Server End */

        oStorage.put('SITEURL', siteUrl);
        oStorage.put('BASEURL', baseUrl);
        oStorage.put('GOBACK', goBack);
        oStorage.put('FIORIURL', fioriUrl);
        oStorage.put('GROUPCALURL', groupCalUrl);
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
                    var oModel = new sap.ui.model.json.JSONModel(configresponse);
                    oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                    oView.setModel(oModel, 'Users');
                    oStorage.put('USERNAME', configresponse.username);
                    oStorage.put('USERIMAGEURL', configresponse.vImage);
                    oStorage.put('COMPANYIMAGEURL', configresponse.vCompanyImage);
                    oStorage.put('COMPANYNAME', configresponse.Company);
                    oStorage.put('USERID', configresponse.Userid);
                    oStorage.put('EPOPWINDOW', configresponse.ePopWindow);
                    oStorage.put('EDASHBOARD', configresponse.eDashboard);
                    oStorage.put('ROLE', configresponse.Role);
                    localStorage.setItem('SESSIONVALUE', configresponse.vLoginTime);

                    $.ajax({
                        url: oStorage.get("BASEURL") + 'language_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            userRole: oStorage.get('ROLE'),
                            action: 'translate',
                            sessionvalue: localStorage.getItem('SESSIONVALUE'),
                        },
                        success: function (configresponse) {

                            var oLanguageModel = new sap.ui.model.json.JSONModel(configresponse.language);
                            sap.ui.getCore().setModel(oLanguageModel, 'oLanguageModel');
                            $.ajax({
                                url: baseUrl + 'getuserrole_ws.php',
                                dataType: 'jSon',
                                type: "GET",
                                data: {
                                    UserID: oStorage.get('USERID'),
                                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                },
                                success: function (responce) {
                                    var oModel12 = new sap.ui.model.json.JSONModel(responce);
                                    oView.setModel(oModel12, 'RolesModel');
                                    if (responce.collection === "") {
                                        $.ajax({
                                            url: baseUrl + 'tile_ws.php',
                                            dataType: 'jSon',
                                            type: 'GET',
                                            data: {
                                                USERROLE: oStorage.get('ROLE'),
                                                USERID: oStorage.get('USERID'),
                                                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                            },
                                            success: function (tileresponse) {
                                                var oModel1 = new sap.ui.model.json.JSONModel(tileresponse);
                                                sap.ui.getCore().setModel(oModel1, 'oModel1');
                                                sap.ui.getCore().setModel(tileresponse, 'oModel');
                                                $.ajax({
                                                    url: baseUrl + 'getgstnno_ws.php',
                                                    dataType: 'jSon',
                                                    type: 'GET',
                                                    data: {
                                                        USERID: oStorage.get('USERID'),
                                                        Role: oStorage.get('ROLE'),
                                                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                    },
                                                    success: function (configresponse) {
                                                        var gstNoModel = new sap.ui.model.json.JSONModel(configresponse.collection);
                                                        var gstModel = new sap.ui.model.json.JSONModel(configresponse);
                                                        oStorage.put('SEARCHFIELD', configresponse.searchField)
                                                        oView.setModel(gstNoModel, 'gstNoModel');
                                                        oView.setModel(gstModel, 'gstModel');
                                                        sap.ui.getCore().setModel(gstModel, 'gstModel');
                                                        $.ajax({
                                                            url: baseUrl + 'userdefault_ws.php', //http://52.36.91.176/smartphonebiz/action/wbser/tile_ws.php?USERROLE=Employee&USERID=RoshniG
                                                            dataType: 'jSon',
                                                            type: 'GET',
                                                            data: {
                                                                switchcase: 'getapprole',
                                                                USERROLE: oStorage.get('ROLE'),
                                                                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                            },
                                                            success: function (response) {
                                                                var oModel1 = new sap.ui.model.json.JSONModel(response);
                                                                oModel1.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                                                                oView.setModel(oModel1, 'Apps');
                                                                setTimeout(function () {
                                                                    sap.ui.core.BusyIndicator.hide();
                                                                    oRouter.navTo(oStorage.get('EDASHBOARD'));
                                                                }, 3000);
                                                            }, error: function (configresponse) {
                                                                if (configresponse.session === "expired") {
                                                                    sap.m.MessageToast.show("There some problem,Please login again..");
                                                                    setTimeout(function () {
                                                                        location.assign(oStorage.get('GOBACK'));
                                                                    }, 3000);
                                                                }
                                                            }
                                                        });

                                                    }, error: function (configresponse) {
                                                        if (configresponse.session === "expired") {
                                                            sap.m.MessageToast.show("There some problem,Please login again..");
                                                            setTimeout(function () {
                                                                location.assign(oStorage.get('GOBACK'));
                                                            }, 3000);
                                                        }
                                                    }
                                                });

                                            }, error: function (configresponse) {
                                                if (configresponse.session === "expired") {
                                                    sap.m.MessageToast.show("There some problem,Please login again..");
                                                    setTimeout(function () {
                                                        location.assign(oStorage.get('GOBACK'));
                                                    }, 3000);
                                                }
                                            }
                                        });


                                    } else {
                                        setTimeout(function () {
                                            sap.ui.core.BusyIndicator.hide();
                                            oRouter.navTo("Role");
                                        }, 3000);
                                    }
                                }
                                , error: function (responce) {

                                }
                            });


                            if (configresponse.eChat == 'Yes') {
                                window.__lc = window.__lc || {};
                                window.__lc.license = 8823541;
//                                window.__lc.license = 8798521;
                                (function () {
                                    var lc = document.createElement('script');
                                    lc.type = 'text/javascript';
                                    lc.async = true;
                                    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
                                    var s = document.getElementsByTagName('script')[0];
                                    s.parentNode.insertBefore(lc, s);
                                })();

                            }

                        }, error: function (configresponse) {
                            if (configresponse.session === "expired") {
                                sap.m.MessageToast.show("There some problem,Please login again..");
                                setTimeout(function () {
                                    location.assign(oStorage.get('GOBACK'));
                                }, 3000);
                            }
                        }
                    });


                },
                error: function (configresponse) {

                    sap.ui.core.BusyIndicator.hide();
                    sap.m.MessageToast.show('Error occurred:' + configresponse.responseText);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        }
        // this model will get data from user manage table for the user who has logged in.  

    },
    onClear: function () {
        var oView = this.getView();
        oView.byId("username").setValue(null);
        oView.byId("inputPassword").setValue(null);
    },
    onForgot: function () {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("forgotPW");

    }


});