sap.ui.controller("testmaster.userdefaultDetail", {
    save: function () {

        var content = sap.ui.getCore().byId("formId").getContent();

        var flag = 1;

        var mapField = sap.ui.getCore().byId("app").getModel('Fields').oData.collection;

        var oEntry = {};
        oEntry.Field = content[1].getSelectedKey();
        oEntry.DefaultValue = content[3].getValue();
        oEntry.Protect = 'No';
        oEntry.Application = oStorage.get('APPLICATION');
        oEntry.UserID = oStorage.get('USERID');
        if (mapField === null)
        {
            content[1].setValueState("Error");
            sap.m.MessageToast.show("Please Select Field");
        }
        else
        {

            if (oEntry.DefaultValue == "") {

                flag = 0;

                content[3].setValueState("Error");

                sap.m.MessageToast.show("Please enter value in required field with *");

            }

            if (flag) {

                $.ajax({
                    url: oStorage.get("BASEURL") + 'userdefault_ws.php',
//              dataType: 'jSon',

                    type: 'GET',
                    data: {
                        switchcase: 'adduserdefaultvalue',
                        data: oEntry,
                        sessionvalue: localStorage.getItem('SESSIONVALUE')
                    },
                    success: function (response) {

                        $.ajax({
                            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                            dataType: 'jSon',
                            type: 'GET',
                            data: {
                                switchcase: 'getuserdefaultvalue',
                                APPLICATION: oStorage.get('APPLICATION'),
                                USERID: oStorage.get('USERID'),
                                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                            },
                            success: function (response) {
                                sap.ui.getCore().byId("addDialog").close();
                                sap.m.MessageToast.show("User default added successfully", {duration: 2000});     // default is 3000
                                var oInput1 = sap.ui.getCore().byId("IPa1");
                                oInput1.setValue("");
                                var oInput2 = sap.ui.getCore().byId("IPa2");
                                oInput2.setValue("");
                                sap.ui.getCore().byId("app").getModel('data').oData = response;
                                sap.ui.getCore().byId("app").getModel('data').refresh(true);

                            }

                        });

                        $.ajax({
                            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                            dataType: 'jSon',
                            type: 'GET',
                            data: {
                                switchcase: 'getmapfield',
                                APPLICATION: oStorage.get('APPLICATION'),
                                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                                USERID: oStorage.get('USERID')

                            },
                            success: function (response) {
                                sap.ui.getCore().byId("app").getModel('Fields').oData = response;
                                sap.ui.getCore().byId("app").getModel('Fields').refresh(true);
                            }

                        });
                    },
                    error: function (response) {

                        sap.m.MessageToast.show("user default for this field already exist", {duration: 3000});     // default is 3000

                    }

                })

            }

            ;

        }

    },
    cancel: function () {

        sap.ui.getCore().byId("addDialog").close();

    },
    // edit press event

    editPress: function (oEvent) {

        var sPath = oEvent.getSource().getParent().getBindingContext("data").getPath();

        var start = sPath.lastIndexOf("/") + 1;

        var index = sPath.substring(start, sPath.length);

        this.selectedIndex = sPath.substring(start, sPath.length);

        var context = sap.ui.getCore().byId("app").getModel("data").getContext("/userdefaults/" + index);

        this.oldValue = sap.ui.getCore().byId("app").getModel("data").oData.userdefaults[index].Field;

        //     this.UserID = sap.ui.getCore().byId("app").getModel("data").oData.UserID;

        sap.ui.getCore().byId("editform").setBindingContext(context, "data");

        var oeditDialog = sap.ui.getCore().byId("editDialog");

        oeditDialog.setVisible(true);

        sap.ui.getCore().byId("editDialog").open();

    },
    // edit dialog update

    Update: function () {

        var content = sap.ui.getCore().byId("editform").getContent();

        var flag = 1;

        var oEntry = {};

        oEntry.oldField = this.oldValue;

        //   oEntry.UserID = this.UserID;

        oEntry.Field = content[1].getSelectedKey();

        oEntry.DefaultValue = content[3].getValue();

        oEntry.Application = oStorage.get('APPLICATION');

        oEntry.UserID = oStorage.get('USERID');



        var selectedIndex = this.selectedIndex;

        if (oEntry.Field == "") {

            flag = 0;

            content[1].setValueState("Error");

            sap.m.MessageToast.show("Please Select field with *");

        }

        if (oEntry.DefaultValue == "") {

            flag = 0;

            content[3].setValueState("Error");

            sap.m.MessageToast.show("Please enter value in required field with *");

        }

        if (flag) {

            $.ajax({
                url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                type: 'GET',
                data: {
                    switchcase: 'updateuserdefaultvalue', // need to define this case in php
                    sessionvalue: localStorage.getItem('SESSIONVALUE'),
                    data: oEntry,
                },
                success: function (response) {

                    sap.ui.getCore().byId("app").getModel("data").oData.userdefaults[selectedIndex] = oEntry;

                    sap.ui.getCore().byId("app").getModel('data').refresh(true);

                    $.ajax({
                        url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            switchcase: 'getuserdefaultvalue',
                            APPLICATION: oStorage.get('APPLICATION'),
                            USERID: oStorage.get('USERID'),
                            sessionvalue: localStorage.getItem('SESSIONVALUE'),
                        },
                        success: function (response) {
                            sap.ui.getCore().byId("editDialog").close();
                            sap.m.MessageToast.show("User default edited successfully", {duration: 2000});
                            sap.ui.getCore().byId("app").getModel('data').oData = response;
                            sap.ui.getCore().byId("app").getModel('data').refresh(true);

                        }

                    });
                    $.ajax({
                        url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                        dataType: 'jSon',
                        type: 'GET',
                        data: {
                            switchcase: 'getmapfield',
                            APPLICATION: oStorage.get('APPLICATION'),
                            sessionvalue: localStorage.getItem('SESSIONVALUE'),
                            USERID: oStorage.get('USERID')

                        },
                        success: function (response) {
                            sap.ui.getCore().byId("app").getModel('Fields').oData = response;
                            sap.ui.getCore().byId("app").getModel('Fields').refresh(true);
                        }

                    });

                },
                error: function (response) {

                    sap.m.MessageToast.show("User default for field already exist", {duration: 3000});     // default is 3000

                }

            });

        }

    },
    //edit dialog close

    Close: function () {

        sap.ui.getCore().byId("editDialog").close();

    },
    // delete press event

    deletePress: function (oEvent) {

        var sPath = oEvent.getSource().getParent().getBindingContext("data").getPath();

        var start = sPath.lastIndexOf("/") + 1;

        var index = sPath.substring(start, sPath.length);

        var Field = sap.ui.getCore().byId("app").getModel("data").oData.userdefaults[index].Field;

        //    var UserID = sap.ui.getCore().byId("app").getModel("data").oData.UserID;

        var oEntry = {};

        oEntry.Field = Field;

        oEntry.Application = oStorage.get('APPLICATION');
        oEntry.UserID = oStorage.get('USERID');
        var path = oEvent.getSource().getParent().getBindingContext("data").getPath();
        var item = sap.ui.getCore().byId("app").getModel('data').getProperty(path);
        $.ajax({
            url: oStorage.get("BASEURL") + 'userdefault_ws.php',
            type: 'GET',
            data: {
                switchcase: 'deleteuserdefaultvalue', //need to create this case in php
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
                data: oEntry

            },
            success: function (configresponse) {
                $.ajax({
                    url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                    dataType: 'jSon',
                    type: 'GET',
                    data: {
                        switchcase: 'getuserdefaultvalue',
                        APPLICATION: oStorage.get('APPLICATION'),
                        USERID: oStorage.get('USERID'),
                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                    },
                    success: function (response) {
                        sap.m.MessageToast.show("User default deleted successfully...", {duration: 2000});
                        sap.ui.getCore().byId("app").getModel('data').oData = response;
                        sap.ui.getCore().byId("app").getModel('data').refresh(true);

                    }

                });

                $.ajax({
                    url: oStorage.get("BASEURL") + 'userdefault_ws.php',
                    dataType: 'jSon',
                    type: 'GET',
                    data: {
                        switchcase: 'getmapfield',
                        APPLICATION: oStorage.get('APPLICATION'),
                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                        USERID: oStorage.get('USERID')

                    },
                    success: function (response) {
                        sap.ui.getCore().byId("app").getModel('Fields').oData = response;
                        sap.ui.getCore().byId("app").getModel('Fields').refresh(true);
                    }

                });


            },
            error: function () {

                sap.m.MessageToast.show("Error", {duration: 1000});

            }

        });

    },
});