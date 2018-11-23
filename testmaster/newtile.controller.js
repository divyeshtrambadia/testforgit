sap.ui.controller("testmaster.newtile", {
    onInit: function () {

    },
    onBeforeRendering: function () {

    },
    onAfterRendering: function () {

    },
    roledialog: function () {
        var oRoleModel = sap.ui.getCore().byId('app').getModel("RolesModel").oData;
        if (oRoleModel.collection !== "") {
            sap.ui.getCore().byId("roleDialog").open();
//        var router = sap.ui.core.UIComponent.getRouterFor(this);
//        router.navTo("Role");    //, {adminIndex: adminIndex}
        } else {
            sap.m.MessageToast.show("Role Not Available..");
        }
    },
    Role: function () {
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
                                        var oTileModel = sap.ui.getCore().getModel("oModel1").oData;

                                        var tileArray = [];
                                        var cnt = 0;
                                        $.each(oTileModel, function (index, value) {

                                            tileArray[cnt++] = new sap.m.Panel({
                                                expandable: false,
                                                content: [new sap.m.Label({text: index})]
                                            }).addStyleClass("headerLabel");

                                            $.each(value, function (i, v) {
                                                tileArray[cnt++] = new sap.m.SlideTile({
                                                    displayTime: 5000,
                                                    transitionTime: 500,
                                                    //     StyleClass: "sapUiTinyMarginTop",
                                                    tiles: [
                                                        new sap.m.GenericTile({
                                                            backgroundImage: oStorage.get('SITEURL') + 'assets/images/tile/' + v['vImage'],
                                                            frameType: "TwoByOne",
                                                            //       state: "Failed",  // Loaded, Loading
                                                            press: function (evt) {

                                                                var customDataList = evt.getSource().getCustomData();
                                                                var url = customDataList[0].getValue("url");

                                                                var sessionPara = url.split('&');
                                                                var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
                                                                var errorMessage = sessionPara[4];
                                                                if (oGstNoModel.collection != '') {
                                                                    if (oStorage.get('COMPANY') == "") {
                                                                        sap.m.MessageToast.show(errorMessage);
                                                                    } else {
                                                                        //  var jsonData = { "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "searchField": oStorage.get('SEARCHFIELD'), "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                                                        var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "searchField": oStorage.get('SEARCHFIELD'), "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                                                        $.ajax({
                                                                            url: oStorage.get('BASEURL') + 'security_ws.php', //'vCity': 'Slough',
                                                                            dataType: 'jSon',
                                                                            type: 'GET',
                                                                            data: {
                                                                                case: 'setsession',
                                                                                data: jsonData,
                                                                                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                                            },
                                                                            success: function (response) {
                                                                                localStorage.setItem('sk', response.sk);

                                                                                var url = oStorage.get('FIORIURL') + response.sk
                                                                                if (oStorage.get('EPOPWINDOW') == 'On') {
                                                                                    window.open(url);
                                                                                } else {
                                                                                    location.href = url;
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
                                                                    }
                                                                } else {
                                                                    var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                                                    $.ajax({
                                                                        url: oStorage.get('BASEURL') + 'security_ws.php',
                                                                        dataType: 'jSon',
                                                                        type: 'GET',
                                                                        data: {
                                                                            case: 'setsession',
                                                                            data: jsonData,
                                                                            sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                                        },
                                                                        success: function (response) {
                                                                            localStorage.setItem('sk', response.sk);
                                                                            var url = oStorage.get('FIORIURL') + response.sk
                                                                            if (oStorage.get('EPOPWINDOW') == 'On') {
                                                                                window.open(url);
                                                                            } else {
                                                                                location.href = url;
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
                                                                }

                                                            },
                                                            tileContent: [
                                                                new sap.m.TileContent({
                                                                    footer: v['number'],
                                                                    content: [
                                                                        new sap.m.NewsContent({
                                                                            contentText: v['vDescription'],
                                                                            subheader: v['vHelp']
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }).addCustomData(new sap.ui.core.CustomData({
                                                            key: "url",
                                                            value: v['url'],
                                                            writeToDom: true}))
//                                    writeToDom: true})).attachPress(this.test1)
                                                    ]
                                                }).addStyleClass("sapUiTinyMargin"); //.addClass("sapUiTinyMarginTop");
                                            });
                                        });

                                        var tileArray1 = new sap.m.Panel('test1', {
                                            expandable: false,
                                            content: [tileArray]
                                        });
//                sap.ui.getCore().byId("test").destroyContent();
//                sap.ui.getCore().byId('test').addContent(tileArray1);
                                        sap.ui.getCore().byId("scrollID").destroyContent();//
                                        sap.ui.getCore().byId("scrollID").addContent(tileArray1);
                                        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;

                                        if (oGstNoModel.collection == '') {
                                            sap.ui.getCore().byId("titlebar").destroyContentRight();//

                                        } else {
                                            sap.ui.getCore().byId("titlebar").destroyContentRight();//
                                            var GSTNO = new sap.m.Select({
                                                id: "GSTNO",
                                                change: function (oControlEvent) {
                                                    oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                                                    oStorage.put('COMPANY', oControlEvent.getSource().getSelectedKey());
                                                    sap.ui.controller("testmaster.newtile").tileGeneration(oControlEvent);

//                                                    oController.tileGeneration(oControlEvent);
                                                },
                                            }).bindAggregation("items", "gstModel>/collection", new sap.ui.core.ListItem({
                                                text: "{gstModel>vCompanyName}", key: "{gstModel>gstn}"}
                                            ));
                                            sap.ui.getCore().byId("titlebar").addContentRight(GSTNO);

                                        }
                                        
                                        sap.ui.getCore().byId("roleDialog").close();
                                        sap.ui.core.BusyIndicator.hide();


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
    ChatbotPress: function (oEvent) {
        var oView = sap.ui.getCore().byId('app');
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        var SocialMediaType = "skype";
//        alert(oStorage.get('SOCIALMEDIATYPE'));
        if (oStorage.get('SOCIALMEDIATYPE') !== null && oStorage.get('SOCIALMEDIATYPE') !== "") {
            SocialMediaType = oStorage.get('SOCIALMEDIATYPE');
        }
        $.ajax({
            url: oStorage.get("BASEURL") + "getchatbotuserdata_ws.php",
            dataType: 'json',
            type: 'Get',
            data: {
                Role: oStorage.get('ROLE'),
                UserID: oStorage.get('USERID'),
                SocialMediaType: SocialMediaType,
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (response) {
                var ChatbotModel = new sap.ui.model.json.JSONModel(response);
                oView.setModel(ChatbotModel, 'ChatbotModel');
                router.navTo("Chatbot");    //, {adminIndex: adminIndex}

            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        if (oStorage.get('LoginType') === "SocialMedia" || oStorage.get("LoginType") === "UserLogin") {
                            location.assign(oStorage.get('FRONTAPPURL1'));

                        } else {
                            location.assign(oStorage.get('FRONTAPPURL'));
                        }
                    }, 3000);
                }
            }
        });
    },
    edit: function () {

    },
    FavouritPress: function (oEvent) {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("favouritmaster");    //, {adminIndex: adminIndex}
    },
    changePWPress: function (oEvent) {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("changePW");    //, {adminIndex: adminIndex}
    },
    tileGeneration: function (oControlEvent) {
        sap.ui.core.BusyIndicator.show(0);
        $.ajax({
            url: oStorage.get('BASEURL') + 'tilerefresh_ws.php',
            dataType: 'jSon',
            type: 'GET',
            data: {
                USERROLE: oStorage.get('ROLE'),
                USERID: oStorage.get('USERID'),
                searchValue: oStorage.get('COMPANY'),
                searchField: oStorage.get('SEARCHFIELD'),
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (tileresponse) {
                var oModel1 = new sap.ui.model.json.JSONModel(tileresponse);
                sap.ui.getCore().setModel(oModel1, 'oModel1');
                sap.ui.getCore().setModel(tileresponse, 'oModel');


                var oTileModel = sap.ui.getCore().getModel("oModel1").oData;

                var tileArray = [];
                var cnt = 0;
                $.each(oTileModel, function (index, value) {

                    tileArray[cnt++] = new sap.m.Panel({
                        expandable: false,
                        content: [new sap.m.Label({text: index})]
                    }).addStyleClass("headerLabel");

                    $.each(value, function (i, v) {
                        tileArray[cnt++] = new sap.m.SlideTile({
                            displayTime: 5000,
                            transitionTime: 500,
                            //     StyleClass: "sapUiTinyMarginTop",
                            tiles: [
                                new sap.m.GenericTile({
                                    backgroundImage: oStorage.get('SITEURL') + 'assets/images/tile/' + v['vImage'],
                                    frameType: "TwoByOne",
                                    //       state: "Failed",  // Loaded, Loading
                                    press: function (evt) {

                                        var customDataList = evt.getSource().getCustomData();
                                        var url = customDataList[0].getValue("url");

                                        var sessionPara = url.split('&');
                                        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
                                        var errorMessage = sessionPara[4];
                                        if (oGstNoModel.collection != '') {
                                            if (oStorage.get('COMPANY') == "") {
                                                sap.m.MessageToast.show(errorMessage);
                                            } else {
                                                //  var jsonData = { "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "searchField": oStorage.get('SEARCHFIELD'), "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                                var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "searchField": oStorage.get('SEARCHFIELD'), "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                                $.ajax({
                                                    url: oStorage.get('BASEURL') + 'security_ws.php', //'vCity': 'Slough',
                                                    dataType: 'jSon',
                                                    type: 'GET',
                                                    data: {
                                                        case: 'setsession',
                                                        data: jsonData,
                                                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                    },
                                                    success: function (response) {
                                                        localStorage.setItem('sk', response.sk);

                                                        var url = oStorage.get('FIORIURL') + response.sk
                                                        if (oStorage.get('EPOPWINDOW') == 'On') {
                                                            window.open(url);
                                                        } else {
                                                            location.href = url;
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
                                            }
                                        } else {
                                            var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                                            $.ajax({
                                                url: oStorage.get('BASEURL') + 'security_ws.php',
                                                dataType: 'jSon',
                                                type: 'GET',
                                                data: {
                                                    case: 'setsession',
                                                    data: jsonData,
                                                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                                },
                                                success: function (response) {
                                                    localStorage.setItem('sk', response.sk);
                                                    var url = oStorage.get('FIORIURL') + response.sk
                                                    if (oStorage.get('EPOPWINDOW') == 'On') {
                                                        window.open(url);
                                                    } else {
                                                        location.href = url;
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
                                        }

                                    },
                                    tileContent: [
                                        new sap.m.TileContent({
                                            footer: v['number'],
                                            content: [
                                                new sap.m.NewsContent({
                                                    contentText: v['vDescription'],
                                                    subheader: v['vHelp']
                                                })
                                            ]
                                        })
                                    ]
                                }).addCustomData(new sap.ui.core.CustomData({
                                    key: "url",
                                    value: v['url'],
                                    writeToDom: true}))
//                                    writeToDom: true})).attachPress(this.test1)
                            ]
                        }).addStyleClass("sapUiTinyMargin"); //.addClass("sapUiTinyMarginTop");
                    });
                });

                var tileArray1 = new sap.m.Panel('test1', {
                    expandable: false,
                    content: [tileArray]
                });
//                sap.ui.getCore().byId("test").destroyContent();
//                sap.ui.getCore().byId('test').addContent(tileArray1);
                sap.ui.getCore().byId("scrollID").destroyContent();//
                sap.ui.getCore().byId("scrollID").addContent(tileArray1);

                sap.ui.core.BusyIndicator.hide();
            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        location.assign(oStorage.get('GOBACK'));
                    }, 3000);
                }
            }
        });
        // return tileArray;

    },
    test1: function () {

    },
    handlePress: function (evt) {

        var customDataList = evt.getSource().getCustomData();
        var url = customDataList[0].getValue("url");
        var sessionPara = url.split('&');

        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
        var errorMessage = sessionPara[4];

        if (sessionPara[5] == "No") {
            oStorage.put('COMPANY', "1");
        }
        if (oGstNoModel.collection != '') {
            if (oStorage.get('COMPANY') == "" || sessionPara[5] == "Yes") {

                sap.m.MessageToast.show(errorMessage);
            } else {
                if (sessionPara[5] == "No") {
                    oStorage.put('COMPANY', "");
                }
                var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
                $.ajax({
                    url: oStorage.get('BASEURL') + 'security_ws.php',
                    dataType: 'jSon',
                    type: 'GET',
                    data: {
                        case: 'setsession',
                        data: jsonData,
                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                    },
                    success: function (response) {
                        localStorage.setItem('sk', response.sk);



                        if (sessionPara[7] == 'GroupCal') {
                            var url = oStorage.get('GROUPCALURL') + response.sk

                        } else if (sessionPara[7] == 'MyCal') {
                            var url = oStorage.get('GROUPCALURL') + response.sk
                        } else {
                            var url = oStorage.get('FIORIURL') + response.sk
                        }

                        if (oStorage.get('EPOPWINDOW') == 'On') {
                            window.open(url);
                        } else {
                            location.href = url;
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
            }
        } else {
            var jsonData = {'vCity': oStorage.get('VCITYT'), "appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "eDataFilter": sessionPara[5], "appDescription": sessionPara[6], "AppType": sessionPara[7]};
            $.ajax({
                url: oStorage.get('BASEURL') + 'security_ws.php',
                dataType: 'jSon',
                type: 'GET',
                data: {
                    case: 'setsession',
                    data: jsonData,
                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                },
                success: function (response) {

                    localStorage.setItem('sk', response.sk);

                    if (sessionPara[7] == 'GroupCal') {
                        var url = oStorage.get('GROUPCALURL') + response.sk
                    } else if (sessionPara[7] == 'MyCal') {
                        var url = oStorage.get('GROUPCALURL') + response.sk
                    } else {
                        var url = oStorage.get('FIORIURL') + response.sk
                    }


                    if (oStorage.get('EPOPWINDOW') == 'On') {
                        window.open(url);
                    } else {
                        location.href = url;
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
        }

    },
    onExit: function () {

    },
    userDefaultPress: function (oEvent) {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("userdefaultmaster");    //, {adminIndex: adminIndex}
    },
    ListItemPress: function (evt) {
        var oBindingContext = evt.getSource().getBindingContext('TableD');
        var sPath = oBindingContext.sPath;

        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        var start = sPath.lastIndexOf("/") + 1;
        var adminIndex = sPath.substring(start, sPath.length);
        this.router.navTo("appmaster", {adminIndex: adminIndex});


    },
    goBack: function () {
        window.location.href = oStorage.get('GOBACK');
    },
    ProfilePress: function (oEvent) {
//    	 $.ajax({
//             url: oStorage.get("BASEURL") + 'getUser_ws.php', // no ws is available as of now
//             dataType: 'jSon',
//             type: 'GET',
//             success: function (response) {
//                 var oModel = new sap.ui.model.json.JSONModel(response);
//                // var oModel = new sap.ui.model.json.JSONModel('./model/UserManage.json');
//                 oView.setModel(oModel, 'Users');
//             }
//         });

        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("profile");    //, {adminIndex: adminIndex}
    },
});

