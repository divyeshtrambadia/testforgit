sap.ui.controller("testmaster.Profile", {
    goBack: function () {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo(oStorage.get('EDASHBOARD'));
    },
    Update: function () {
//       // var content = sap.ui.getCore().byId("F1").getContent();
//        var oEntry = {}; 
//        var v1= $('#_input0-inner').val();
//        console.log(v1);
////        oEntry.vLanguage = content[1].getValue();        
////        oEntry.Dasboard = content[3].getSelectedKey();
////        oEntry.PopWindow = content[5].getSelectedKey();        
////        oEntry.HouseNo = content[7].getValue();
////        console.log(oEntry.HouseNo);
////        oEntry.Street = content[9].getValue();
////        oEntry.City = content[11].getValue();
////        oEntry.PostalCode = content[13].getValue();
////        oEntry.State = content[15].getValue();
////        oEntry.Country = content[17].getValue();
//        oEntry.UploadImage = $('#vEditImage-inner').val();   //content[19].getValue();
        var oEntry = {};
        oEntry.vLanguage = sap.ui.getCore().byId("FR1").getValue()
        oEntry.eDashboard = sap.ui.getCore().byId("FR2").getSelectedKey();
        //  console.log(oEntry.Dasboard);
        oEntry.ePopWindow = sap.ui.getCore().byId("FR3").getSelectedKey();
        oEntry.HouseNo = sap.ui.getCore().byId("FR4").getValue();
        oEntry.Street = sap.ui.getCore().byId("FR5").getValue();
        oEntry.City = sap.ui.getCore().byId("FR6").getValue();
        oEntry.PostalCode = sap.ui.getCore().byId("FR7").getValue();
        oEntry.State = sap.ui.getCore().byId("FR8").getValue();
        oEntry.Country = sap.ui.getCore().byId("FR9").getValue();
        oEntry.SocialMediaType = sap.ui.getCore().byId("FR11").getSelectedKey();
        oEntry.SocialMediaAccountID = sap.ui.getCore().byId("FR12").getValue();
//        oEntry.UploadImage = sap.ui.getCore().byId("vEditImage").getValue();
        if ($('#vEditImage-inner').val() != '') {
            oEntry.vImage = $('#vEditImage-inner').val();
        }
        var imagepath = oStorage.get("USERIMAGEURL");
        var lastindex = imagepath.substr(imagepath.lastIndexOf("\/"));
        imagepath = imagepath.replace(lastindex, "");

        $.ajax({
            url: oStorage.get('BASEURL') + 'updateuserprofile.php',
            type: 'GET',
            data: {
                USERID: oStorage.get('USERID'),
                UserRole: oStorage.get('ROLE'),
                data: oEntry,
                sessionvalue: localStorage.getItem('SESSIONVALUE'),
            },
            success: function (configresponse) {
                if ($('#vEditImage-inner').val() != '') {
                    oEntry.vImage = $('#vEditImage-inner').val();
                    oEntry.vImage = imagepath + "/" + oEntry.vImage;
                }
                if ($('#vEditImage-inner').val() == '') {
                    oEntry.vImage = sap.ui.getCore().byId("app").getModel("Users").oData.vImage;
                }
                var socailaccount = sap.ui.getCore().byId("app").getModel("Users").oData;
                if (socailaccount.SocialAccount != undefined) {
                    $.each(socailaccount.SocialAccount, function (key, value) {
                        if (value.SocialMediaType == sap.ui.getCore().byId("FR11").getSelectedKey()) {
                            socailaccount.SocialAccount[key]['SocialMediaType'] = sap.ui.getCore().byId("FR11").getSelectedKey();
                            socailaccount.SocialAccount[key]['SocialMediaAccountID'] = sap.ui.getCore().byId("FR12").getValue();
                        } else {

                        }
                    });
                    oEntry.SocialAccount = socailaccount.SocialAccount;
                } else if (socailaccount.SocialAccount == "") {
                    socailaccount.SocialAccount[0]['SocialMediaType'] = sap.ui.getCore().byId("FR11").getSelectedKey();
                    socailaccount.SocialAccount[0]['SocialMediaAccountID'] = sap.ui.getCore().byId("FR12").getValue();
                    oEntry.SocialAccount = socailaccount.SocialAccount;

                }
                sap.ui.getCore().byId("app").getModel("Users").oData = null;
                sap.ui.getCore().byId("app").getModel("Users").oData = oEntry;
                sap.ui.getCore().byId("app").getModel('Users').refresh(true);
                $('#vEditImage-inner').val('');
                var oInput1 = sap.ui.getCore().byId("FR10");
                oInput1.setValue("");
                // sap.ui.getCore().byId("editDialog01").close();
                sap.m.MessageToast.show("User's profile edited successfully..", {duration: 3000});
            }, error: function (configresponse) {
                if (configresponse.session === "expired") {
                    sap.m.MessageToast.show("There some problem,Please login again..");
                    setTimeout(function () {
                        location.assign(oStorage.get('GOBACK'));
                    }, 3000);
                } else {
                    $('#vEditImage-inner').val('');
                    var oInput1 = sap.ui.getCore().byId("FR10");
                    oInput1.setValue("");
//                sap.ui.getCore().byId("FR12").setValue("");
//                sap.ui.getCore().byId("FR11").setSelectedKey("");
                    //                sap.ui.getCore().byId("editDialog01").close();
                    sap.m.MessageToast.show("User's profile edited not successfully..", {duration: 3000});
                }
            }
        });
//		 console.log(oEntry);		 
//		var model = sap.ui.getCore().byId("app").getModel("Users")
////           console.log(model);
//        sap.ui.getCore().byId("app").getModel("Users").oData = oEntry;
//        sap.ui.getCore().byId("app").getModel('Users').refresh(true);
//        sap.m.MessageToast.show("User's profile edited successfully..", {duration: 3000});

        var EDASHBOARD = oEntry.Dasboard;
        var router = sap.ui.core.UIComponent.getRouterFor(this);

        router.navTo(oStorage.get('EDASHBOARD'));

    },
    Close: function () {
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo(oStorage.get('EDASHBOARD'));
    },
});