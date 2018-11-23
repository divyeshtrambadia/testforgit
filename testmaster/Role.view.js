sap.ui.jsview("testmaster.Role", {
    getControllerName: function () {

        return "testmaster.Role";

    },
    createContent: function (oController) {
        var RoleModel = sap.ui.getCore().byId('app').getModel("RolesModel").oData;
        var oList = new sap.ui.core.ListItem({
            text: "{RolesModel>Role}", key: "{RolesModel>Role}"}
        );
        var Role = "";
        Role = new sap.m.Select({
            id: "Role",
            change: function (oControlEvent) {
                oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                oStorage.put('ROLE', oControlEvent.getSource().getSelectedKey());
                oController.tileGeneration(oControlEvent);
            },
        }).bindAggregation("items", "RolesModel>/collection", oList).addStyleClass("Username");

        var oPanel = new sap.m.Panel("mainpanel", {content: [new sap.m.Panel("oRole", {
                    headerText: "Role",
                    width: "100%",
                    height: "100%",
                    content: [
                        new sap.m.Panel("inputpanel", {content: [
                                new sap.m.Panel("inputpanelinner", {content: [
                                        Role,
                                    ]})

                            ]}),
                    ]

                }

                )]});



        var oFlexBox = new sap.m.FlexBox({
            height: "100%",
            width: "100%",
            justifyContent: sap.m.FlexJustifyContent.SpaceAround,
            alignItems: sap.m.FlexAlignItems.Center,
            direction: sap.m.FlexDirection.Column,
            items: [oPanel]

        });
        return new sap.m.Page("rolepage", {
            navButtonPress: function () {
                oController.goBack();
            },
            content: [oFlexBox
            ],
        });

    }



});