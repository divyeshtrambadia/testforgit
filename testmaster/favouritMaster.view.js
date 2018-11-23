sap.ui.jsview("testmaster.favouritMaster", {
    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf testmaster.userdefaultMaster
     */
    getControllerName: function() {
        return "testmaster.favouritMaster";
    },
    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf testmaster.userdefaultMaster
     */
    createContent: function(oController) {
        var oLanguageModel = sap.ui.getCore().getModel("oLanguageModel").oData;
        var sf = new sap.m.SearchField({
            placeholder: oLanguageModel.Search,
            showRefreshButton: true,
            liveChange: oController.PR_Search,
            search: oController.PR_Search,
            tooltip: "Search for objects..",
        });

// Apps List
        var oList = new sap.m.List({
            id: "listIdf1",
            mode: sap.m.ListMode.SingleSelectMaster,
            select: function() {
                oController.itemSelected();
            },
        });
        var oItemTemplate = new sap.m.ObjectListItem({
            id: "sListf1",
            title: "{Apps>ApplicationID}",
            attributes: [new sap.m.ObjectAttribute({text: "{Apps>description}"})],
            firstStatus: new sap.m.ObjectStatus({text: "{Apps>appStatus}"})
        });
        oList.bindAggregation("items", "Apps>/collection", oItemTemplate);
        return new sap.m.Page("favouritpagemaster",{
            title: oLanguageModel.Apps,
            showNavButton: true,
            navButtonPress: function() {
                oController.goBack()
            },
            footer: new sap.m.Bar(),
            content: [sf, oList]  //
        });
    }

});