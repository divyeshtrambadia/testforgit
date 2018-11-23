sap.ui.controller("testmaster.AppDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testmaster.AppDetail
*/
	onInit: function() {

		this.router= sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
	//	this.router.getRoute("detail")attachRoutePatternMatched(this._handleRouteMatched, this);
		
	},
	
	_handleRouteMatched: function(evt){
		if(evt.getParameter("name")!== "appdetail"){
			return;
		}
					
		this.appIndex = evt.getParameter("arguments").appIndex;
		//  alert(this.appIndex);
		
		 context = sap.ui.getCore().byId("app").getModel("Apps").getContext("/collection/" + this.appIndex + "/");
		// "app" is the id of our main view, check component.js file for view id
		
		console.log(context);
		
		this.getView().setBindingContext(context, "Apps");
	//	sap.ui.getCore().byId("formId2").setBindingContext(context, "Apps");
		
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testmaster.AppDetail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testmaster.AppDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testmaster.AppDetail
*/
//	onExit: function() {
//
//	}
	
	editPress : function(evt){
		var oeditDialog = sap.ui.getCore().byId("editDialog");
		oeditDialog.setVisible(true);
		sap.ui.getCore().byId("editDialog").open();
	},
	
	Update : function(){
		
		sap.ui.getCore().byId("editDialog").close();
		sap.m.MessageBox.alert(
                "App edited successfully");
		
		
		 var content = sap.ui.getCore().byId("formId2").getContent();
	      var oEntry = {};
	      oEntry.App = content[2].getValue();
	      oEntry.description = content[4].getValue();
	      oEntry.module = content[6].getValue();
	      oEntry.area = content[8].getValue();
	      oEntry.seqno = content[10].getValue();
	      oEntry.eStatus = content[12].getValue();
		  oEntry.iconClass = content[14].getValue();
		  
		  var list = sap.ui.getCore().byId("listId1");
			var sItem = list.getSelectedItem();
			var oBindingcontext = sItem.getBindingContext('Apps');
			var sPath = oBindingcontext.sPath; 
			var item = sap.ui.getCore().byId("app").getModel('Apps').getProperty(sPath);
			
//			 var start = sPath.lastIndexOf("/") + 1;    
//			  var i = sPath.substring(start, sPath.length);
//			    //  console.log(appIndex);
////			console.log(item);			
//		//	var array = list.getModel("Apps").getData().collection;
////			console.log(array);
//		//	array[i] = item;
//			  var oModel = sap.ui.getCore().byId("app").getModel('Apps');
//				var oData = oModel.getData();
//				oData.collection[i] = item;
//				oModel.setData(oData);
//		//	sap.ui.getCore().byId("app").getModel('Apps').getData().collection[i];
//			array.setData( array.indexOf(item), 1 );  
//	    //	list.getModel("Apps").refresh();  
			
	},
	
	//edit dialog close
	Close : function() {

		sap.ui.getCore().byId("editDialog").close();

	},
	
	//delete method
    Delete:function(oEvent)	{
    	
    	var oList =sap.ui.getCore().byId("listId1");
    	
        var sItem = oList.getSelectedItem();
		
		var oBindingcontext = sItem.getBindingContext('Apps');
		
	    var sPath = oBindingcontext.sPath;         //  /collection/1
			
		var item = sap.ui.getCore().byId("app").getModel('Apps').getProperty(sPath);
		console.log(item);
		
		var array = oList.getModel("Apps").getData().collection;
		console.log(array);
		
		array.splice( array.indexOf(item), 1 );  
    	oList.getModel("Apps").refresh();  
	     
    	sap.m.MessageBox.alert(
        "App deleted");
    	
	  }

});