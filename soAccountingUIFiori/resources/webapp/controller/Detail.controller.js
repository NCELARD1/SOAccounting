/*global location */
sap.ui.define([
	"com/nico/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"com/nico/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.nico.controller.Detail", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));

			var oLocalManualForecastData = {
				"ForecastID": 1,
				"ContractID": 1,
				"ItemID": 1,
				"Month": "April",
				"Probability": "HIGH",
				"DaysForecasted": 200,
				"ForecastDate": "2017-01-01"
			};
			this.oLocalManualForecastModel = new sap.ui.model.json.JSONModel(oLocalManualForecastData);
			this.getView().setModel(this.oLocalManualForecastModel, "manualForecast");

			var oLocalManualForecastFlatData = {
				"ForecastID": 1,
				"ContractID": 1,
				"ContractItemID": "1_1",
				"ItemID": 1,
				"ForecastDate": "2017-01-01",
				"JanHigh": 0,
				"FebHigh": 0,
				"MarHigh": 0,
				"AprHigh": 0,
				"MayHigh": 0,
				"JunHigh": 0,
				"JulHigh": 0,
				"AugHigh": 0,
				"SepHigh": 0,
				"OctHigh": 0,
				"NovHigh": 0,
				"DecHigh": 0,
				"JanMed": 0,
				"FebMed": 0,
				"MarMed": 0,
				"AprMed": 0,
				"MayMed": 0,
				"JunMed": 0,
				"JulMed": 0,
				"AugMed": 0,
				"SepMed": 0,
				"OctMed": 0,
				"NovMed": 0,
				"DecMed": 0,
				"JanLow": 0,
				"FebLow": 0,
				"MarLow": 0,
				"AprLow": 0,
				"MayLow": 0,
				"JunLow": 0,
				"JulLow": 0,
				"AugLow": 0,
				"SepLow": 0,
				"OctLow": 0,
				"NovLow": 0,
				"DecLow": 0
			};
			this.oLocalManualForecastFlatModel = new sap.ui.model.json.JSONModel(oLocalManualForecastFlatData);
			this.getView().setModel(this.oLocalManualForecastFlatModel, "manualForecastFlat");

			//			this.oTop3ForecastModel = new sap.ui.model.json.JSONModel("top3");
			//			this.oACIModel = new sap.ui.model.json.JSONModel();
			//		this.oACIModel = this.getOwnerComponent().getModel("ACI");
			//		var alpha = this.oACIModel.odata;

			//			this.getView().setModel(this.oTop3ForecastModel, "top3View");

			//			var oTable = this.getView().byId("DetailForecast");
			//			var bpModel = this.getOwnerComponent().getModel("bpModel");
			//			oTable.setModel(oTop3ForecastModel);

			//			this.oACIModel = new sap.ui.model.json.JSONModel("ACI");

			//			this.getView().setModel(this.oACIModel, "top3View");

			//		var oCombo = this.getView().byId("__combi1");
			//			var bpModel = this.getOwnerComponent().getModel("bpModel");
			//		oCombo.setModel(this.oACIModel);

			var oModel = new sap.ui.model.json.JSONModel();
			// define data for that model
			oModel.setData({
				test: "Test",
				enabled: true
			});

			// define a name for that model
			sap.ui.getCore().setModel(oModel, "myModel");

			this.getView().setModel(this.getOwnerComponent().getModel("ACI"), "ACI");

			var data = {
				languages: [{
					"name": "German"
				}]
			};
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress: function() {
			var oViewModel = this.getModel("detailView");

			sap.m.URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("detailView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});

			oShareDialog.open();
		},

		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished: function(oEvent) {
			var sTitle,
				iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("detailView");

			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function(oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		onComboChange: function(oEvent) {
			sap.ui.getCore().AppContext.ComboBoxVal = oEvent.getParameter("selectedItem").getText();
			var MyVariable2 = oEvent.getParameter("selectedItem").getBindingContext();
			//			alert(sap.ui.getCore().AppContext.ComboBoxVal);
			//			alert(MyVariable2);
		},

		onFilterEmployeeChaseList: function(sCustomerID) {

			// build filter array
			var aFilter = [];
			//			var sQuery = oEvent.getSource();
			//			if (sQuery) {
			aFilter.push(new Filter("CRMCUSTOMERID", FilterOperator.Contains, "'" + sCustomerID + "'"));
			//			}

			// filter binding
			var oList = this.getView().byId("EmployeeChaseList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onFilterSummary: function(sCustomerID) {

			// build filter array
			var aFilter = [];
			//			var sQuery = oEvent.getSource();
			//			if (sQuery) {
			aFilter.push(new Filter("CustomerID", FilterOperator.Contains, "'" + sCustomerID + "'"));
			//			}

			// filter binding
			var oList = this.getView().byId("CustomerSummary");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onNavBack: function() {
			var oSplitApp = this.getView().getParent().getParent();
			var oMaster = oSplitApp.getMasterPages()[0];
			oSplitApp.toMaster(oMaster, "flip");
		},

		callUserService: function() {

			var oModel = this.getView().getModel();
			var oThis = this;
			//	var oMode = oThis.getView().byId("serviceUrlMode");
			//	var sKey = oMode.getSelectedKey();
			var rest_url;
			//	if (sKey === "nodejs") {
			rest_url = "/CreateManualForecastFlat.xsodata/Forecast";

			//	} else if (sKey === "java") {
			//		rest_url = "/user/odata/v4/UserData/User";
			//	}
			//	 var rest_url=this.getServiceUrl(oMode.getSelectedKey());

			var oEntry = this.getView().getModel("manualForecastFlat").getData();
			oEntry.ContractItemID = sap.ui.getCore().AppContext.ComboBoxVal;
			//			var oCombo = this.getView().byId("ContractItemDropDown");
			//			var aItem = oCombo.getSelectedItemID();
			// validate that all fields (FName, LName and EmailId) are populated
			if (oEntry && (!oEntry.ContractID || !oEntry.ItemID)) {
				sap.ui.commons.MessageBox.alert(oThis.getView().getModel("i18n").getProperty("FORECASTENTRYVALIDATION"));
				return false;
			}
			var xsrf_token;
			$.ajax({
				type: "GET",
				async: false,
				url: rest_url, //"/user/odata/v4/UserData/User",
				contentType: "application/json",
				headers: {
					'x-csrf-token': 'Fetch',
					'Accept': "application/json"
				},
				success: function(data, textStatus, request) {
					xsrf_token = request.getResponseHeader('x-csrf-token');
				},
				error: function(error) {
					sap.ui.commons.MessageBox.alert(oThis.getView().getModel("i18n").getProperty("FOR_CRT_ERROR"));
				}
			});

			var aUrl = '/user/odata/v4/UserData/User';
			jQuery.ajax({
				url: rest_url, //aUrl,
				method: 'POST',
				data: JSON.stringify(oEntry),
				contentType: "application/json",
				headers: {
					'x-csrf-token': xsrf_token,
					'Accept': "application/json"
				},
				success: function() {
					//	sap.ui.commons.MessageBox.alert("Success");
					oThis.loadJobsTable();
					oThis.resetUserModel();
					oThis._onBindingChange();
				},
				error: function(error) {
					//	sap.ui.commons.MessageBox.alert("Failure");

				}
			});

			//			window.location.reload();
			var rest_url_foreUpd;
			//	if (sKey === "nodejs") {
			rest_url_foreUpd = "/UpdateVVTCustomerListManualForecast.xsjs/";
			var myInterval = setInterval(jQuery.ajax({
				url: rest_url_foreUpd,
				method: 'POST',
				dataType: 'json',
				headers: {
					'x-csrf-token': 'Fetch',
					'Accept': "application/json"
				},
				success: function(data, textStatus, request) {
					xsrf_token = request.getResponseHeader('x-csrf-token');
					oThis.loadJobsTable();
				},
				error: function(error) {
					/*		sap.ui.commons.MessageBox.alert(oThis.getView().getModel("i18n").getProperty("FOR_CRT_ERROR")); */
					oThis.loadJobsTable();
				}
			}), 10000);
			clearInterval(myInterval);
		},

		loadJobsTable: function() {
			var oThis = this;
			var oTable = oThis.byId("CustomerSummary");
			var rest_url;
			rest_url = "/CustomerListCRMISP_ConsolidatedSOs.xsodata/CRM_CustomerList/";

			var myInterval = setInterval($.ajax({
				type: "GET",
				async: true,
				url: rest_url,
				contentType: "application/json",
				dataType: 'json',
				headers: {
					'x-csrf-token': 'Fetch',
					'Accept': "application/json"
				},
				success: function(data, textStatus, request) {

					var oModelTable = new sap.ui.model.json.JSONModel();
					data = data.d.results;
					//data = data.value;

					oModelTable.setData({
						modelData: data
					});

					var oTemplate = new sap.m.ColumnListItem({
						cells: [
							new sap.m.ObjectIdentifier({
								title: "{DELIVERY_YEAR_D}",
								text: "All Contracts",
								wrapping: false
							}),
							new sap.m.ObjectNumber({
								number: "{MANUALFORECASTEDDAYS}",
								unit: "Days",
								wrapping: false
							}),
							new sap.m.ObjectNumber({
								number: "{FORECASTEDDAYSCORRECTED}",
								unit: "Days"
							}),
							new sap.m.ObjectNumber({
								number: "{RECORDEDDAYSCORRECTED}",
								unit: "Days"
							})
						]
					});
					oTable.setModel(oModelTable);
					oTable.bindItems("/modelData", oTemplate);
					oThis._onBindingChange();
					oThis.resetUserModel();
					oTable.getModel().updateBindings();
					//					window.location.reload();					

				},
				error: function(error) {
					sap.ui.commons.MessageBox.alert(oThis.getView().getModel("i18n").getProperty("TAB_NOT_UPDATED"));
					oTable.bindItems("/");
				}
				
			}), 10000);
			clearInterval(myInterval);
			window.location.reload();
		},

		resetUserModel: function() {

			var oLocalUserData = {
				"DELIVERY_YEAR_D": "",
				"MANUALFORECASTEDDAYS": "",
				"FORECASTEDDAYSCORRECTED": "",
				"RECORDEDDAYSCORRECTED": ""
			};
			this.getView().getModel("modelData").setData(oLocalUserData);
		},

		onIconSelectChanged: function(oEvent) {
			var key = oEvent.getParameters().key;
			if (key === '1') {
//				alert("Click Test1");
				this._onBindingChange();
			} else if (key === '2') {
//				alert("Click Test2");
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("CRM_CustomerList", {
					CustomerID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			this.getRouter().navTo("object2", {
				objectId: oItem.getBindingContext().getProperty("CRMSOID"),
				itemId: oItem.getBindingContext().getProperty("SALESDOCUMENTITEM_INT")
			});
		},

		/**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound to the view.
		 * @private
		 */
		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}

			var sPath = decodeURI(oElementBinding.getPath()),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.CustomerID,
				sObjectName = oObject.CustomerName,
				oViewModel = this.getModel("detailView");

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("shareSaveTileAppTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			this.onFilterSummary(sObjectId);
			this.onFilterEmployeeChaseList(sObjectId);
		},

		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);

			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		}

	});

});