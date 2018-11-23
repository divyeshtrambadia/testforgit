sap.ui.jsview("testmaster.Profile", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf testmaster.Profile
     */
    getControllerName: function () {
        return "testmaster.Profile";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf testmaster.Profile
     */
    createContent: function (oController) {
        var oLayout1 = new sap.ui.layout.form.GridLayout();
        var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
        var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();

        var oForm1 = new sap.ui.layout.form.Form("F1", {
            //title: new sap.ui.core.Title({text: "Profile", tooltip: "Title tooltip"}),
            //title: new sap.m.Title({text: "Profile", tooltip: "Title tooltip"}),
            editable: true,
            layout: oLayout3,
            formContainers: [
                new sap.ui.layout.form.FormContainer("F1C1", {
                    title: "General",
                    formElements: [
                        new sap.ui.layout.form.FormElement("F1E1", {
                            label: "Language",
                            fields: [
                                new sap.m.Input("FR1", {
                                    value: "{Users>/vLanguage}", //"Hindi",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Dashboard",
                            fields: [
                                new sap.m.Select({
                                    id: "FR2",
                                    selectedKey: "{Users>/Dashboard}", // "{Users>Dashboard}",
                                    items: [
                                        new sap.ui.core.Item({key: "New", text: "New"}),
                                        new sap.ui.core.Item({key: "Classic", text: "Classic"}),
                                    ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "PopWindow",
                            fields: [
                                new sap.m.Select({
                                    id: "FR3",
                                    selectedKey: "{Users>/PopWindow}",
                                    items: [
                                        new sap.ui.core.Item({key: "ON", text: "ON"}),
                                        new sap.ui.core.Item({key: "OFF", text: "OFF"}),
                                    ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),

                new sap.ui.layout.form.FormContainer("F1C2", {
                    title: "Address",
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "HouseNo",
                            fields: [
                                new sap.m.Input("FR4", {
                                    value: "{Users>/HouseNo}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Street",
                            fields: [
                                new sap.m.Input("FR5", {
                                    value: "{Users>/Street}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "City",
                            fields: [
                                new sap.m.Input("FR6", {
                                    value: "{Users>/City}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "PostalCode",
                            fields: [
                                new sap.m.Input("FR7", {
                                    value: "{Users>/PostalCode}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "State",
                            fields: [
                                new sap.m.Input("FR8", {
                                    value: "{Users>/State}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Country",
                            fields: [
                                new sap.m.Input("FR9", {
                                    value: "{Users>/Country}",
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),

                new sap.ui.layout.form.FormContainer("F1C3", {
                    title: "Image",
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "UploadImage",
                            fields: [
                                new sap.ui.unified.FileUploader('FR10', {
                                    uploadUrl: oStorage.get("BASEURL") + "uploaduserimage.php",
                                    name: "image",
                                    additionalData: 'string',
                                    uploadOnChange: true,
                                    useMultipart: false,
                                    placeholder: "Choose a file for Upload...",
                                    style: "Emphasized",
                                    fileType: ["jpg", "png"],
                                    multiple: false,
                                    uploadComplete: function (oEvent) {
                                        var sResponse = oEvent.getParameter("response");
                                        if (sResponse) {
                                            $('#vEditImage-inner').val(sResponse);
                                        }
                                    },
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Image",
                            fields: [
                                new sap.m.Input({
                                    id: "vEditImage",
                                    value: "{Users>/UploadImage}",
                                    enabled: false,
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
                                })
                            ],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        })
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                            new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                            new sap.ui.layout.GridData({linebreakL: false})]
                    })
                }),
//				new sap.ui.layout.form.FormContainer("F1C4",{
//					//title: "General",
//					formElements: [
//						new sap.ui.layout.form.FormElement({
//							label: "",
//							fields: [
//							  new sap.m.Button("updatep1", {
//	                                                text: "Update",
//	                                              //  width: "10em",
//	                                                tap: [oController.Update, oController],
//													layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
//	                          }),
//							new sap.m.Button("Closep1", {
//	                                             text: "Close",
//	                                            // width: "10em",
//	                                             tap: [oController.Close, oController],
//												 layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})
//
//	                            })
//							],
//							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
//						})
//						
//					       ],
//					layoutData: new sap.ui.core.VariantLayoutData({
//					    multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true}),
//					                     new sap.ui.layout.GridData({linebreakL: true, span: "L6 M6 S4"})
//					    	]
//						
//						})
//				}),    //till here

            ]
        });




//	// tab method	
//		//var OP1 = new sap.m.Panel("opa", { 
//			var OP1 = new sap.m.ScrollContainer("opa", {
//			width: "600px",
//            content: [
//            	new sap.m.Title({text: "Language"}),
//                new sap.m.Input("ip9", {value: "{Users>vLanguage}"}),
////              new sap.m.Select({
////              id: "ip9",
////              selectedKey: "{Users>vLanguage}",
////          }).bindAggregation("items", "Language>/collection",
////                  new sap.ui.core.Item({text: "{Language>Name}", key: "{Language>Name}"
////                  })),
//                new sap.m.Title({text: "Dashboard"}),
//                new sap.m.Select({
//                    id: "ip24",
//                    selectedKey: "{Users>Dashboard}",
//                    items: [
//                        new sap.ui.core.Item({key: "New", text: "New"}),
//                        new sap.ui.core.Item({key: "Classic", text: "Classic"}),
//                    ]
//                }),
//                new sap.m.Title({text: "PopWindow"}),
//                new sap.m.Select({
//                    id: "ip25",
//                    selectedKey: "{Users>PopWindow}",
//                    items: [
//                        new sap.ui.core.Item({key: "ON", text: "ON"}),
//                        new sap.ui.core.Item({key: "OFF", text: "OFF"}),
//                    ]
//                })
//            ]
//        });
//		
//		//var OP2 = new sap.m.Panel("opb", { 
//			var OP2 = new sap.m.ScrollContainer("opb", {
//			width: "600px",
//            content: [
//            	 new sap.m.Label({text: "HouseNo"}),
//                 new sap.m.Input("ip10", {value: "{Users>HouseNo}"}),
//                 new sap.m.Label({text: "Street"}),
//                 new sap.m.Input("ip11", {value: "{Users>Street}"}),
//                 new sap.m.Label({text: "City"}),
//                 new sap.m.Input("ip12", {value: "{Users>City}"}),
//                 new sap.m.Label({text: "PostalCode"}),
//                 new sap.m.Input("ip13", {value: "{Users>PostalCode}"}),
//                 new sap.m.Label({text: "State"}),
//                 new sap.m.Input("ip14", {value: "{Users>State}"}),
//                 new sap.m.Label({text: "Country"}),
//                 new sap.m.Input("ip15", {value: "{Users>Country}"})
//            ]
//        });
//		
//		var OP3 = new sap.m.Panel("opc", { 
//			width: "400px",
//            content: [
//            	new sap.m.Label({text: "UploadImage"}),
//                new sap.ui.unified.FileUploader('ip23', {
//                    uploadUrl: oStorage.get("BASEURL") + "uploaduserimage.php",
//                    name: "image",
//                    additionalData: 'string',
//                    uploadOnChange: true,
//                    useMultipart: false,
//                    placeholder: "Choose a file for Upload...",
//                    style: "Emphasized",
//                    fileType: ["jpg", "png"],
//                    multiple: false,
//                    uploadComplete: function (oEvent) {
//                        var sResponse = oEvent.getParameter("response");
//                        if (sResponse) {
//                            $('#vEditImage-inner').val(sResponse);
//                        }
//                    }
//                }),
//                new sap.m.Label({text: "Image", }).addStyleClass('imageUpload'),
//                new sap.m.Input("vEditImage", {value: "", enabled: false}).addStyleClass('imageUpload'),
//            ]
//        });
//        
//		// Tab Bar	
//        var oIt1 = new sap.m.IconTabFilter("one", {
//            icon: "sap-icon://target-group",
//            text: "General",
//            Key: "tab1",
//            content: [OP1]
//        });
//        var oIt2 = new sap.m.IconTabFilter("two", {
//            icon: "sap-icon://expand-group",
//            text: "Address",
//            content: [OP2]
//        });
//        var oIt3 = new sap.m.IconTabFilter("three", {
//            icon: "sap-icon://wrench",
//            text: "Image",
//            content: [OP3]
//        });
//		var oITB = new sap.m.IconTabBar({
//            id: "idIconTabBarNoIcons",
//            items: [oIt1, oIt2, oIt3]
//        });


        // normal form on screen	
//		 var Form = new sap.ui.layout.form.SimpleForm(
//	                'formIdp2', {
//	                    maxContainerCols: 2,
//	                    editable: true,
//	                    content: [
//	                    	new sap.m.Label({text: "Language"}),
//	                        new sap.m.Input("ip9", {value: "{Users>vLanguage}"}),
////	                      new sap.m.Select({
////	                      id: "ip9",
////	                      selectedKey: "{Users>vLanguage}",
////	                  }).bindAggregation("items", "Language>/collection",
////	                          new sap.ui.core.Item({text: "{Language>Name}", key: "{Language>Name}"
////	                          })),
//	                        new sap.m.Label({text: "HouseNo"}),
//	                        new sap.m.Input("ip10", {value: "{Users>HouseNo}"}),
//	                        new sap.m.Label({text: "Street"}),
//	                        new sap.m.Input("ip11", {value: "{Users>Street}"}),
//	                        new sap.m.Label({text: "City"}),
//	                        new sap.m.Input("ip12", {value: "{Users>City}"}),
//	                        new sap.m.Label({text: "PostalCode"}),
//	                        new sap.m.Input("ip13", {value: "{Users>PostalCode}"}),
//	                        new sap.m.Label({text: "State"}),
//	                        new sap.m.Input("ip14", {value: "{Users>State}"}),
//	                        new sap.m.Label({text: "Country"}),
//	                        new sap.m.Input("ip15", {value: "{Users>Country}"}),                
//	                        new sap.m.Label({text: "UploadImage"}),
//	                        new sap.ui.unified.FileUploader('ip23', {
//	                          //  uploadUrl: oStorage.get("BASEURL") + "uploaduserimage.php",
//	                            name: "image",
//	                            additionalData: 'string',
//	                            uploadOnChange: true,
//	                            useMultipart: false,
//	                            placeholder: "Choose a file for Upload...",
//	                            style: "Emphasized",
//	                            fileType: ["jpg", "png"],
//	                            multiple: false,
//	                            uploadComplete: function (oEvent) {
//	                                var sResponse = oEvent.getParameter("response");
//	                                if (sResponse) {
//	                                    $('#vEditImage-inner').val(sResponse);
//	                                }
//	                            }
//	                        }),
//	                        new sap.m.Label({text: "Image", }).addStyleClass('imageUpload'),
//	                        new sap.m.Input("vEditImage", {value: "", enabled: false}).addStyleClass('imageUpload'),
//	                        new sap.m.Label({text: "Dashboard"}),
//	                        new sap.m.Select({
//	                            id: "ip24",
//	                            selectedKey: "{Users>Dashboard}",
//	                            items: [
//	                                new sap.ui.core.Item({key: "New", text: "New"}),
//	                                new sap.ui.core.Item({key: "Classic", text: "Classic"}),
//	                            ]
//	                        }),
//	                        new sap.m.Label({text: "PopWindow"}),
//	                        new sap.m.Select({
//	                            id: "ip25",
//	                            selectedKey: "{Users>PopWindow}",
//	                            items: [
//	                                new sap.ui.core.Item({key: "ON", text: "ON"}),
//	                                new sap.ui.core.Item({key: "OFF", text: "OFF"}),
//	                            ]
//	                        }),
//	                    ]
//	                });
        var oButton1 = new sap.m.Button("updatep1", {
            text: "Update",
            tap: [oController.Update, oController]
        });
        var oButton2 = new sap.m.Button("Closep1", {
            text: "Close",
            tap: [oController.Close, oController]

        });    //.addStyleClass('clrBTN');                            //.addStyleClass('clrBTN');

//	        var oPanel = new sap.m.Panel("panelP1", {
//                //  width: "400px",			
//	            //  content : [Form,oButton1, oButton2]
//	            // content : [ oITB,oButton1, oButton2]
//	                content : [ oForm1]    //,oButton1, oButton2
//	        });


//               var oFlexBox = new sap.m.FlexBox({
//                                    height: "100%",
//                                    width: "100%",
//                                    justifyContent: sap.m.FlexJustifyContent.SpaceAround,
//                                    alignItems: sap.m.FlexAlignItems.Center,
//                                    direction: sap.m.FlexDirection.Column,
//                                   // items: [oPanel]
//                                  //  items: [oITB,oButton1, oButton2]
//                                    items:[oForm1]
//                       });

        return new sap.m.Page('profilePage', {
            title: "Profile",
            showNavButton: true,
            navButtonPress: function () {
                oController.goBack()
            },
            footer: new sap.m.Bar({contentRight: [oButton1, oButton2]}),
            content: [oForm1]    //oFlexBox
        });
    }

});