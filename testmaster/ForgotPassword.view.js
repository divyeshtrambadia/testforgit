sap.ui.jsview("testmaster.ForgotPassword", {
    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf testmaster.ForgotPassword
     */
    getControllerName: function () {
        return "testmaster.ForgotPassword";
    },
    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf testmaster.ForgotPassword
     */
    createContent: function (oController) {

        var oPanel1 = new sap.m.Panel("forgotpanel", {
            headerText: "Forgot Password",
            width: "520px",
            height: "436px",
            content: [
                new sap.m.Panel("forgotpanelinner", {
                    width: "472px",
                    height: "490px",
//                    width: "100%",
                    //  content : [Form,oButton1],
                    content: [
                        
                        new sap.m.Title ({text: "User ID "}),
                        new sap.m.Input("ip00", {
                            value: "",
                            tooltip: "Enter User ID",
                            placeholder: "User ID",
                            valueStateText: "User ID must not be empty.",
                            liveChange: function () {
                                if (this.getValue() === "")
                                    this.setValueState(sap.ui.core.ValueState.Error);
                                else
                                    this.setValueState(sap.ui.core.ValueState.Success);
                            }
                        }),
                        new sap.m.Title({text: "User Name / Email ID"}),
                        new sap.m.Input("ip01", {
                            value: "",
                            tooltip: "Enter User Name / Email ID",
                            placeholder: "User Name / Email ID",
                            valueStateText: "User Name / Email ID must not be empty.",
                            liveChange: function () {
                                if (this.getValue() === "")
                                    this.setValueState(sap.ui.core.ValueState.Error);
                                else
                                    this.setValueState(sap.ui.core.ValueState.Success);
                            }
                        }),
                        new sap.m.Button("submit01", {
                            text: "Submit",
                            tap: [oController.Submit, oController]
                        })
                    ]
                })
            ]});
        var oPanel = new sap.m.Panel("mainforgotpanel", {content: [new sap.m.Panel("forgotpanel", {
                    headerText: "Forgot Password",
                    width: "100%",
                    height: "100%",
                    content: [
                        new sap.m.Label("headertext", {text: "To reset password. please enter your registered Email ID."}),
                        new sap.m.Panel("forgotinputpanel", {content: [
                                new sap.m.Panel("forgotinputpanelinner", {content: [
                                        
                                        new sap.m.Title({text: "User ID"}).addStyleClass("Email-ID"),
                                        new sap.m.Input("UserID", {
                                            tooltip: "Enter User ID",
                                            placeholder: "User ID",
                                            liveChange: function () {
                                                if (this.getValue() === "")
                                                    this.setValueState(sap.ui.core.ValueState.Error);
                                                else
                                                    this.setValueState(sap.ui.core.ValueState.Success);
                                            }
                                        }).addStyleClass("Username"),
                                        
                                        
                                        new sap.m.Title({text: "User Name / Email ID"}).addStyleClass("Email-ID"),
                                        new sap.m.Input("forgotusername", {
                                            tooltip: "Enter User Name / Email ID",
                                            placeholder: "User Name / Email ID",
                                            liveChange: function () {
                                                if (this.getValue() === "")
                                                    this.setValueState(sap.ui.core.ValueState.Error);
                                                else
                                                    this.setValueState(sap.ui.core.ValueState.Success);
                                            }
                                        }).addStyleClass("Username"),
                                    ]})
                            ]}),
                        new sap.m.Panel("forgotbtnpanel", {
                            width: "100%",
                            height: "100%",
                            content: [
                                new sap.m.Button(this.createId("submitforgot"), {
                                    text: "Submit",
                                    press: [oController.Submit, oController]
                                }).addStyleClass("loginbtn"),
                                new sap.m.Button(this.createId("forgotclr"), {
                                    text: "Clear",
                                    press: [oController.onClear, oController]
                                }).addStyleClass('clrBTN'),
                            ]})
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
        return new sap.m.Page('forgotPassword', {
            //title: "ForgotPassword",
            showNavButton: true,
            navButtonPress: function () {
                oController.goBack()
            },
            //footer :new sap.m.Bar(),
            content: [oFlexBox]
        });
    }

});