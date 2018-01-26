function execFlowgraph() {
var conn = $.hdb.getConnection();
var output = "initial load executed sucessfully";
var fnInitialLoad = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::ECCD_CRM_Raw_SP");
var result = fnInitialLoad();
conn.commit();
var fnInitialLoad1 = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::ECCD_ISP_ZSMAXA_Raw_SP");
var result1 = fnInitialLoad1();
conn.commit();
var fnInitialLoad2 = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::ECCD_ISP_ZVZC_Raw_SP");
var result2 = fnInitialLoad2();
conn.commit();
var fnInitialLoad3 = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::VTT_CRMISP_ConsolidatedSOs_U_SP");
var result3 = fnInitialLoad3();
conn.commit();
var fnInitialLoad4 = conn.loadProcedure("SOAccounting_HANAXSA.soAccountingDB.flowgraphs::VTT_CRMCustomerList_SP");
var result4 = fnInitialLoad4();
conn.commit();
conn.close();
if (result && result.EX_ERROR != null) { return result.EX_ERROR;}
else { return output; }
}
var output = execFlowgraph();
$.response.contentType = "application/json";
$.response.setBody(output);