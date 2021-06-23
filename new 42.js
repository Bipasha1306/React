 const click = () => {
    const value = gridApi.getDataAsCsv();

    console.log(value);
    const search = '"';
    const replaceWith = "";

    const res = value.replaceAll(search, replaceWith);
    console.log(res);

    var lines = res.split("\n");
    console.log("stage 1---", lines);

    var result = [];
    var a1 = [];

    var headers = lines[0].split(",");
    console.log("stage 2---", headers);

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      console.log("stage 3 currentline---", currentline);
      var first = currentline.slice(0, 1);
      var second = currentline.slice(3);
      console.log("second--", second);
      //second = second.filter((entry) => entry.trim() != "");
      console.log({ first, second });
      console.log("first chunk array", first);
      var newLineFirst = first[0].split("->");
      //  var a =first;
      //  console.log(a)
      newLineFirst.shift();
      console.log("stage 4 newLineFirst--", newLineFirst);
      var newLine = newLineFirst.concat(second);
      console.log("new-----length", newLineFirst.length);
      var newArr = currentline.slice(0, newLineFirst.length, ...newLineFirst);
      console.log("new-----", newArr);
      console.log("stage 5 newLine--", newLine);
      var newArray = newLineFirst.map((e, i) => e + second[i]);
      console.log("newArray", newArray);

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = newLine[j];
      }

      result.push(obj);
    }
    console.log("result", result);
    const csvData = JSON.stringify(result);
    console.log("csvData---", csvData);
    // return xy;
    // return value;
    function removeEmpty(obj) {
      const newObj = {};
      Object.keys(obj).forEach(function (k) {
        if (obj[k] && typeof obj[k] === "object") {
          const value = removeEmpty(obj[k]);
          if (Object.keys(value).length !== 0) {
            newObj[k] = removeEmpty(obj[k]);
          }
        } else if (
          obj[k] != null &&
          obj[k] !== undefined &&
          obj[k] !== "" &&
          obj[k] !== "\r"
        ) {
          newObj[k] = obj[k];
        }
      });
      return newObj;
    }

    var newData = removeEmpty(result);
    var myData = Object.keys(newData).map((key) => {
      return newData[key];
    });
    console.log(result);
    console.log("removeddd", myData);

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const fileExtension = ".xlsx";
    const fileName = "MyFile";

    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);

      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      const data = new Blob([excelBuffer], { type: fileType });

      FileSaver.saveAs(data, fileName + fileExtension);
    };
    exportToCSV(myData, "file123");
  };