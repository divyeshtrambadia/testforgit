sap.ui.jsview("testmaster.Admin", {
    getControllerName: function () {
        return "testmaster.Admin";
    },

    createContent: function (oController) {
        var oTileModel = sap.ui.getCore().getModel("oModel1").oData.collection;

        var oList = new sap.ui.core.ListItem({
            text: "{gstNoModel>vCompanyName}", key: "{gstNoModel>gstn}"}
        );

        var GSTNO = new sap.m.Select({
            id: "GSTNO"
        }).bindAggregation("items", "gstNoModel>/collection", oList);


        var tileArray = [];
        var cnt = 0;
        $.each(oTileModel, function (index, value) {
            var oTileContainer = new sap.m.TileContainer({
                height: '100%',
                editable: false,
                title: "Tes",
//                allowAdd:TRUE
            });

//            var oTiles = new sap.m.StandardTile({
//                icon: "sap-icon://locate-me",
//                title: "{TableD>description}",
//                type: "{TableD>type}",
//                number: "{TableD>number}",
//                numberUnit: "{TableD>numberUnit}",
//                info: "{TableD>info}",
//                infoState: "{TableD>infoState}",
////                url: "{TableD>description}",
//                url: "http://localhost/fiorigstn/WebContent/?appName=GST00002&userID=TaxPayer2&userSpecific=Yes&userRole=TaxPayer&company=04AABFN9870CMZT",
//
//                press: function (evt) {
//                    oController.handlePress(evt);
//                }
//            });


            var oTileFactory = function (sId, oContext) {

                var oTile = new sap.m.StandardTile(sId)
                        .bindProperty("title", oContext.sPath + "TableD>description")
                        .bindProperty("type", oContext.sPath + "TableD>type")
                        .bindProperty("info", oContext.sPath + "TableD>info")
                        .bindProperty("infoState", oContext.sPath + "TableD>infoState")
                        .bindProperty("number", oContext.sPath + "TableD>number")
                        .bindProperty("numberUnit", oContext.sPath + "TableD>numberUnit")
                        .addCustomData(new sap.ui.core.CustomData({
                            key: "url",
//                            value: oContext.oModel.getProperty(oContext.sPath + "/url"),
                            value: "http://localhost/fiorigstn/WebContent/?appName=GST00002&userID=TaxPayer2&userSpecific=Yes&userRole=TaxPayer&company=04AABFN9870CMZT",
                            writeToDom: true}))
                        .attachPress(oController.handlePress);

                var iconSrc = oContext.oModel.getProperty(oContext.sPath + "/icon");
                if (iconSrc) {
                    oTile.setIcon(sap.ui.core.IconPool.getIconURI(iconSrc));
                }
                return oTile;
            };

            tileArray[cnt++] = oTileContainer.bindAggregation("tiles", {path: "TableD>/collection/" + index, template: oTileFactory});
            oTileContainer = '';
        });

        return new sap.m.Page({
            title: "Manage Tables 123",
            showNavButton: true,
            navButtonPress: function () {
                oController.goBack();
            },
            content: [GSTNO, tileArray],
        });
    }

});