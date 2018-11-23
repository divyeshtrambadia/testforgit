sap.ui.jsview("testmaster.AppMaster", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf testmaster.AppMaster
	*/ 
	getControllerName : function() {
		return "testmaster.AppMaster";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf testmaster.AppMaster
	*/ 
	createContent : function(oController) {
		//Search field	
		var sf = new sap.m.SearchField({
            placeholder: "Search",
            showRefreshButton: true,
            class:"sapUiSmallMargin",
            liveChange: oController.PR_Search,
            search: oController.PR_Search,
            tooltip: "Search for objects..",
        });
		
// List	start here
		var oList = new sap.m.List({
			    id: "listId1",
				mode: sap.m.ListMode.SingleSelectMaster,
				class:"sapMH4FontSize", 
				select: function() {
					oController.itemSelected();
				},
			
			});
		 var oItemTemplate = new sap.m.ObjectListItem({
			id: "sList1",
			title: "{Apps>App}",
			number : "{Apps>seqno}",
			attributes : [new sap.m.ObjectAttribute({
				              text : "{Apps>description}"
			                 })   
		                            ],
			 firstStatus : new sap.m.ObjectStatus({
                 text : "{Apps>eStatus}"
                	 
             }),
	
		});
	//	oList.bindAggregation("items","Apps>/collection",oItemTemplate);
		oList.bindItems({
			         path: "Apps>/collection",
			         footer :new sap.m.Bar({contentRight : [btn]}),
			         template: oItemTemplate
		         });
		
 // Add button
		 var btn = new sap.m.Button({			
					icon : "sap-icon://add",
				//	text: "Add",
					press : function() {
						addDialog.setVisible(true);
						sap.ui.getCore().byId("addDialog").open();
						
					}
         });
		 
  //Add form starts here
	        
	        var addForm = new sap.ui.layout.form.SimpleForm(
					'formId1', {
						maxContainerCols : 2,
						editable : true,
						content : [                        
						              new sap.ui.core.Title({text:"App Details"}),
						              new sap.m.Label({text:"App Name"}),
						              new sap.m.Input({value:""}),
						              new sap.m.Label({text:"App Description"}),
						              new sap.m.Input({value:""}),
						              new sap.m.Label({text:"Module"}),
						              new sap.m.Input({value:""}),
						              new sap.m.Label({text:"Area"}),
						              new sap.m.Input({value:""}),
						              new sap.m.Label({text:"Sequence No."}),
						              new sap.m.Input({value:""}),
						              new sap.m.Label({text:"Status"}),
						              new sap.m.Input({value:""}),
//						              new sap.m.Select({
//						            	  items: [
//						                    new sap.ui.core.Item({text: "Active"}) ,
//						                    new sap.ui.core.Item({text: "InActive"})
//						                 ]
//						              }),
						              new sap.m.Label({text:"Icon"}),
						              new sap.m.Input({value:""}),
						                            
						     ]

					});

			var oButton2 = new sap.m.Button("Save", {
				text : "Save",
				tap : [ oController.save, oController ]
			});

			var oButton3 = new sap.m.Button("Cancel", {
				text : "Cancel",
				tap : [ oController.cancel, oController ]

			});

			var addDialog = new sap.m.Dialog("addDialog", {
				title : "Add new app",
				modal : true,
				contentWidth : "1em",
				visible : false,
				buttons : [ oButton2, oButton3 ],
				content : [addForm]
			});

//	// delete button
//			var btn2 = new sap.m.Button({			
//					icon : "sap-icon://delete",
//				//	text: "Delete",
//					press: function(oEvent) {oController.Delete(oEvent); }
//         });
					
 		return new sap.m.Page({
			title: "AppNames",
			footer :new sap.m.Bar({contentRight : [btn]}),
			content: [sf, oList, addDialog]
		});
	}


});