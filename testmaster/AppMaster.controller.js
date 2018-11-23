sap.ui.controller("testmaster.AppMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testmaster.AppMaster
*/
	onInit: function() {
		
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
	//	var oView4 = this.getView();
        var oModel = new sap.ui.model.json.JSONModel('model/AppManage.json');
	//   oView4.setModel(oModel,'Apps');
        sap.ui.getCore().byId("app").setModel(oModel,'Apps');
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testmaster.AppMaster
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testmaster.AppMaster
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testmaster.AppMaster
*/
//	onExit: function() {
//
//	}
	
	// add dialog save button
	save: function(){
		var content = sap.ui.getCore().byId("formId1").getContent();
        var oEntry = {};
        oEntry.App = content[2].getValue();
        oEntry.description = content[4].getValue();
        oEntry.module = content[6].getValue();
        oEntry.area = content[8].getValue();
        oEntry.seqno = content[10].getValue();
        oEntry.eStatus = content[12].getValue();
		oEntry.iConClass = content[14].getValue();
		
		sap.ui.getCore().byId("app").getModel('Apps').oData.collection.push(oEntry);
		sap.ui.getCore().byId("app").getModel('Apps').refresh(true);
		
		sap.ui.getCore().byId("addDialog").close();
		sap.m.MessageBox.alert(
                "App added successfully");
                
            
		
//		var oModel = sap.ui.getCore().byId("app").getModel('Apps');
//	//	var oModel = this.getModel("Apps");
//		// create new entry in the model
	//	this._oContext = oModel.createEntry("/collection", oEntry  //{
//		//	properties: oEntry,
//		//	success: this._onCreateSuccess.bind(this)
//		}
//		);		
//		// bind the view to the new entry
//		this.getView().setBindingContext(this._oContext);
	},
	
	// add dialog cancel button
	cancel : function() {

		sap.ui.getCore().byId("addDialog").close();

	},
	
	
////delete method
//    Delete:function(oEvent)	{
//    	
//    	var oList =sap.ui.getCore().byId("listId1");
//    	
//        var sItem = oList.getSelectedItem();
//		
//		var oBindingcontext = sItem.getBindingContext('Apps');
//		
//	    var sPath = oBindingcontext.sPath;         //  /collection/1
//			
//		var item = sap.ui.getCore().byId("app").getModel('Apps').getProperty(sPath);
//		console.log(item);
//		
//		var array = oList.getModel("Apps").getData().collection;
//		console.log(array);
//		
//		array.splice( array.indexOf( item), 1 );  
//    	oList.getModel("Apps").refresh();  
//	        
//    	
//	  },	
	
  // search method
	PR_Search: function(oEvent) {
        var tpmla = oEvent.getParameter("newValue");
        var filters = new Array();
        var oFilter = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, tpmla);
        filters.push(oFilter);
        //get list created in view
        this.oList = sap.ui.getCore().byId("listId1");
        this.oList.getBinding("items").filter(filters);
    },
	
    // list item select method
	itemSelected: function(){
		
		var router= sap.ui.core.UIComponent.getRouterFor(this);
		
		var list = sap.ui.getCore().byId("listId1");
		
		var sItem = list.getSelectedItem();
		
		var oBindingcontext = sItem.getBindingContext('Apps');
		
	    var sPath = oBindingcontext.sPath;         //  /collection/1
		
//		var item = sap.ui.getCore().byId("app").getModel('Apps').getProperty(sPath);		
//
//		var oModel = new sap.ui.model.json.JSONModel(item);
//		 sap.ui.getCore().byId("app").setModel(oModel,'item'); 
//		 
//	//	 sap.ui.getCore().setModel(oModel,'item');
//	//	 sap.ui.getCore().byId("appmanage1.Detail").setModel(oModel,'item');
		 
	    var start = sPath.lastIndexOf("/") + 1;
	    
	    var appIndex = sPath.substring(start, sPath.length);
	    //  console.log(appIndex);
	    
	    router.navTo("appdetail", {appIndex:appIndex});
	    
	}


});