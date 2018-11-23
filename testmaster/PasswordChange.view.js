sap.ui.jsview("testmaster.PasswordChange", {
    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf testmaster.PasswordChange
     */
    getControllerName: function() {
        return "testmaster.PasswordChange";
    },
    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf testmaster.PasswordChange
     */
    createContent: function(oController) {
        var oLanguageModel = sap.ui.getCore().getModel("oLanguageModel").oData;
        var oPanel1 = new sap.m.Panel("panel02", {
//            headerText: "Change Password",
            headerText: oLanguageModel.ChangePassword,
            width: "400px",
            content: [
//                new sap.m.Title({text: "Old Password"}),
                new sap.m.Title({text: oLanguageModel.OldPasssword}),
                new sap.m.Input("ip02a", {
                    value: "",
//                    tooltip: "Enter Old Password",
                    tooltip: oLanguageModel.EnterOldPassword,
//                    placeholder: "Enter Old Password"
                    placeholder: oLanguageModel.EnterOldPassword
                }),
//                new sap.m.Title({text: "New Password"}),
                new sap.m.Title({text: oLanguageModel.NewPassword}),
                new sap.m.Input("ip02b", {
                    value: "",
                    tooltip: oLanguageModel.EnterNewPassword,
                    placeholder: oLanguageModel.EnterNewPassword
                }),
                new sap.m.Button("submit02", {
                    text: oLanguageModel.Submit,
                    tap: [oController.Submit, oController]
                })
            ]
        });
        var oPanel = new sap.m.Panel("PasswordChangemainpanel", {content: [new sap.m.Panel("PasswordChange", {
                    headerText: oLanguageModel.ChangePassword,
                    width: "100%",
                    height: "100%",
                    content: [
                        new sap.m.Panel("PasswordChangeinputpanel", {content: [
                                new sap.m.Panel("PasswordChangeinputpanelinner", {content: [
                                        new sap.m.Title({text: "New Password"}).addStyleClass("Password"),
                                        new sap.m.Input("newpsw", {
                                            value: "",
                                            type: sap.m.InputType.Password,
                                            tooltip: "Enter New Password",
                                            placeholder: "Enter New Password"
                                        }).addStyleClass("Passwords"),
                                        new sap.m.Title({text: "Confirm Password"}).addStyleClass("Password"),
                                        new sap.m.Input("cnfpsw", {
                                            value: "",
                                            type: sap.m.InputType.Password,
                                            tooltip: "",
                                            placeholder: "Confirm Password"
                                        }).addStyleClass("Passwords"),
                                    ]})
                            ]}),
                        new sap.m.Panel("PasswordChangebtnpanel", {
                            width: "100%",
                            height: "100%",
                            content: [
                                new sap.m.Button("submit03", {
                                    text: "Submit",
                                    tap: [oController.Submit, oController]
                                }).addStyleClass("loginbtn"),
                                  new sap.m.Button(this.createId("clr"), {
                                    text: "Clear",
                                    press: [oController.onClear, oController]
                                }).addStyleClass('clrBTN'),
                            ]}),
                    ]
                }
                )]});
        
        var oFlexBox = new sap.m.FlexBox({
            height: "100%",
            width: "100%",
            justifyContent: sap.m.FlexJustifyContent.SpaceAround,
            alignItems: sap.m.FlexAlignItems.Center,
            direction: sap.m.FlexDirection.Column,
            items: [oPanel]
        });

        return new sap.m.Page('PasswordChangepage', {
            showNavButton: true,
            navButtonPress: function() {
                oController.goBack()
            },
            content: [oFlexBox]
        });
    }


});