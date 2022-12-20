    (function ($) {
      "use strict";
    })(jQuery);

    var table = $("#table").find("tbody");

    var rR = "";

    const backlogAdiYoxla = function (tb, n, i) {
      if (n.tn === "tmBacklog") {
        table.append(`
              <tr class = "bg-info">
                <td>API NAME: </td>
                <td>${tb[i].r[0].backlogName}</td>
              </tr>
              `);
      }
    };

    const inputAdlariYoxla = function (tb, n, i) {
      if (n.tn === "Response") {
        rR = tb[i].r;
        var responseIN = "";
        rR.map((o) => {
          if (o.inputType === "IN") {
            responseIN += o.inputName + ",";
          }
        });

        table.append(`

              <tr class = "bg-info">
              <td>INPUT NAME: </td>
              <td>${responseIN}</td>
              </tr>

            `);

        //console.log("API NAME: " + tb[i].r[0].backlogName)
      }
    };

    const dbListYoxla = function (tb, n, i) {
      if (n.tn === "dbList") {
        tb[i].r.map((d) => {
          table.append(`
                          <tr class = "bg-info">
                          <td class = "bg-info">DB NAME: </td>
                          <td>${d.dbName}</td>
                          </tr>
                          `);
        });
      }
    };

    const tableListYoxla = function (tb, n, i) {
      if (n.tn === "tableList") {
        tb[i].r.map((t) => {
          table.append(`
                    <tr class = "bg-info">
                    <td class = "bg-info">TABLE NAME: </td>
                    <td>${t.tableName}</td>
                    </tr>
                    `);
        });
      }
    };

    const yeniUsulSet = function (tb,n,i){
      if (n.tn === "backlogDescList") {
        tb[i].r.map((t) => {
          table.append(`
                    <tr class = "bg-info">
                    <td class = "bg-info">DESCRIPTION: </td>
                    <td>${t.description}</td>
                    </tr>
                    `);
        });
      }
    }

    fieldListYoxla = (tb, n, i) => {
      if (n.tn === "fieldList") {
        var bazadkai = "";
        tb[i].r.map((f) => {
          bazadkai += f.fieldName + ",";
        });

        table.append(`
            <tr class = "bg-info">
            <td  scope = "row">BAZADAKI NAME: </td>
            <td>${bazadkai}</td>
            </tr>
            `);
      }
    };

    backlogDescYoxla = (tb, n, i) => {
      if (n.tn === "backlogDescList") {
        tb[i].r.map((dl) => {
          if (dl.commentType === "comment") {
            table.append(
              `
              <tr class = "bg-warning">
              <td scope = "row">DESCRIPTION: </td>
              <td> ` +
                dl.description +
                " orderNo: " +
                dl.orderNo +
                `</td>
              </tr>
              `
            );
          } else {
            table.append(
              `
              <tr class = "bg-info">
              <td scope = "row">DESCRIPTION: </td>
              <td> ` +
                dl.description +
                " orderNo: " +
                dl.orderNo +
                `</td>
              </tr>
              `
            );
          }
        });
      }
    };

    outNameYoxla = (tb, n, i) => {
      var responseOUT = "";

      if (rR && rR != undefined) {
        rR.map((o) => {
          if (o.inputType === "OUT") {
            responseOUT += o.inputName + ",";
          }
        });

        table.append(`
      
              
              <tr class = "bg-info">
                <td>OUTPUT NAME: </td>
                <td>${responseOUT}</td>
              </tr>
              `);
      }
    };

    $("#get").click(function () {
      table.empty();
      console.log("kjshfkjds");

      var apiId = $("#deyer").val();

      $.get(
        "http://localhost/CHEWEEK_DEV_GIT/api_mekan_4_cheweek_resource/api/" + apiId + ".json",
        function (res) {
          //console.log(res)

          var apiAction = "";

          if(res && res.kv && res.kv.apiAction){
            if (res.kv.apiAction == "-1") {
              apiAction = "CONTAINER";
            } else if (res.kv.apiAction == "R") {
              apiAction = "READ";
            } else if (res.kv.apiAction == "C") {
              apiAction = "CREATE";
            } else if (res.kv.apiAction == "U") {
              apiAction = "UPDATE";
            } else if (res.kv.apiAction == "D") {
              apiAction = "DELETE";
            } else {
              apiAction = res.kv.apiAction;
            }
          }
          table.append(`
                  <tr class = "bg-info">
                    <td>API TIPI: </td>
                    <td>${apiAction}</td>
                  </tr>
                  `);

          var tb = res.tbl;
          var i = 0;
          tb.map((n) => {
            backlogAdiYoxla(tb, n, i);

            inputAdlariYoxla(tb, n, i);

            dbListYoxla(tb, n, i);

            tableListYoxla(tb, n, i);

            fieldListYoxla(tb, n, i);

            backlogDescYoxla(tb, n, i);

            //yeniUsulSet(tb,n,i)

            i++;
          });

          outNameYoxla(n);
        }
      );
    });

    $("#get_table").click(function () {

        var tableName = $("#table_name").val();
      var cookie = $("#exampleFormControlTextarea1").val()

        $.ajax({
          type: "POST",
          data: `{
              "kv": {
                  "cookie": ${cookie},
                  "table":${tableName}
                }
              }`,
          url: "https://test.sourcedagile.com/api/post/callp/22110211563002523322",
          dataType: "json",
          success: function (response) {
                table.append(`
                
                        
                <tr class = "bg-info">
                  <td>db insert: </td>
                  <td>${response.kv.insert}</td>
                </tr>
                `);
            },
      });
    });
