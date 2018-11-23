sap.ui.controller("testmaster.Admin", {
    onInit: function () {
    },

    onBeforeRendering: function () {
    },

    onAfterRendering: function () {
    },

    edit: function () {
    },
    handlePress: function (evt) {
        var customDataList = evt.getSource().getCustomData();
        var url = customDataList[0].getValue("url");
        var sessionPara = url.split('&');
        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;

        if (oGstNoModel.collection != '') {
            if (oStorage.get('COMPANY') == "") {
                sap.m.MessageToast.show("Please select company name ...");
            } else {
                var jsonData = {"appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3], "company": oStorage.get('COMPANY'), "searchField": oStorage.get('SEARCHFIELD')};
                $.ajax({
                    url: oStorage.get('BASEURL') + 'security_ws.php',
                    dataType: 'jSon',
                    type: 'GET',
                    data: {
                        case: 'setsession',
                        data: jsonData,
                    },
                    success: function (response) {
                        localStorage.setItem('sk', response.sk);
                        var url = oStorage.get('FIORIURL') + response.sk
                        if (oStorage.get('EPOPWINDOW') == 'On') {
                            window.open(url);
                        } else {
                            location.href = url;
                        }
                    }
                });
            }
        } else {
            var jsonData = {"appName": sessionPara[0], "userID": sessionPara[1], "userSpecific": sessionPara[2], "userRole": sessionPara[3]};
            $.ajax({
                url: oStorage.get('BASEURL') + 'security_ws.php',
                dataType: 'jSon',
                type: 'GET',
                data: {
                    case: 'setsession',
                    data: jsonData,
                },
                success: function (response) {
                    localStorage.setItem('sk', response.sk);
                    var url = oStorage.get('FIORIURL') + response.sk
                    if (oStorage.get('EPOPWINDOW') == 'On') {
                        window.open(url);
                    } else {
                        location.href = url;
                    }
                }
            });
        }
    },

    onExit: function () {

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
      changePWPress: function (oEvent) {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("changePW");    //, {adminIndex: adminIndex}
    },
     userDefaultPress: function (oEvent) {
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.navTo("userdefaultmaster");    //, {adminIndex: adminIndex}
    },

});

