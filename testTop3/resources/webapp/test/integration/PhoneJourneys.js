jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"myns/test/integration/NavigationJourneyPhone",
		"myns/test/integration/NotFoundJourneyPhone",
		"myns/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});