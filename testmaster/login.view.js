sap.ui.jsview("testmaster.login", {
    getControllerName: function () {
        return "testmaster.login";
    },
    createContent: function (oController) {

        var oPanel = new sap.m.Panel("mainpanel", {content: [new sap.m.Panel("ologin", {
                    headerText: "Login",
                    width: "100%",
                    height: "100%",
                    content: [
                        new sap.m.Panel("inputpanel", {content: [
                                new sap.m.Panel("inputpanelinner", {content: [
                                        new sap.m.Title({text: "User Name / Email ID"}).addStyleClass("Email-ID"),
                                        new sap.m.Input(this.createId("username"), {
                                            tooltip: "Enter User Name / Email ID",
                                            placeholder: "User Name / Email ID"
                                        }).addStyleClass("Username"),
                                        new sap.m.Title({text: "Password"}).addStyleClass("Password"),
                                        new sap.m.Input(this.createId("inputPassword"), {
                                            type: sap.m.InputType.Password,
                                            placeholder: "Password"
                                        }).addStyleClass("Passwords"),
                                    ]})
                            ]}),
                        new sap.m.Panel("btnpanel", {
                            width: "100%",
                            height: "100%",
                            content: [
                                new sap.m.Button(this.createId("log"), {
                                    text: "Login",
                                    press: [oController.onLogin, oController]
                                }).addStyleClass("loginbtn"),
                                new sap.m.Button(this.createId("clr"), {
                                    text: "Clear",
                                    press: [oController.onClear, oController]
                                }).addStyleClass('clrBTN'),
                                new sap.m.Button(this.createId("fgt"), {
                                    text: "Forgot Password?",
                                    press: [oController.onForgot, oController]
                                }).addStyleClass('fgtLink'),
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
        return new sap.m.Page("loginpage", {
            title: "Welcome",
            content: [oFlexBox                                //oPanel

            ]
        });

    }
});

