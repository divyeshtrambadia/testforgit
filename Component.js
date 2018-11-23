jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.declare("sap.testmaster.Component");

sap.ui.core.UIComponent.extend("sap.testmaster.Component", {
    metadata: {
        routing: {
            config: {
                viewType: "JS",
                viewPath: "testmaster",
                controlId: "MainApp",
                controlAggregation: "pages",
                //   clearTarget: false,
                async: true,
                transition: "slide"
            },
            routes: [
                {
                    pattern: "",
                    name: "login", // pattern name
                    view: "login"   //viewname
                },
                {
                    pattern: "Classic",
                    name: "Classic", // pattern name given in login controller
                    view: "Admin"         //view name
                },
                {
                    pattern: "Role",
                    name: "Role",
                    view: "Role"
                },
                {
                    pattern: "Chatbot",
                    name: "Chatbot",
                    view: "Chatbot"
                },
                {
                    pattern: "New",
                    name: "New", // pattern name given in login controller
                    view: "newtile"         //view name
                },
                {
                    pattern: "profile",
                    name: "profile", // pattern name given in newtile/admin controller
                    view: "Profile"         //view name
                },
                {
                    pattern: "return",
                    name: "return", // pattern name given in newtile/admin controller

                    view: "return"         //view name

                },
                {
                    pattern: "changePW",
                    name: "changePW", // pattern name given in newtile/admin controller

                    view: "PasswordChange"         //view name

                },
                {
                    pattern: "forgotPW",
                    name: "forgotPW", // pattern name given in login controller

                    view: "ForgotPassword"         //view name

                },
                {
                    pattern: "userdefaults",
                    name: "splitApp",
                    view: "userdefault",
                    subroutes: [
                        {
                            pattern: "userdefaults",
                            name: "userdefaultmaster",
                            view: "userdefaultMaster",
                            controlAggregation: "masterPages",
                            controlId: "splitApp", // id of splitapp which we have given in splitapp view

                            preservePageInSplitContainer: true,
                            subroutes: [
                                {
                                    pattern: "userdefaults/{appIndex}", //

                                    name: "userdefaultdetail",
                                    view: "userdefaultDetail",
                                    targetControl: "splitApp", // id of splitapp which we have given in splitapp view

                                    targetAggregation: "detailPages"

                                }

                            ]

                        }

                    ]

                },
                {
                    pattern: "favourit",
                    name: "splitAppfavourit",
                    view: "favourit",
                    subroutes: [
                        {
                            pattern: "favourit",
                            name: "favouritmaster",
                            view: "favouritMaster",
                            controlAggregation: "masterPages",
                            controlId: "splitAppfavourit", // id of splitapp which we have given in splitapp view

                            preservePageInSplitContainer: true,
                            subroutes: [
                                {
                                    pattern: "favourit/{appIndex}", //

                                    name: "favouritdetail",
                                    view: "favouritDetail",
                                    targetControl: "splitAppfavourit", // id of splitapp which we have given in splitapp view

                                    targetAggregation: "detailPages"

                                }

                            ]

                        }

                    ]

                },
            ],
        }

    },
    init: function () {



        jQuery.sap.require("sap.ui.core.routing.History");  // for navigation

        jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

        jQuery.sap.require("sap.ui.core.routing.HashChanger");



        // call create content

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        this._router = this.getRouter();



        //initialize router

        this._routeHandler = new sap.m.routing.RouteMatchedHandler(this._router);

        this._router.initialize();
        var sessionnew = getsessiontime();
        localStorage.setItem('SESSIONVALUE', sessionnew);
    },
    createContent: function () {

        var oView = sap.ui.view('app', {
            id: "app", // id for this view

            viewName: "testmaster.Main", // view name of main app

            type: "JS",
            viewData: {component: this}

        });



        return oView;

    }





});