sap.ui.jsview("testmaster.userdefault", {
	getControllerName : function() {
		return "testmaster.userdefault";
	},
	createContent : function(oController) {
		this.setDisplayBlock(true);
 		return new sap.m.SplitApp("splitApp", {});
	}

});