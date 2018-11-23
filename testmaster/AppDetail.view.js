sap.ui.jsview("testmaster.AppDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf testmaster.AppDetail
	*/ 
	getControllerName : function() {
		return "testmaster.AppDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf testmaster.AppDetail
	*/ 
	createContent : function(oController) {
		var oSimpleForm = new sap.ui.layout.form.SimpleForm("sf1",{				
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
	        minWidth: 1024,
		    maxContainerCols: 2,
		    editable: false,
//		    layout: ResponsiveGridLayout,
		    title: "App Details",
		    labelSpanL: 3,
		    labelSpanM: 3,
		    emptySpanL: 4,
		    emptySpanM: 4,
		    columnsL:   1,
		    columnsM:   1,
		   
			
			content:[                        
                 new sap.m.Label({text :'App'}),
				 new sap.m.Text({text: "{Apps>App}"}),        				
				 new sap.m.Label({text :'Description'}),
				 new sap.m.Text({text: "{Apps>description}"}),
				 new sap.m.Label({text :'Module'}),
				 new sap.m.Text({text: "{Apps>module}"}),
				 new sap.m.Label({text :'Area'}),
				 new sap.m.Text({text: "{Apps>area}"}),
				 new sap.m.Label({text :'SeqNo'}),
				 new sap.m.Text({text: "{Apps>seqno}"}),
				 new sap.m.Label({text :'eStatus'}),
				 new sap.m.Text({text: "{Apps>eStatus}"}),
				 new sap.m.Label({text :'iconClass'}),
				 new sap.m.Text({text: "{Apps>iConClass}"})
			 ]

		});

// console.log("{Apps>App}");
//  var oVBox = new sap.m.VBox({
//	                   items : [oSimpleForm],
//                       class:"sapUiSmallMargin"
//                             });
  
       //Create a panel instance
  var oPanel = new sap.m.Panel({
	  content: [oSimpleForm]
  });
 

  
// Edit button	
var btn1 = new sap.m.Button({			
			icon : "sap-icon://edit",
		//	text: "Edit",
			press: function (evt) { 
	//			sap.ui.getCore().byId("editDialog").open();
				oController.editPress(evt);
			}

});
  
//edit form starts here
    
    var editForm = new sap.ui.layout.form.SimpleForm(
			'formId2', {
				maxContainerCols : 2,
				editable : true,
				
				content : [                        
				              new sap.ui.core.Title({text:"App Details"}),
				              new sap.m.Label({text:"App Name"}), 
				              new sap.m.Input({value: "{Apps>App}"}),						             
				              new sap.m.Label({text:"App Description"}),
				              new sap.m.Input({value: "{Apps>description}"}),
				              new sap.m.Label({text:"Module"}),
				              new sap.m.Input({value: "{Apps>module}"}),
				              new sap.m.Label({text:"Area"}),
				              new sap.m.Input({value: "{Apps>area}"}),
				              new sap.m.Label({text:"Sequence No."}),
				              new sap.m.Input({value: "{Apps>seqno}"}),
				              new sap.m.Label({text:"Status"}),
				              new sap.m.Input({value: "{Apps>eStatus}"}),
				              new sap.m.Label({text:"Icon"}),
				              new sap.m.Input({value: "{Apps>iConClass}"}),
				                            
				     ]

			});

	var oButton4 = new sap.m.Button("update", {
		text : "Update",
		tap : [ oController.Update, oController ]
	});

	var oButton5 = new sap.m.Button("Close", {
		text : "Close",
		tap : [ oController.Close, oController ]

	});

	var editDialog = new sap.m.Dialog("editDialog", {
		title : "Edit App",
		modal : true,
		contentWidth : "1em",
		visible : false,
		buttons : [ oButton4, oButton5 ],
		content : [editForm]
	});

	// delete button
	var btn2 = new sap.m.Button({			
			icon : "sap-icon://delete",
		//	text: "Delete",
			press: function(oEvent) {oController.Delete(oEvent); }
    });			                
		     
	  return new sap.m.Page({
	             title: "App Details",
	     //      showHeader: false,
	             content: [oPanel, editDialog],           //[oVBox],
	             footer :new sap.m.Bar({contentRight : [btn1, btn2]}),
		          							
});
}


});