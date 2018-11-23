sap.ui.jsview("testmaster.Chatbot", {
    getControllerName: function () {
        return "testmaster.Chatbot";
    },
    createContent: function (oController) {

        var chatbotfileds = sap.ui.getCore().byId('app').getModel("ChatbotModel").oData.Fields;
        var chatbotvalue = sap.ui.getCore().byId('app').getModel("ChatbotModel").oData.collection[0];
        var count = sap.ui.getCore().byId('app').getModel("ChatbotModel").oData.count / 2;
        var part2 = Math.round(count);
        var part1 = Math.floor(count);
        var Part1Array = "";
        var Part2Array = "";
        var cnt = 0;
        var cnt1 = 0;
        var formpart1 = new sap.ui.layout.form.FormContainer("F1C1", {
            title: "",
            formElements: [
                new sap.ui.layout.form.FormElement({
                    label: "Social Media Type",
                    fields: [
                        new sap.m.Select({
                            id: "SocialMediaType",
                            selectedKey: "skype",
                            items: [
//                                        new sap.ui.core.Item({key: "", text: "Select Social Media Type"}),
                                new sap.ui.core.Item({key: "facebook", text: "FaceBook Messanger"}),
                                new sap.ui.core.Item({key: "skype", text: "Skype"}),
                                new sap.ui.core.Item({key: "google", text: "Google"}),
//                                        new sap.ui.core.Item({key: "Skype", text: "Skype"}),
//                                        new sap.ui.core.Item({key: "Skype", text: "Skype"}),
                            ],
                            change: function (evt) {
                                if (sap.ui.getCore().byId("SocialMediaType").getSelectedKey() != "") {
                                    oStorage.put('SOCIALMEDIATYPE', sap.ui.getCore().byId("SocialMediaType").getSelectedKey());
                                } else {
                                    oStorage.put('SOCIALMEDIATYPE', "facebook");

                                }
                                oController.ChangeSocialType(evt);
                            },
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                        })
                    ],
                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                }),
//                        Name, EmailID, Surname, ContactNumber, Address, City, PostCode, State
            ],
            layoutData: new sap.ui.core.VariantLayoutData({
                multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                    new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                    new sap.ui.layout.GridData({linebreakL: false})]

            })

        });
        var formpart2 = new sap.ui.layout.form.FormContainer("F1C2", {
            title: "",
            formElements: [
//                        Country, Language, CostCentre, LineManager, Currency, SupplierName, EmployeeID, EmpDesignation, DefaultUoM, Disclaimer, Email, Company, SCDate
            ],
            layoutData: new sap.ui.core.VariantLayoutData({
                multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                    new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                    new sap.ui.layout.GridData({linebreakL: false})]

            })

        });

        $.each(chatbotfileds, function (k, v) {
            if (part1 > k) {
                cnt++;
                Part1Array = "";
                if (v === "Address") {
                    Part1Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.TextArea(v, {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                },
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})
                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    });
                }
                else if (v === "SCDate") {
                    Part1Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.DateTimeInput(v, {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                },
                                valueFormat: "yyyy-MM-dd",
                                displayFormat: "dd MMMM, yyyy",
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                            })
                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    });
                }
                else {
                    Part1Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.Input(v, {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                },
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})

                            })

                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    });
                }
                formpart1.addFormElement(Part1Array);
//                return false;
            }
            else if (part2 - 1 <= k) {
                cnt++;
                Part2Array = "";
                if (v === "Address") {
                    Part2Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.TextArea("v", {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                },
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})
                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    });
                }
                else if (v === "SCDate") {
                    Part2Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.DateTimeInput(v, {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                },
                                valueFormat: "yyyy-MM-dd",
                                displayFormat: "dd MMMM, yyyy",
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                            })
                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    });
                }

                else {
                    Part2Array = new sap.ui.layout.form.FormElement("F1" + v, {
                        label: v,
                        fields: [
                            new sap.m.Input(v, {
                                value: {
                                    parts: [{
                                            path: "ChatbotModel>/collection/0/" + v,
                                        }],
                                    formatter: function (SocialMediaAccountID) {
                                        return SocialMediaAccountID;
                                    }
                                }
                                , //"Hindi",

                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})

                            })

                        ],
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

                    })
                }
                formpart2.addFormElement(Part2Array);
//                return false;
            }

        });

        if (chatbotfileds['SCDate'] !== undefined) {
            var SCDate = new sap.ui.layout.form.FormElement("F1SCDate", {
                label: "SCDate",
                fields: [
                    new sap.m.DateTimeInput("SCDate", {
                        value: {
                            parts: [{
                                    path: "ChatbotModel>/collection/0/SCDate",
                                }],
                            formatter: function (SocialMediaAccountID) {
                                return SocialMediaAccountID;
                            }
                        },
                        valueFormat: "yyyy-MM-dd",
                        displayFormat: "dd MMMM, yyyy",
                        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                    })
                ],
                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})

            });
        } else {
            var SCDate = "";
        }



        var oForm1 = new sap.ui.layout.form.Form("F1", {
            editable: true,
            layout: new sap.ui.layout.form.ResponsiveGridLayout(),
            formContainers: [
                formpart1,
                formpart2
            ]

        });



        var oButton1 = new sap.m.Button("updatep1", {
            text: "Update",
            tap: [oController.Update, oController]

        });

        var oButton2 = new sap.m.Button("Closep1", {
            text: "Close",
            tap: [oController.Close, oController]



        });    //.addStyleClass('clrBTN');                            //.addStyleClass('clrBTN');



        return new sap.m.Page('ChatbotPage', {
            title: "ChatBot",
            showNavButton: true,
            navButtonPress: function () {

                oController.goBack()

            },
            footer: new sap.m.Bar({contentRight: [oButton1, oButton2]}),
            content: [oForm1]    //oFlexBox

        });

    }



});