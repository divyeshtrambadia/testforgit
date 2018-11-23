sap.ui.controller("testmaster.Profile", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testmaster.Profile
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testmaster.Profile
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testmaster.Profile
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testmaster.Profile
*/
//	onExit: function() {
//
//	}
	goBack: function() {				
		//window.history.go(-1);
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("new");
	},
	
	Update: function () {
//       // var content = sap.ui.getCore().byId("F1").getContent();
//        var oEntry = {}; 
//        var v1= $('#_input0-inner').val();
//        console.log(v1);
////        oEntry.vLanguage = content[1].getValue();        
////        oEntry.Dasboard = content[3].getSelectedKey();
////        oEntry.PopWindow = content[5].getSelectedKey();        
////        oEntry.HouseNo = content[7].getValue();
////        console.log(oEntry.HouseNo);
////        oEntry.Street = content[9].getValue();
////        oEntry.City = content[11].getValue();
////        oEntry.PostalCode = content[13].getValue();
////        oEntry.State = content[15].getValue();
////        oEntry.Country = content[17].getValue();
//        oEntry.UploadImage = $('#vEditImage-inner').val();   //content[19].getValue();
		 var oEntry = {};
		 oEntry.vLanguage = sap.ui.getCore().byId("FR1").getValue()
		  oEntry.Dasboard = sap.ui.getCore().byId("FR2").getSelectedKey();
            //  console.log(oEntry.Dasboard);
		 oEntry.PopWindow = sap.ui.getCore().byId("FR3").getSelectedKey();
		 oEntry.HouseNo = sap.ui.getCore().byId("FR4").getValue();
		 oEntry.Street = sap.ui.getCore().byId("FR5").getValue();
		 oEntry.City = sap.ui.getCore().byId("FR6").getValue();
		 oEntry.PostalCode = sap.ui.getCore().byId("FR7").getValue();
		 oEntry.State = sap.ui.getCore().byId("FR8").getValue();
		 oEntry.Country = sap.ui.getCore().byId("FR9").getValue();
		 oEntry.UploadImage = sap.ui.getCore().byId("vEditImage").getValue();
		 		 
//		 console.log(oEntry);		 
//		var model = sap.ui.getCore().byId("app").getModel("Users")
//           console.log(model);
        sap.ui.getCore().byId("app").getModel("Users").oData = oEntry;
        sap.ui.getCore().byId("app").getModel('Users').refresh(true);
        sap.m.MessageToast.show("User's profile edited successfully..", {duration: 3000});
        
        var EDASHBOARD = oEntry.Dasboard;
        var router = sap.ui.core.UIComponent.getRouterFor(this);
	//	router.navTo("new");
		if (EDASHBOARD == 'New') {
            router.navTo("new");
        } else {
            router.navTo("Classic");
        }

    },
    Close: function () {
    	var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("new");
    },

});