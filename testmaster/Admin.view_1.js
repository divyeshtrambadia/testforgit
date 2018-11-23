sap.ui.jsview("testmaster.Admin", {
    getControllerName: function () {
        return "testmaster.Admin";
    },

    createContent: function (oController) {
        var oTileContainer = new sap.m.TileContainer({id: "listId",
        });

 var oTileContainer = new sap.m.TileContainer("tileid", {
            height: '100%',
            editable: false,
//            tiles: [
//                new sap.m.CustomTile({
//                    content: new sap.m.Text({text: 'Sample example'})
//                })
//            ]
        });

        var oTiles = new sap.m.StandardTile({
            icon: "sap-icon://locate-me",
            title: "{TableD>description}",
            url: "{TableD>description}",
            type: "{TableD>type}",
            number: "{TableD>number}",
            numberUnit: "{TableD>numberUnit}",
            info: "{TableD>info}",
            infoState: "{TableD>infoState}",
            //url: "http://localhost/fiorigstn/WebContent/?appName=GST00002&userID=TaxPayer2&userSpecific=Yes&userRole=TaxPayer&company=04AABFN9870CMZT",

            press: function (evt) {
//                            oController.ListItemPress(evt);
                console.log(evt.getSource().getProperty('title'));

                oController.handlePress(evt);
            }
        });


        oTileContainer.bindAggregation("tiles", {path: "TableD>/collection/Registration", template: oTiles});

        return new sap.m.Page({
            title: "Manage Tables 123",
            showNavButton: true,
            navButtonPress: function () {
                oController.goBack();
            },
            content: [oTileContainer],

        });

    }

});