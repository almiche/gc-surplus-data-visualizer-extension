$( document ).ready(function() {
const GMTOffset = -(new Date().getTimezoneOffset() / 60)

function oTrackTable() {
      $(".tgl-panel").before("<canvas id=\"myChart\" height=\"100\"></canvas>");

      var lotNumber = getUrlParameter("lcn")
      $.ajax({url: "https://www.gcsurplus.ca//whatsforsale/Bid/Bid.cfc?method=getBidHistoryBuyerRemote&lotNo="+lotNumber+"&timeZoneOffset=" + GMTOffset +"&lang=eng", success: function(result){
        var dataSeries = JSON.parse(result)["DATA"];
        drawChart(dataSeries);
      }});
}

function drawChart(data) {
  var ctx = document.getElementById('myChart').getContext('2d');

  var dataToJson = data.map(i => {
    var date = i[1].trim();
    var time = i[2].trim();
    var dateObject = new Date(date + " " + time + " " + "GMT" + GMTOffset);
    var bid = Number(i[3].replace(/[^0-9.-]+/g,""));

     return{
      x: dateObject,
      y: bid,
      }
    });

  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bids over time',
            data: dataToJson,
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y'
            }
          }
        ]
      },
      options: {
        plugins: {
          title: {
            text: 'Bids over time',
            display: true
          }
        },
        scales: {
          x: {
            type: 'time',
            adapters: {
              date: {
                zone: 'America/Montreal',
              },
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'value'
            }
          },
        }
      }
    }
  );
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

oTrackTable();

});


