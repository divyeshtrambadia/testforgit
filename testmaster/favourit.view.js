sap.ui.jsview("testmaster.favourit", {	getControllerName : function() {		return "testmaster.favourit";	},	createContent : function(oController) {		this.setDisplayBlock(true); 		return new sap.m.SplitApp("splitAppfavourit", {});	}});