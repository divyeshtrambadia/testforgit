sap.ui.jsview("testmaster.newtile", {
    getControllerName: function () {

        return "testmaster.newtile";
    },

    createContent: function (oController) {
        var oTileModel = sap.ui.getCore().getModel("oModel1").oData;
        var oGstNoModel = sap.ui.getCore().getModel("gstModel").oData;
        oStorage.put('COMPANY', "");

        var oList = new sap.ui.core.ListItem({
            text: "{gstNoModel>vCompanyName}", key: "{gstNoModel>gstn}"}
        );

        var GSTNO = '';
        if (oGstNoModel.collection != '') {
            GSTNO = new sap.m.Select({
                id: "GSTNO",
                change: function (oControlEvent) {
                    oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                    oStorage.put('COMPANY', oControlEvent.getSource().getSelectedKey());
                    sap.ui.getCore().byId("test").destroyContent();
                    oController.tileGeneration();
                },
            }).bindAggregation("items", "gstNoModel>/collection", oList);
        }


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
                    //     StyleClass: "sapUiTinyMarginTop",

                    tiles: [
                        new sap.m.GenericTile({
                            backgroundImage: oStorage.get('SITEURL') + 'assets/images/tile/' + v['vImage'],
                            frameType: "TwoByOne",
                            tileContent: [
                                new sap.m.TileContent({
                                    footer: v['number'],
                                    content: [
                                        new sap.m.NewsContent({
                                            contentText: v['vHelp'],
                                            subheader: v['vDescription']
                                        })
                                    ]
                                })
                            ]
                        }).addCustomData(new sap.ui.core.CustomData({
                            key: "url",
                            value: v['url'],
//                            writeToDom: true}))
                            writeToDom: true})).attachPress(oController.handlePress).addStyleClass("sapUiTinyMargin")
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

        var oActionSheet = new sap.m.ActionSheet({
            placement: sap.m.PlacementType.VerticalPreferedTop,
            buttons: [
                new sap.m.Button({
                    text: "LogOut",
                    press: function () {
                        window.location.href = oStorage.get('GOBACK');
                    }
                })
            ]
        });

        return new sap.m.Page({

            title: "User Dashboard",
            showNavButton: true,
            content: [GSTNO, tileArray],
//            content: [GSTNO, tileArray1],
            customHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.Image({
                        src: "resources/142528357929.png",
                        height: "40px"
                    }),
                    new sap.m.Label({
                        text: "SmartPhoneBizApps"
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
                        press: function () {
                            oActionSheet.openBy(this);
                        }
                    })
                ]
            }),

            navButtonPress: function () {
                oController.goBack();
            },

        });
    }
});