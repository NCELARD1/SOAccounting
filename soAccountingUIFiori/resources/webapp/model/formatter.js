sap.ui.define([], function() {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue: function(sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},

		statusText: function(sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("invoiceStatusA");
				case "B":
					return resourceBundle.getText("invoiceStatusB");
				case "C":
					return resourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		},

		formatTime: function(time) {
			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "HH:mm:ss"
			});
			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			var timeStr = timeFormat.format(new Date(time + TZOffsetMs));
			return timeStr;
		},

		formatDate: function(date1) {
			var dateFormat = sap.ui.core.format.DateFormat.getInstance({
				pattern: "dd.MM.yyyy"
			});
			var dateStr = dateFormat.format(new Date(date1));
			return dateStr;
		},

		statusSO: function(sStatus) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			switch (sStatus) {
				case "Delivered":
					return "Success";
				case "Delivery confirmed":
					return "Success";
				case "Ongoing":
					return "Warning";
				default:
					return "Error";
			}
		},

		percentageState: function(iPercent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			switch (iPercent) {
				case 100:
					return "Success";
				default:
					return "Error";
			}
		}

	};

});