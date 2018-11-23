sap.ui.controller("testmaster.Chatbot", {
    goBack: function () {

        var router = sap.ui.core.UIComponent.getRouterFor(this);

        router.navTo(oStorage.get('EDASHBOARD'));

    },
    ChangeSocialType: function (evt) {

        var oView = sap.ui.getCore().byId('app');
        $.ajax({
            url: oStorage.get("BASEURL") + "getchatbotuserdata_ws.php",
            dataType: 'json',
            type: 'Get',
            data: {
                Role: oStorage.get('ROLE'),
                UserID: oStorage.get('USERID'),
                SocialMediaType: oStorage.get('SOCIALMEDIATYPE'),
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (response) {
                sap.ui.getCore().byId('app').getModel("ChatbotModel").oData = response;
                sap.ui.getCore().byId("app").getModel('ChatbotModel').refresh(true);

            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        if (oStorage.get('LoginType') === "SocialMedia" || oStorage.get("LoginType") === "UserLogin") {
                            location.assign(oStorage.get('FRONTAPPURL1'));

                        } else {
                            location.assign(oStorage.get('FRONTAPPURL'));
                        }
                    }, 3000);
                }
            }
        });
    },
    Update: function () {

        var oEntry = {};
        oEntry.Role = oStorage.get('ROLE');
        oEntry.UserID = oStorage.get('USERID');
        oEntry.SocialMediaType = sap.ui.getCore().byId("SocialMediaType").getSelectedKey();
        var chatbotfileds = sap.ui.getCore().byId('app').getModel("ChatbotModel").oData.Fields;
        $.each(chatbotfileds, function (k, v) {
            if (sap.ui.getCore().byId(v) !== undefined) {

                oEntry[v] = sap.ui.getCore().byId(v).getValue();
            }
        });
        console.log(oEntry);

        $.ajax({
            url: oStorage.get('BASEURL') + 'updatechatbotuserprofile.php',
            type: 'GET',
            data: {
                data: oEntry,
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (configresponse) {

                sap.m.MessageToast.show("User's profile edited successfully..", {duration: 3000});
                $.ajax({
                    url: oStorage.get("BASEURL") + "getchatbotuserdata_ws.php",
                    dataType: 'json',
                    type: 'Get',
                    data: {
                        Role: oStorage.get('ROLE'),
                        UserID: oStorage.get('USERID'),
                        SocialMediaType: oEntry.SocialMediaType,
                        sessionvalue: localStorage.getItem('SESSIONVALUE'),
                    },
                    success: function (response) {
                        sap.ui.getCore().byId('app').getModel("ChatbotModel").oData = response;
                        sap.ui.getCore().byId("app").getModel('ChatbotModel').refresh(true);

                    }, error: function (configresponse) {
                        if (configresponse.session === "expired") {
                            sap.m.MessageToast.show("There some problem,Please login again..");
                            setTimeout(function () {
                                if (oStorage.get('LoginType') === "SocialMedia" || oStorage.get("LoginType") === "UserLogin") {
                                    location.assign(oStorage.get('FRONTAPPURL1'));

                                } else {
                                    location.assign(oStorage.get('FRONTAPPURL'));
                                }
                            }, 3000);
                        }
                    }
                })
            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        if (oStorage.get('LoginType') === "SocialMedia" || oStorage.get("LoginType") === "UserLogin") {
                            location.assign(oStorage.get('FRONTAPPURL1'));

                        } else {
                            location.assign(oStorage.get('FRONTAPPURL'));
                        }
                    }, 3000);
                }
            }

        });

    },
    Close: function () {

        var router = sap.ui.core.UIComponent.getRouterFor(this);

        router.navTo(oStorage.get('EDASHBOARD'));

    },
});