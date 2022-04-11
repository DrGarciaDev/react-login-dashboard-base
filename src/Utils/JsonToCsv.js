/**
 *
 * @param objArray
 */
 export function convertToCSV(objArray) {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let  header = "";
    Object.keys(rows[0]).map(pr => (header += pr + ","));

    let str = "";
    rows.forEach(row => {
        let line = "";
        let columns = typeof row !== "object" ? JSON.parse(row) : Object.values(row);
        columns.forEach(column => {
            if (line !== "") {
                line += ",";
            }
            if (typeof column === "object") {
                line += JSON.stringify(column);
            }  else {
                line += column;
            }
        });
        str += line + "\r\n";
    });
    

    str = header + "\r\n" + str;
    // return str
    
    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(str));
    link.setAttribute('download', 'org-api.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}