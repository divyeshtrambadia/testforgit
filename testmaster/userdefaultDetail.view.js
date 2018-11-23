sap.ui.jsview("testmaster.userdefaultDetail", {

    getControllerName: function () {
        return "testmaster.userdefaultDetail";
    },
    createContent: function (oController) {
        var oTable = new sap.m.Table({
            id: "table",
            width: "auto",
            headerToolbar: [
                new sap.m.Toolbar({
                    content: [
                        new sap.m.Title({text: "User Defaults"}),
                        new sap.m.ToolbarSpacer(),
                        new sap.m.Button({
                            icon: "sap-icon://add",
                            press: function () {
                                sap.ui.getCore().byId("addDialog").setVisible(true);
                                sap.ui.getCore().byId("addDialog").open();
                            }
                        }),
                    ]
                })
            ],
            columns: [
                new sap.m.Column({
                    header: new sap.m.Label({text: "Field"}),
                    width: "100px",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({text: "DefaultValue"}),
                    width: "100px",
                }),

                new sap.m.Column({
                    header: new sap.m.Label({text: "Edit"}),
                    width: "50px",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({text: "Delete"}),
                    width: "50px",
                })
            ]
        });
        var oTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({text: "{data>Field}"}),
                new sap.m.Text({text: "{data>DefaultValue}"}),
                new sap.m.Button({
                    icon: "sap-icon://edit",
                    press: function (oEvent) {
                        oController.editPress(oEvent);
                    },
                }),
                new sap.m.Button("del2", {
                    icon: "sap-icon://delete",
                    press: function (oEvent) {
                        oController.deletePress(oEvent);
                    },
                })
            ]
        });

        oTable.bindAggregation("items", "data>/userdefaults/", oTemplate);

        var oPanel = new sap.m.Panel({
            width: "900px",
            content: [oTable]
        })//.addStyleClass('sapUiResponsiveMargin');

        var addForm = new sap.ui.layout.form.SimpleForm(
                'formId', {
                    maxContainerCols: 2,
                    editable: true,
                    content: [
                        new sap.m.Label({
                            text: "Field",
                            required: true
                        }),
                        new sap.m.Select({
                            id: "IPa1",
                        }).bindAggregation("items", "Fields>/collection",
                                new sap.ui.core.Item({text: "{Fields>XmlField}", key: "{Fields>XmlField}"
                                })),

                        new sap.m.Label({
                            text: "DefaultValue",
                            required: true
                        }),
                        new sap.m.Input("IPa2", {
                            value: "",
                            placeholder: "please enter default value"
                        }),
                    ]

                });

        var oButton2 = new sap.m.Button("Save", {
            text: "Save",
            tap: [oController.save, oController]
        });

        var oButton3 = new sap.m.Button("Cancel", {
            text: "Cancel",
            tap: [oController.cancel, oController]

        });

        var addDialog = new sap.m.Dialog("addDialog", {
            title: "Add User default",
            modal: true,
            visible: false,
            contentWidth: "1em",
            buttons: [oButton2, oButton3],
            content: [addForm]
        });

        //edit form starts here    
        var editForm = new sap.ui.layout.form.SimpleForm(
                'editform', {
                    maxContainerCols: 2,
                    editable: true,
                    content: [
                        new sap.m.Label({text: "Field"}),
                        new sap.m.Select({
                            id: "IP1",
                            selectedKey: "{data>Field}"
                        }).bindAggregation("items", "Fields>/collection",
                                new sap.ui.core.Item({text: "{Fields>XmlField}", key: "{Fields>XmlField}"
                                })),
                        new sap.m.Label({
                            text: "DefaultValue",
                            required: true
                        }),
                        new sap.m.Input("IP2", {
                            value: "{data>DefaultValue}",
                            placeholder: "please enter default value"
                        }),
                    ]
                });

        var oeditbtn = new sap.m.Button("update", {
            text: "Update",
            tap: [oController.Update, oController]
        });

        var oclosebtn = new sap.m.Button("Close", {
            text: "Close",
            tap: [oController.Close, oController],
        });

        var editD = new sap.m.Dialog("editDialog", {
            title: "Edit user defaults",
            modal: true,
            contentWidth: "1em",
            visible: false,
            buttons: [oeditbtn, oclosebtn],
            content: [editForm]
        });
        return new sap.m.Page("userdefaultspagedetail",{
            title: "User Defaults Details",
            footer: new sap.m.Bar(),
            content: [oTable, editD, addDialog]			 //oPanel,editD

        });
    }


});