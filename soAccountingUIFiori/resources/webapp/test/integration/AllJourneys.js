jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 CRM_CustomerList in the list
// * All 3 CRM_CustomerList have at least one CustomerOrders

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/nico/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/nico/test/integration/pages/App",
	"com/nico/test/integration/pages/Browser",
	"com/nico/test/integration/pages/Master",
	"com/nico/test/integration/pages/Detail",
	"com/nico/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.nico.view."
	});

	sap.ui.require([
		"com/nico/test/integration/MasterJourney",
		"com/nico/test/integration/NavigationJourney",
		"com/nico/test/integration/NotFoundJourney",
		"com/nico/test/integration/BusyJourney",
		"com/nico/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});