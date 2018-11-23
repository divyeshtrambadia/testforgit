sap.ui.jsview("testmaster.Profile", {
    getControllerName: function() {
        return "testmaster.Profile";
    },
    createContent: function(oController) {
        var oLanguageModel = sap.ui.getCore().getModel("oLanguageModel").oData;
        var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();

        var oForm1 = new sap.ui.layout.form.Form("F1", {
            editable: true,
            layout: oLayout3,
            formContainers: [
                new sap.ui.layout.form.FormContainer("F1C1", {
                    title: oLanguageModel.General,
                    formElements: [
                        new sap.ui.layout.form.FormElement("F1E1", {
                            label: oLanguageModel.Language,
                            fields: [
                                new sap.m.Input("FR1", {
                                    value: "{Users>/vLanguage}", //"Hindi",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.Dashboard,
                            fields: [
                                new sap.m.Select({
                                    id: "FR2",
                                    selectedKey: "{Users>/Dashboard}", // "{Users>Dashboard}",
                                    items: [
                                        new sap.ui.core.Item({key: "New", text: "New"}),
                                        new sap.ui.core.Item({key: "Classic", text: "Classic"}),
                                    ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.PopWindow,
                            fields: [
                                new sap.m.Select({
                                    id: "FR3",
                                    selectedKey: "{Users>/PopWindow}",
                                    items: [
                                        new sap.ui.core.Item({key: "ON", text: "ON"}),
                                        new sap.ui.core.Item({key: "OFF", text: "OFF"}),
                                    ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),
                new sap.ui.layout.form.FormContainer("F1C2", {
                    title: oLanguageModel.Address,
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.HouseNo,
                            fields: [
                                new sap.m.Input("FR4", {
                                    value: "{Users>/HouseNo}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.Street,
                            fields: [
                                new sap.m.Input("FR5", {
                                    value: "{Users>/Street}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.City,
                            fields: [
                                new sap.m.Input("FR6", {
                                    value: "{Users>/City}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.PostalCode,
                            fields: [
                                new sap.m.Input("FR7", {
                                    value: "{Users>/PostalCode}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.State,
                            fields: [
                                new sap.m.Input("FR8", {
                                    value: "{Users>/State}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.Country,
                            fields: [
                                new sap.m.Input("FR9", {
                                    value: "{Users>/Country}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),
                new sap.ui.layout.form.FormContainer("F1C3", {
                    title: oLanguageModel.Image,
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: oLanguageModel.UploadImage,
                            fields: [
                                new sap.ui.unified.FileUploader('FR10', {
                                    uploadUrl: oStorage.get("BASEURL") + "uploaduserimage.php",
                                    name: "image",
                                    additionalData: 'string',
                                    uploadOnChange: true,
                                    useMultipart: false,
                                    placeholder: "Choose a file for Upload...",
                                    style: "Emphasized",
                                    fileType: ["jpg", "png"],
                                    multiple: false,
                                    uploadComplete: function(oEvent) {
                                        var sResponse = oEvent.getParameter("response");
                                        if (sResponse) {
                                            $('#vEditImage-inner').val(sResponse);
                                        }
                                    },
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
//                        new sap.ui.layout.form.FormElement({
//                            label: oLanguageModel.Image,
//                            fields: [
//                                new sap.m.Input({
//                                    id: "vEditImage",
//                                    value: "{Users>/UploadImage}",
//                                    enabled: false,
//                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
//                                })
//                            ],
//                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
//                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),
                new sap.ui.layout.form.FormContainer("F1C4", {
                    title: "Social Media",
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "Social Media Type",
                            fields: [
                                new sap.m.Select({
                                    id: "FR11",
                                    selectedKey: {
                                        parts: [{
                                                path: "Users>/SocialAccount/0/SocialMediaType",
                                            }],
                                        formatter: function (SocialMediaType) {
                                            return SocialMediaType;
                                        }
                                    }, // "{Users>Dashboard}",
                                    items: [
                                        new sap.ui.core.Item({key: "", text: "Select Social Media Type"}),
                                        new sap.ui.core.Item({key: "FaceBookMessanger", text: "FaceBook Messanger"}),
                                        new sap.ui.core.Item({key: "Skype", text: "Skype"}),
                                        new sap.ui.core.Item({key: "WebChat", text: "Web Chat"}),
//                                        new sap.ui.core.Item({key: "Skype", text: "Skype"}),
//                                        new sap.ui.core.Item({key: "Skype", text: "Skype"}),
                                    ],
                                    change: function (evt) {
                                        if (sap.ui.getCore().byId("FR11").getSelectedKey() != "") {
                                            var socailaccount = sap.ui.getCore().byId("app").getModel("Users").oData;
                                            if (socailaccount.SocialAccount != undefined) {
                                                $.each(socailaccount.SocialAccount, function (key, value) {
                                                    if (value.SocialMediaType == sap.ui.getCore().byId("FR11").getSelectedKey()) {
                                                        sap.ui.getCore().byId("FR12").setValue(value.SocialMediaAccountID);
                                                        return false;
                                                    } else {
                                                        sap.ui.getCore().byId("FR12").setValue("");
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Social Media AccountID",
                            fields: [
                                new sap.m.Input("FR12", {
                                    value: {
                                        parts: [{
                                                path: "Users>/SocialAccount/0/SocialMediaAccountID",
                                            }],
                                        formatter: function (SocialMediaAccountID) {
                                            return SocialMediaAccountID;
                                        }
                                    }, //"Hindi",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })

                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),
            ]
        });

        var oButton1 = new sap.m.Button("updatep1", {
            text: oLanguageModel.Update,
            tap: [oController.Update, oController]
        });
        var oButton2 = new sap.m.Button("Closep1", {
            text: oLanguageModel.Close,
            tap: [oController.Close, oController]

        });    //.addStyleClass('clrBTN');                            //.addStyleClass('clrBTN');

        return new sap.m.Page('profilePage', {
            title: oLanguageModel.Profile,
            showNavButton: true,
            navButtonPress: function() {
                oController.goBack()
            },
            footer: new sap.m.Bar({contentRight: [oButton1, oButton2]}),
            content: [oForm1]    //oFlexBox
        });
    }

});