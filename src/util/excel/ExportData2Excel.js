
// export 方法
export function exportExcel(paraList){
    require.ensure([], () => {
        const { export_json_to_excel } = require('../excel/Export2Excel');
        const tHeader = paraList.excelColName;
        // 上面设置Excel的表格第一行的标题
        const list = paraList.exportTableData;  
        //把data里的tableData存到list
        const filterVal = paraList.tableDataAttributeArray;
        // 上面的tableData里对象的属性  
        const data = formatJson(filterVal, list);
        if(paraList.title == ""){
            paraList.title = "Excel " + Date.now();
        }
        export_json_to_excel(tHeader, data, paraList.title);
        })
}
function formatJson(filterVal, jsonData) {
    if(jsonData!=undefined && jsonData!=null){
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
    
}