sap.ui.jsview("testmaster.newtile", {
    getControllerName: function () {

        return "testmaster.newtile";
    },
    createContent: function (oController) {
        var oTileModel = sap.ui.getCore().getModel("oModel1").oData;
        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
        var oLanguageModel = sap.ui.getCore().getModel("oLanguageModel").oData;
        oStorage.put('COMPANY', "");
        var oList = new sap.ui.core.ListItem({
            text: "{gstModel>vCompanyName}", key: "{gstModel>gstn}"}
        );
        var oList1 = new sap.ui.core.ListItem({
            text: "{gstModel>vCompanyName}", key: "{gstModel>gstn}"}
        );
        var GSTNO = '';
        var gstndropdown = '';
        if (oGstNoModel.collection !== '') {
            console.log(oGstNoModel.collection);
            GSTNO = new sap.m.Select({
                id: "GSTNO",
                change: function (oControlEvent) {
                    oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                    oStorage.put('COMPANY', oControlEvent.getSource().getSelectedKey());

                    oController.tileGeneration(oControlEvent);
                },
            }).bindAggregation("items", "gstModel>/collection", oList1);
            gstndropdown = new sap.m.Bar("gstnbar", {
                contentRight: [
                    GSTNO
                ]
            });

        }
        var serchcontent = new sap.m.Bar("searchbar", {
            contentMiddle: [
                new sap.m.SearchField('searchFieldsMainScreen', {
                    value: "",
                    placeholder: "Search here...",
                    liveChange: function () {
                        var searchValue = sap.ui.getCore().byId("searchFieldsMainScreen").getValue();
                        var tileArray = [];
                        var cnt = 0;
                        $.each(oTileModel, function (index, value) {
                            var count = 0;
                            $.each(value, function (i, vv) {

                                $.each(vv, function (ii, v) {

                                    if (ii == 'description') {
                                        if (vv[ii].toLowerCase().indexOf(searchValue.toLowerCase()) != -1) {
//                                                if (vv[ii].search(searchValue) != -1) {
                                            if (count == 0) {
                                                tileArray[cnt++] = new sap.m.Panel({
                                                    expandable: false,
                                                    content: [new sap.m.Label({text: index}).addStyleClass("headerLabel")]
                                                }).addStyleClass("headerLabel");
                                                count++;
                                            }
                                            tileArray[cnt] = Array(
                                                    new sap.m.GenericTile({
                                                        backgroundImage: oStorage.get('SITEURL') + 'assets/images/calimage/' + vv['vImage'],
                                                        frameType: "TwoByOne",
                                                        tileContent: [
                                                            new sap.m.TileContent({
                                                                footer: vv['number'],
                                                                content: [
                                                                    new sap.m.NewsContent({
                                                                        contentText: vv['vDescription'],
                                                                        subheader: vv['vHelp']
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }).addCustomData(new sap.ui.core.CustomData({
                                                key: "url",
                                                value: vv['url'],
                                                writeToDom: true})).attachPress(oController.handlePress).addStyleClass("sapUiTinyMargin")

                                                    )
                                        }
                                    }
                                });
                                cnt++;
                            });
                        });
                        var tileArray1 = new sap.m.Panel("test1", {
                            expandable: false,
                            content: [
                                tileArray
                            ]
                        });
                        sap.ui.getCore().byId("scrollID").destroyContent();//
                        sap.ui.getCore().byId("scrollID").addContent(tileArray1);
                    }
                })
            ],
        });
        if (sap.ui.Device.system.desktop) {
            serchcontent = "";
            gstndropdown = "";
        } else if (sap.ui.Device.system.phone) {
        } else {
            serchcontent = "";
            gstndropdown = "";
        }
        var select = new sap.m.Bar("titlebar", {
            width: "100%", height: "107px",
            contentLeft: [
                new sap.m.Text("titletext", {
                    text: 'Dashboard'
                }),
            ],
            contentMiddle: [],
            contentRight: [
                (sap.ui.Device.system.phone ? "" : GSTNO)
            ]
        });
        var tileArray = [];
        var cnt = 0;
        $.each(oTileModel, function (index, value) {
            tileArray[cnt++] = new sap.m.Panel({
                expandable: false,
                content: [new sap.m.Label({text: index}).addStyleClass("headerLabel")]
            }).addStyleClass("headerLabel");

            $.each(value, function (i, v) {

                tileArray[cnt++] = new sap.m.SlideTile({
                    displayTime: 5000,
                    transitionTime: 500,
                    tiles: [
                        new sap.m.GenericTile({
                            backgroundImage: oStorage.get('SITEURL') + 'assets/images/tile/' + v['vImage'],
                            frameType: "TwoByOne",
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
                            writeToDom: true})).attachPress(oController.handlePress)
                    ]
                }).addStyleClass("sapUiTinyMargin"); //.addClass("sapUiTinyMarginTop");
            });
        });
        var tileArray1 = new sap.m.Panel('test', {
            expandable: false,
            content: [
                tileArray
            ]
        });

        var scroll = new sap.m.ScrollContainer('scrollID', {
            vertical: true,
            horizontal: true,
            height: "100%",
            width: "100%",
        });
        scroll.addContent(tileArray1);

        var oActionSheet = new sap.m.ActionSheet({
            placement: sap.m.PlacementType.VerticalPreferedTop,
            buttons: [
                new sap.m.Button({
                    //                    text: "Profile",
                    text: oLanguageModel.Profile,
                    press: function (oEvent) {
                        oController.ProfilePress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: oLanguageModel.ChangePassword,
                    //                    text: "ChangePassword",
                    press: function (oEvent) {
                        oController.changePWPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: oLanguageModel.UserDefaults,
                    //                    text: "UserDefaults",
                    press: function (oEvent) {
                        oController.userDefaultPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "Favourite",
                    //                    text: "UserDefaults",
                    press: function (oEvent) {
                        oController.FavouritPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "Chatbot",
                    //                    text: "UserDefaults",
                    press: function (oEvent) {
                        oController.ChatbotPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "Role",
                    press: function (oEvent) {
                        oController.roledialog(oEvent);

                    }
                }),
                new sap.m.Button({
                    text: oLanguageModel.LogOut,
                    //                    text: "LogOut",
                    press: function () {
                        window.location.href = oStorage.get('GOBACK');
                    }
                })

            ]
        });
        var headercontent = '';
        if (sap.ui.Device.system.desktop) {
            headercontent = new sap.m.Bar("newtilehaderbar", {
                contentLeft: [
                    new sap.m.Image("companylogo", {
                        src: "openui5/ic-logo.png",
                        height: "48px",
                        width: "166px"
                    }), ],
                contentMiddle: [
                    new sap.m.SearchField('searchFieldsMainScreen', {
                        value: "",
                        placeholder: "Search here...",
                        liveChange: function () {
                            var searchValue = sap.ui.getCore().byId("searchFieldsMainScreen").getValue();
                            var tileArray = [];
                            var cnt = 0;
                            $.each(oTileModel, function (index, value) {
                                var count = 0;
                                $.each(value, function (i, vv) {

                                    $.each(vv, function (ii, v) {

                                        if (ii == 'description') {
                                            if (vv[ii].toLowerCase().indexOf(searchValue.toLowerCase()) != -1) {
//                                                if (vv[ii].search(searchValue) != -1) {
                                                if (count == 0) {
                                                    tileArray[cnt++] = new sap.m.Panel({
                                                        expandable: false,
                                                        content: [new sap.m.Label({text: index}).addStyleClass("headerLabel")]
                                                    }).addStyleClass("headerLabel");
                                                    count++;
                                                }
                                                tileArray[cnt] = Array(
                                                        new sap.m.GenericTile({
                                                            backgroundImage: oStorage.get('SITEURL') + 'assets/images/tile/' + vv['vImage'],
                                                            frameType: "TwoByOne",
                                                            tileContent: [
                                                                new sap.m.TileContent({
                                                                    footer: vv['number'],
                                                                    content: [
                                                                        new sap.m.NewsContent({
                                                                            contentText: vv['vDescription'],
                                                                            subheader: vv['vHelp']
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }).addCustomData(new sap.ui.core.CustomData({
                                                    key: "url",
                                                    value: vv['url'],
                                                    writeToDom: true})).attachPress(oController.handlePress).addStyleClass("sapUiTinyMargin")

                                                        )
                                            }
                                        }
                                    });
                                    cnt++;
                                });
                            });
                            var tileArray1 = new sap.m.Panel("test1", {
                                expandable: false,
                                content: [
                                    tileArray
                                ]
                            });
                            sap.ui.getCore().byId("scrollID").destroyContent();//
                            sap.ui.getCore().byId("scrollID").addContent(tileArray1);
                        }
                    })

                ],
                contentRight: [
                    new sap.m.Image({
                        src: oStorage.get('COMPANYIMAGEURL'),
                        height: "42px",
                        width: "42px"
                    }),
                    new sap.m.Label({text: oStorage.get('USERNAME')
                    }),
                    new sap.m.Button({
                        icon: "sap-icon://dropdown", press: function () {
                            oActionSheet.openBy(this);
                        }
                    })
                ]
            });
        } else if (sap.ui.Device.system.phone) {
            headercontent = new sap.m.Bar("newtilehaderbar", {
                contentLeft: [
                    new sap.m.Image("companylogo", {
                        src: "openui5/ic-logo.png",
                        height: "48px",
                        width: "166px"
                    }),
                ],
                contentMiddle: [
                ],
                contentRight: [
                    new sap.m.Image({
                        src: oStorage.get('COMPANYIMAGEURL'),
                        height: "42px",
                        width: "42px"
                    }),
                    new sap.m.Label({
                        text: oStorage.get('USERNAME')
                    }),
                    new sap.m.Button({
                        icon: "sap-icon://dropdown",
                        press: function () {
                            oActionSheet.openBy(this);
                        }
                    }),
                ]
            });


        } else {
        }

        //XXXXXXXXXXXXXXXX   city filter XXXXXXXXXXXXXXXXXX//

        var oVisSelect = new sap.m.Select("Sel-city", {//working
            tooltip: "Please select city....",
            change: function (oEvent) {
                oStorage.put('VCITYT', '');
                var sKey = oEvent.getParameter("selectedItem").getKey();
                var sText = oEvent.getParameter("selectedItem").getText();
                oStorage.put('VCITYT', sText);
            }
        }).bindAggregation("items", "cityModel>/",
                new sap.ui.core.Item({text: "{cityModel>name}", key: "{cityModel>name}"
                }));
        var roledialog = new sap.m.Dialog("roleDialog",
                {
                    title: "Role",
                    modal: true,
                    visible: true,
                    contentWidth: "1em",
                    buttons: [new sap.m.Button(
                                {
                                    text: "Cancel",
                                    press: function () {
                                        sap.ui.getCore().byId("roleDialog").close();
                                    }
                                }
                        )
                    ],
                    content: [
                        new sap.ui.layout.form.SimpleForm(
                                '', {
                                    maxContainerCols: 2,
                                    editable: true,
                                    content: [
//                                Role
                                        new sap.m.Select({
                                            id: "",
                                            change: function (oControlEvent) {
                                                if (oControlEvent.getSource().getSelectedKey() === "Please Select Role") {
                                                    sap.m.MessageToast.show("Select Another Role ..");

                                                } else {
                                                    oStorage.put('ROLE', oControlEvent.getSource().getSelectedKey());
                                                    oController.Role(oControlEvent);
                                                }
                                            },
                                        }).bindAggregation("items", "RolesModel>/collection", new sap.ui.core.ListItem({
                                            text: "{RolesModel>Role}", key: "{RolesModel>Role}"}
                                        )).addStyleClass("Username")

                                    ]
                                }
                        )
                    ]
                });

        return new sap.m.Page("newtilepage", {
            title: "User Dashboard",
            showNavButton: true,
            customHeader: headercontent,
            navButtonPress: function () {
                oController.goBack();
            },
            content: [select, roledialog, serchcontent, gstndropdown, scroll  //select, tileArray1,

            ],
        });
    }
});