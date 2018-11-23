sap.ui.controller("testmaster.FirstLoginPasswordChange", {
    goBack: function() {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo(oStorage.get('EDASHBOARD'));
    },
    Submit: function() {
        var newPassword = sap.ui.getCore().byId("ip02a").getValue();
        var confirmPassword = sap.ui.getCore().byId("ip02b").getValue();
        var userid = oStorage.get('USERID');

        var router = sap.ui.core.UIComponent.getRouterFor(this);
        if (newPassword == '') {
            sap.m.MessageToast.show('Please Provide New Password');
        } else if (confirmPassword == '') {
            sap.m.MessageToast.show('Please Provide Confirm Password');
        } else if (newPassword != confirmPassword) {
            sap.m.MessageToast.show('New Password And Confirm Password should be same');
        } else {
            $.ajax({
                url: oStorage.get('BASEURL') + 'changepassword.php',
                dataType: 'jSon',
                type: 'GET',
                data: {
                    Userid: userid,
//                    oldPassword: oldPassword,
                    newPassword: newPassword

                },
                success: function(configresponse) {
//                if (configresponse.status == "1") {
//                    sap.m.MessageToast.show(configresponse.message);
//                } else 
                    if (configresponse.status == "2") {
                        sap.m.MessageToast.show(configresponse.message);
                    } else {
                        $.ajax({
                            url: oStorage.get('BASEURL') + 'tile_ws.php',
                            dataType: 'jSon',
                            type: 'GET',
                            data: {
                                USERROLE: oStorage.get('ROLE'),
                                USERID: userid,
                            },
                            success: function (tileresponse) {
                                var oModel1 = new sap.ui.model.json.JSONModel(tileresponse);
                                sap.ui.getCore().setModel(oModel1, 'oModel1');
                                sap.ui.getCore().setModel(tileresponse, 'oModel');
                                $.ajax({
                                    url: oStorage.get('BASEURL') + 'userdefault_ws.php', //http://52.36.91.176/smartphonebiz/action/wbser/tile_ws.php?USERROLE=Employee&USERID=RoshniG
                                    dataType: 'jSon',
                                    type: 'GET',
                                    data: {
                                        switchcase: 'getapprole',
                                        USERROLE: oStorage.get('ROLE') //configresponse.Role,
                                    },
                                    success: function (response) {
                                        sap.ui.getCore().byId("app").getModel("Apps").oData = response;
                                        sap.ui.getCore().byId("app").getModel('Apps').refresh(true);

                                var oModel1 = new sap.ui.model.json.JSONModel(response);
                                oModel1.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                                sap.ui.getCore().byId('app').setModel(oModel1, 'Apps');
                                    }
                                });

                                router.navTo(oStorage.get('EDASHBOARD'));
                                sap.m.MessageToast.show('Password Changed Successfully..');
                            }
                        });

                    }

                }
            });
        }
    }

});