sap.ui.controller("testmaster.Role", {
    onInit: function () {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
    },
    tileGeneration: function (evt) {
        var oView = sap.ui.getCore().byId('app');
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        sap.ui.core.BusyIndicator.show(0);

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
                    url: oStorage.get("BASEURL") + 'tile_ws.php',
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
                            url: oStorage.get("BASEURL") + 'getgstnno_ws.php',
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
                                    url: oStorage.get("BASEURL") + 'userdefault_ws.php', //http://52.36.91.176/smartphonebiz/action/wbser/tile_ws.php?USERROLE=Employee&USERID=RoshniG
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
                                            sap.ui.core.BusyIndicator.hide();

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
    onBeforeRendering: function () {


    },
    onAfterRendering: function () {


    },
    onExit: function () {

    }



});