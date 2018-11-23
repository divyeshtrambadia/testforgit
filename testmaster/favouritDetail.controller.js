sap.ui.controller("testmaster.favouritDetail", {
    save: function () {

        var content = sap.ui.getCore().byId("formIdf").getContent();

        var flag = 1;

        var mapField = sap.ui.getCore().byId("app").getModel('Fieldsf').oData.collection;

        var oEntry = {};

        oEntry.Field = content[1].getSelectedKey();

        oEntry.Fav1 = content[3].getValue();
        oEntry.Fav2 = content[5].getValue();
        oEntry.Fav3 = content[7].getValue();

        oEntry.Protect = 'No';

        oEntry.AppID = oStorage.get('APPLICATION');
        oEntry.UserID = oStorage.get('USERID');
        if (mapField === null)
        {
            content[1].setValueState("Error");
            sap.m.MessageToast.show("Please Select Field");
        }
        else
        {
//            if (oEntry.Fav1 == "" || oEntry.Fav2 == "" || oEntry.Fav3 == "") {
//                flag = 0;
//                content[3].setValueState("Error");
//                content[5].setValueState("Error");
//                content[7].setValueState("Error");
//                sap.m.MessageToast.show("Please enter value in required field with *");
//            }
            if (flag) {

                $.ajax({
                    url: oStorage.get("BASEURL") + 'favourit_ws.php',
//              dataType: 'jSon',

                    type: 'GET',
                    data: {
                        switchcase: 'addfavourittvalue',
                        data: oEntry,
                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                    },
                    success: function (response) {

                        sap.ui.getCore().byId("app").getModel('favourit').oData.favourit.push(oEntry);

                        sap.ui.getCore().byId("app").getModel('favourit').refresh(true);

                        sap.ui.getCore().byId("addDialogf").close();



                        sap.m.MessageToast.show("Favourit added successfully", {duration: 2000});     // default is 3000

                        var oInput1 = sap.ui.getCore().byId("IPaf1");
                        oInput1.setValue("");
                        var oInput2 = sap.ui.getCore().byId("IPaf2");
                        oInput2.setValue("");
                        var oInput3 = sap.ui.getCore().byId("IPaf3");
                        oInput3.setValue("");
                        var oInput4 = sap.ui.getCore().byId("IPaf4");
                        oInput4.setValue("");

                    },
                    error: function (configresponse) {
                        if (configresponse.session === "expired") {
                            sap.m.MessageToast.show("There some problem,Please login again..");
                            setTimeout(function () {
                                location.assign(oStorage.get('GOBACK'));
                            }, 3000);
                        } else {
                            sap.m.MessageToast.show("Favourit for this field already exist", {duration: 3000});     // default is 3000
                        }
                    }

                })

            }

            ;

        }

    },
    cancel: function () {

        sap.ui.getCore().byId("addDialogf").close();
        var oInput1 = sap.ui.getCore().byId("IPaf1");
        oInput1.setValue("");
        var oInput2 = sap.ui.getCore().byId("IPaf2");
        oInput2.setValue("");
        var oInput3 = sap.ui.getCore().byId("IPaf3");
        oInput3.setValue("");
        var oInput4 = sap.ui.getCore().byId("IPaf4");
        oInput4.setValue("");

    },
    // edit press event

    editPress: function (oEvent) {

        var sPath = oEvent.getSource().getParent().getBindingContext("favourit").getPath();

        var start = sPath.lastIndexOf("/") + 1;

        var index = sPath.substring(start, sPath.length);

        this.selectedIndex = sPath.substring(start, sPath.length);

        var context = sap.ui.getCore().byId("app").getModel("favourit").getContext("/favourit/" + index);

        this.oldValue = sap.ui.getCore().byId("app").getModel("favourit").oData.favourit[index].Field;

        //     this.UserID = sap.ui.getCore().byId("app").getModel("data").oData.UserID;

        sap.ui.getCore().byId("editformf").setBindingContext(context, "favourit");

        var oeditDialog = sap.ui.getCore().byId("editDialogf");

        oeditDialog.setVisible(true);

        sap.ui.getCore().byId("editDialogf").open();

    },
    // edit dialog update

    Update: function () {

        var content = sap.ui.getCore().byId("editformf").getContent();

        var flag = 1;

        var oEntry = {};

        oEntry.oldField = this.oldValue;

        //   oEntry.UserID = this.UserID;

        oEntry.Field = content[1].getSelectedKey();

        oEntry.Fav1 = content[3].getValue();
        oEntry.Fav2 = content[5].getValue();
        oEntry.Fav3 = content[7].getValue();

        oEntry.AppID = oStorage.get('APPLICATION');

        oEntry.UserID = oStorage.get('USERID');



        var selectedIndex = this.selectedIndex;

        if (oEntry.Field == "") {
            flag = 0;
            content[1].setValueState("Error");
            sap.m.MessageToast.show("Please Select field with *");

        }
//        if (oEntry.Fav1 == "" || oEntry.Fav2 == "" || oEntry.Fav3 == "") {
//
//            flag = 0;
//
//            content[3].setValueState("Error");
//            content[5].setValueState("Error");
//            content[7].setValueState("Error");
//
//            sap.m.MessageToast.show("Please enter value in required field with *");
//
//        }

        if (flag) {

            $.ajax({
                url: oStorage.get("BASEURL") + 'favourit_ws.php',
                type: 'GET',
                data: {
                    switchcase: 'updatefavouritvalue', // need to define this case in php
                    data: oEntry,
                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                },
                success: function (response) {

                    sap.ui.getCore().byId("app").getModel("favourit").oData.favourit[selectedIndex] = oEntry;

                    sap.ui.getCore().byId("app").getModel('favourit').refresh(true);

                    sap.ui.getCore().byId("editDialogf").close();

                    sap.m.MessageToast.show("Favourit edited successfully", {duration: 2000});

                },
                error: function (configresponse) {
                    if (configresponse.session === "expired") {
                        sap.m.MessageToast.show("There some problem,Please login again..");
                        setTimeout(function () {
                            location.assign(oStorage.get('GOBACK'));
                        }, 3000);
                    } else {
                        sap.m.MessageToast.show("Favourit for field already exist", {duration: 3000});     // default is 3000
                    }
                }

            });

        }

    },
    //edit dialog close

    Close: function () {

        sap.ui.getCore().byId("editDialogf").close();

    },
    // delete press event

    deletePress: function (oEvent) {

        var sPath = oEvent.getSource().getParent().getBindingContext("favourit").getPath();

        var start = sPath.lastIndexOf("/") + 1;

        var index = sPath.substring(start, sPath.length);

        var Field = sap.ui.getCore().byId("app").getModel("favourit").oData.favourit[index].Field;

        //    var UserID = sap.ui.getCore().byId("app").getModel("data").oData.UserID;

        var oEntry = {};

        oEntry.Field = Field;

        oEntry.AppID = oStorage.get('APPLICATION');
        oEntry.UserID = oStorage.get('USERID');
        var path = oEvent.getSource().getParent().getBindingContext("favourit").getPath();
        var item = sap.ui.getCore().byId("app").getModel('favourit').getProperty(path);
        $.ajax({
            url: oStorage.get("BASEURL") + 'favourit_ws.php',
            type: 'GET',
            data: {
                switchcase: 'deletefavouritvalue', //need to create this case in php
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                data: oEntry

            },
            success: function (configresponse) {

                var oTable = sap.ui.getCore().byId("tablef");

                var array = oTable.getModel("favourit").getData().favourit;

                array.splice(array.indexOf(item), 1);



                oTable.getModel("favourit").refresh();

                sap.m.MessageToast.show("User default deleted successfully...", {duration: 2000});

            },
            error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        location.assign(oStorage.get('GOBACK'));
                    }, 3000);
                } else {
                    sap.m.MessageToast.show("Error", {duration: 1000});
                }
            }

        });

    },
});