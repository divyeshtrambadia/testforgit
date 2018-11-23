sap.ui.jsview("testmaster.favouritDetail", {
    getControllerName: function () {
        return "testmaster.favouritDetail";
    },
    createContent: function (oController) {
        var oTable = new sap.m.Table({
            id: "tablef",
            width: "auto",
            headerToolbar: [
                new sap.m.Toolbar({
                    content: [
                        new sap.m.Title({text: "Favourite"}),
                        new sap.m.ToolbarSpacer(),
                        new sap.m.Button({
                            icon: "sap-icon://add",
                            press: function () {
                                sap.ui.getCore().byId("addDialogf").setVisible(true);
                                sap.ui.getCore().byId("addDialogf").open();
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
                    header: new sap.m.Label({text: "Favourite1"}),
                    width: "100px",
                }), new sap.m.Column({
                    header: new sap.m.Label({text: "Favourite2"}),
                    width: "100px",
                }), new sap.m.Column({
                    header: new sap.m.Label({text: "Favourite2"}),
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
                new sap.m.Text({text: "{favourit>Field}"}),
                new sap.m.Text({text: "{favourit>Fav1}"}),
                new sap.m.Text({text: "{favourit>Fav2}"}),
                new sap.m.Text({text: "{favourit>Fav3}"}),
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

        oTable.bindAggregation("items", "favourit>/favourit/", oTemplate);

        var oPanel = new sap.m.Panel({
            width: "900px",
            content: [oTable]
        })//.addStyleClass('sapUiResponsiveMargin');

        var addForm = new sap.ui.layout.form.SimpleForm(
                'formIdf', {
                    maxContainerCols: 2,
                    editable: true,
                    content: [
                        new sap.m.Label({
                            text: "Field",
                            required: true
                        }),
                        new sap.m.Select({
                            id: "IPaf1",
                        }).bindAggregation("items", "Fieldsf>/collection",
                                new sap.ui.core.Item({text: "{Fieldsf>XmlField}", key: "{Fieldsf>XmlField}"
                                })),
                        new sap.m.Label({
                            text: "FavouriteValue 1",
                            required: true
                        }),
                        new sap.m.Input("IPaf2", {
                            value: "",
                            placeholder: "please enter favourite value 1"
                        }),
                        new sap.m.Label({
                            text: "FavouriteValue 2",
                            required: true
                        }),
                        new sap.m.Input("IPaf3", {
                            value: "",
                            placeholder: "please enter favourite value 2"
                        }), new sap.m.Label({
                            text: "FavouriteValue 3",
                            required: true
                        }),
                        new sap.m.Input("IPaf4", {
                            value: "",
                            placeholder: "please enter favourite value 3"
                        }),
                    ]

                });

        var oButton2 = new sap.m.Button("Savef", {
            text: "Save",
            tap: [oController.save, oController]
        });

        var oButton3 = new sap.m.Button("Cancelf", {
            text: "Cancel",
            tap: [oController.cancel, oController]

        });

        var addDialog = new sap.m.Dialog("addDialogf", {
            title: "Add Favourite",
            modal: true,
            visible: false,
            contentWidth: "1em",
            buttons: [oButton2, oButton3],
            content: [addForm]
        });

        //edit form starts here    
        var editForm = new sap.ui.layout.form.SimpleForm(
                'editformf', {
                    maxContainerCols: 2,
                    editable: true,
                    content: [
                        new sap.m.Label({text: "Field"}),
                        new sap.m.Select({
                            id: "IPf1",
                            selectedKey: "{favourit>Field}"
                        }).bindAggregation("items", "Fieldsf>/collection",
                                new sap.ui.core.Item({text: "{Fieldsf>XmlField}", key: "{Fieldsf>XmlField}"
                                })),
                        new sap.m.Label({
                            text: "FavouriteValue1",
                            required: true
                        }),
                        new sap.m.Input("IPf2", {
                            value: "{favourit>Fav1}",
                            placeholder: "please enter favourite value"
                        }), new sap.m.Label({
                            text: "FavouriteValue2",
                            required: true
                        }),
                        new sap.m.Input("IPf3", {
                            value: "{favourit>Fav2}",
                            placeholder: "please enter favourite value"
                        }), new sap.m.Label({
                            text: "FavouriteValue3",
                            required: true
                        }),
                        new sap.m.Input("IPf4", {
                            value: "{favourit>Fav3}",
                            placeholder: "please enter favourite value"
                        }),
                    ]
                });

        var oeditbtn = new sap.m.Button("updatef", {
            text: "Update",
            tap: [oController.Update, oController]
        });

        var oclosebtn = new sap.m.Button("Closef", {
            text: "Close",
            tap: [oController.Close, oController],
        });

        var editD = new sap.m.Dialog("editDialogf", {
            title: "Edit Favourite",
            modal: true,
            contentWidth: "1em",
            visible: false,
            buttons: [oeditbtn, oclosebtn],
            content: [editForm]
        });
        return new sap.m.Page("favouritpagedetail", {
            title: oStorage.get('DESCRIPATION'),
            footer: new sap.m.Bar(),
            content: [oTable, editD, addDialog]			 //oPanel,editD

        });
    }


});