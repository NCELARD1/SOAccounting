jQuery.sap.declare("test.Component");
sap.ui.getCore().loadLibrary("sap.ui.generic.app");
jQuery.sap.require("sap.ui.generic.app.AppComponent");

sap.ui.generic.app.AppComponent.extend("test.Component", {
	metadata: {
		"manifest": "json"
	}
});