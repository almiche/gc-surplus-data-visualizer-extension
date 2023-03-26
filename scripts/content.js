$( document ).ready(function() {
function oTrackTable() {
      $(".tgl-panel").before("<canvas id=\"myChart\" height=\"100\"></canvas>");

      var lotNumber = getUrlParameter("lcn")
      var dataSeries
      $.ajax({url: "https://www.gcsurplus.ca//whatsforsale/Bid/Bid.cfc?method=getBidHistoryBuyerRemote&lotNo="+lotNumber+"&timeZoneOffset=" + 0 +"&lang=eng", success: function(result){
        dataSeries = JSON.parse(result)["DATA"];
        drawChart(dataSeries);
      }});
}

function drawChart(data) {
  var chart = $('#myChart')

  new Chart(
    chart,
    {
      type: 'line',
      data: {
        labels: data.map(row => row[2]),
        datasets: [
          {
            label: 'Bids over time',
            data: data.map(row => Number(row[3].replace(/[^0-9.-]+/g,"")))
          }
        ]
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


