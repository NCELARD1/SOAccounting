function execFlowgraph() {
var conn = $.hdb.getConnection();
var output = "forecast update executed sucessfully";
var fnInitialLoad = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::FSTU_CRMCustomerList_SP");
var result = fnInitialLoad();
conn.commit();
conn.close();
if (result && result.EX_ERROR != null) { return result.EX_ERROR;}
else { return output; }
}
var output = execFlowgraph();
$.response.contentType = "application/json";
$.response.setBody(output);