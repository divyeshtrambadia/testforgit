sap.ui.controller("testmaster.userdefaultMaster", {
    PR_Search: function (oEvent) {

        var tpmla = oEvent.getParameter("newValue");
        var filters = new Array();
        var oFilter = new sap.ui.model.Filter("ApplicationID", sap.ui.model.FilterOperator.Contains, tpmla);
        filters.push(oFilter);
        //get list created in view
        this.oList = sap.ui.getCore().byId("listId1");
        this.oList.getBinding("items").filter(filters);

    },
// list item select method
    itemSelected: function () {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        var list = sap.ui.getCore().byId('listId1');
        var sItem = list.getSelectedItem();
        var oBindingContext = sItem.getBindingContext('Apps');
        var sPath = oBindingContext.sPath;
        var start = sPath.lastIndexOf("/") + 1;
        var appIndex = sPath.substring(start, sPath.length);
        var context = sap.ui.getCore().byId("listId1").getModel('Apps');
        var appID = context.oData.collection[appIndex].ApplicationID;

        oStorage.put('APPLICATION', appID);

        $.ajax({
            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
            dataType: 'jSon',
            type: 'GET',
            data: {
                switchcase: 'getuserdefaultvalue',
                APPLICATION: appID,
                USERID: oStorage.get('USERID'),
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (response) {
                var detailView = sap.ui.getCore().byId("app");
                var oModel2 = new sap.ui.model.json.JSONModel(response);
                oModel2.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                detailView.setModel(oModel2, 'data');
            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        location.assign(oStorage.get('GOBACK'));
                    }, 3000);
                }
            }

        });

        $.ajax({
            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
            dataType: 'jSon',
            type: 'GET',
            data: {
                switchcase: 'getmapfield',
                APPLICATION: appID,
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                USERID: oStorage.get('USERID')
            },
            success: function (response) {
                var detailView = sap.ui.getCore().byId("app");
                var oModel3 = new sap.ui.model.json.JSONModel(response);
                oModel3.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                detailView.setModel(oModel3, 'Fields');
//                router.navTo("detail", {appIndex: appIndex});
            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        location.assign(oStorage.get('GOBACK'));
                    }, 3000);
                }
            }

        });
        router.navTo("userdefaultdetail", {appIndex: appIndex});
    },
    goBack: function () {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo(oStorage.get('EDASHBOARD'));
    }
});