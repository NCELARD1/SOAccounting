jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"com/nico/test/integration/NavigationJourneyPhone",
		"com/nico/test/integration/NotFoundJourneyPhone",
		"com/nico/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});