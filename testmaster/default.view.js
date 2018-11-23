sap.ui.jsview("testmaster.default", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf testmaster.default
	*/ 
	getControllerName : function() {
		return "testmaster.default";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf testmaster.default
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Welcome",
			content: [
			new sap.m.Text({text: "Please select an item from left screen"})
			]
		});
	}

});