jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 ForecastTop3 in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"myns/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"myns/test/integration/pages/App",
	"myns/test/integration/pages/Browser",
	"myns/test/integration/pages/Master",
	"myns/test/integration/pages/Detail",
	"myns/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "myns.view."
	});

	sap.ui.require([
		"myns/test/integration/MasterJourney",
		"myns/test/integration/NavigationJourney",
		"myns/test/integration/NotFoundJourney",
		"myns/test/integration/BusyJourney",
		"myns/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});