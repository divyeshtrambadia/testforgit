sap.ui.jsview("testmaster.Admin", {
    getControllerName: function() {

        return "testmaster.Admin";
    },
    createContent: function(oController) {
        var oTileModel = sap.ui.getCore().getModel("oModel1").oData;
        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
        oStorage.put('COMPANY', "");

        var oList = new sap.ui.core.ListItem({
            text: "{gstModel>vCompanyName}", key: "{gstModel>gstn}"}
        );

        var GSTNO = '';
        if (oGstNoModel.collection != '') {
            GSTNO = new sap.m.Select({
                id: "GSTNO",
                change: function(oControlEvent) {
                    oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                    oStorage.put('COMPANY', oControlEvent.getSource().getSelectedKey());
                },
            }).bindAggregation("items", "gstModel>/collection", oList);
        }


        var tileArray = [];
        var cnt = 0;
        $.each(oTileModel, function(index, value) {

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                modelData: oTileModel[index]
            });

            var oTileFactory = function(sId, oContext) {
                var oTile = new sap.m.StandardTile(sId)
                        .bindProperty("title", oContext.sPath + "/description")
                        .bindProperty("type", oContext.sPath + "/type")
                        .bindProperty("info", oContext.sPath + "/info")
                        .bindProperty("infoState", oContext.sPath + "/infoState")
                        .bindProperty("number", oContext.sPath + "/number")
                        .bindProperty("numberUnit", oContext.sPath + "/numberUnit")
                        .addCustomData(new sap.ui.core.CustomData({
                            key: "url",
                            value: oContext.oModel.getProperty(oContext.sPath + "/url"),
                            writeToDom: true})).attachPress(oController.handlePress);

                var iconSrc = oContext.oModel.getProperty(oContext.sPath + "/vFioriIcon");
                if (iconSrc) {
                    oTile.setIcon(sap.ui.core.IconPool.getIconURI(iconSrc));
                }
                return oTile;
            };
            var oTileContainer = new sap.m.TileContainer({
                width: "100%",
                height: "40%",
                editable: false,
                visible: true
            });
            oTileContainer.setModel(oModel);
            tileArray[cnt++] = new sap.m.VBox({
                alignItems: sap.m.FlexAlignItems.Center,
                items: [new sap.m.Label({
                        text: index
                    }).addStyleClass('labelCls')
                ]
            });



            tileArray[cnt++] = oTileContainer.bindAggregation("tiles", "/modelData", oTileFactory);

            oTileContainer = '';
        });

        var oPanel1 = new sap.m.Panel({expandable: false});
        oPanel1.addContent(new sap.ui.layout.HorizontalLayout({
            content: [tileArray]
        }));


        var oActionSheet = new sap.m.ActionSheet({
            placement: sap.m.PlacementType.VerticalPreferedTop,
            buttons: [
                new sap.m.Button({
                    text: "Profile",
                    press: function(oEvent) {
                        oController.ProfilePress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "ChangePassword",
                    press: function(oEvent) {
                        oController.changePWPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "UserDefaults",
                    press: function(oEvent) {
                        oController.userDefaultPress(oEvent);
                    }
                }),
                new sap.m.Button({
                    text: "LogOut",
                    press: function() {
                        window.location.href = oStorage.get('GOBACK');
                    }
                })
            ]
        });

        return new sap.m.Page({
            title: "User Dashboard",
            showNavButton: true,
            customHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.Image({
//                        src: "resources/142528357929.png",
                        src: oStorage.get('COMPANYIMAGEURL'),
                        height: "40px"
                    }),
                    new sap.m.Label({
//                        text: "SmartPhoneBizApps"
                        text: oStorage.get('COMPANYNAME')
                    }).addStyleClass('headerCLS')
                ],
                contentRight: [
                    new sap.m.Image({
                        src: oStorage.get('USERIMAGEURL'),
                        height: "40px"
                    }),
                    new sap.m.Label({
                        text: oStorage.get('USERNAME')
                    }),
                    new sap.m.Button({
                        icon: "sap-icon://dropdown",
                        // text: "Action",
                        press: function() {
                            oActionSheet.openBy(this);
                        }
                    })
                ]
            }),
            navButtonPress: function() {
                oController.goBack();
            },
            content: [GSTNO, tileArray],
        });
    }

});