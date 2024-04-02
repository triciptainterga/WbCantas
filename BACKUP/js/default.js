//$(document).ready(function () {
//    console.log("ready...")
/*
Code 1 System Aux
Code 2 Istirahat
Code 3 Eskalasi
Code 4 Briefing
Code 5 Outgoing call
Code 6 Isi form
Code 7 Rest Room
Code 8 Sholat
Code 9 System Error
Code 0 Aux System
*/


//});
var myVarX;
var myVarY;

function myFunction() {
  console.log("New PROV JS");
  updateChartData();
  //myVar = setInterval(llll, 3000);
  //myVarX = setInterval(updateChartData, 8000);
  //myVarY = setInterval(agentList, 8000);
  //calloutbound staffedoutbound auxagent waiting acdin avail callabdn callanswer
  $('#calloutbound').html('0');
  $('#staffedoutbound').html('0');
  $('#auxagent').html('0');
  $('#waiting').html('0');
  $('#acdin').html('0');
  $('#avail').html('0');
  $('#callabdn').html('0');
  $('#callanswer').html('0');
  //myVarY = setInterval(getRedirect, 10000);
  
}
function getRedirect() {
  console.log("getRedirect");
  //window.location.replace("outbound.html");
}

function storeUserData(fieldName,userData) {
  // Convert the data to a JSON string
  var jsonString = JSON.stringify(userData);

  // Store the data in local storage under the key 'user'
  localStorage.setItem(fieldName, jsonString);

  console.log('Data stored in local storage successfully.');
}

function secondsToHHMMSS(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  // Add leading zeros if needed
  hours   = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}
function convertDate(dateString) {
    const milliseconds = parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1'));
    return new Date(milliseconds);
}
function sortByNumericPropertyAsc(array, propertyName) {
  return array.sort(function (a, b) {
    return b[propertyName] - a[propertyName];
  });
}
function getTopRows(array, n) {
  return array.slice(0, n);
}
function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =  Math.round(seconds % 60);
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    if (isNaN(formattedMinutes)) formattedMinutes = 0;
    if (isNaN(formattedSeconds)) formattedSeconds = 0;

    return `${formattedMinutes}:${formattedSeconds}`;
}

function chartPie(){
  // Retrieve data from local storage under the key 'user'
  var storedDataAUX = localStorage.getItem('DATAAUX');
  var storedDataACDIN = localStorage.getItem('DATAACDIN');
  var storedDataREADY = localStorage.getItem('DATAAVAIL');
  var storedDataQUE = localStorage.getItem('DATAQUE');
  var options={
    chart: {
        height: 465,
        type: "pie"
    },
    plotOptions: {
        pie: {
            donut: {
                size: "70%"
            }
        }
    },
    dataLabels: {
        formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            const value = opts.w.config.series[opts.seriesIndex]
            return [name, value]
          },
          style: {
            fontSize: "140px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold"
          }
    },
    series: [storedDataQUE, storedDataAUX, storedDataACDIN],
    labels: ["QUE", "AUX", "ACD IN"],
    colors: ["#EB1616", "#C7EB16", "#164FEB"],
    legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "140px",
        offsetX: 0
    }
  };
  var chart = new ApexCharts(document.querySelector("#chart-donut"), options);
  chart.render();
}


// Function to update chart data
function updateChartData() {
  // Generate new random data
  var newData = [];
  /*for (var i = 0; i < pieData.series.length; i++) {
      newData.push(Math.floor(Math.random() * 100) + 1);
  }*/
  
// Define initial chart data
var storedDataACDIN = parseInt(localStorage.getItem('DATAACDIN'));
var storedDataAUX = parseInt(localStorage.getItem('DATAAUX'));
var storedDataREADY = parseInt(localStorage.getItem('DATAAVAIL'));
var pieData = {
  series: [storedDataACDIN, storedDataAUX, storedDataREADY],
  labels: ["ACD IN", "NOT READY", "AVAIL"]
};

// Define chart options
var pieOptions = {
  chart: {
    height: 485,
    type: "pie"
  },
  labels: pieData.labels,
  dataLabels: {
    formatter(val, opts) {
        //const name = opts.w.globals.labels[opts.seriesIndex]
        const value = opts.w.config.series[opts.seriesIndex]
        //return [name, value]
          const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, value]
      }
},
  series: pieData.series,
  colors: ["#309E43", "#F20F3C", "#160FF2"],
    legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "140px",
        offsetX: 0
    },
  responsive: [{
      breakpoint: 480,
      options: {
          chart: {
              width: 200
          },
          legend: {
              position: 'bottom',
			  fontSize: "140px"
          }
      }
  }]
};

// Create the pie chart
var pieChart = new ApexCharts(document.querySelector('#chart-donut'), pieOptions);

// Render the chart
pieChart.render();
 // var storedDataACDIN = parseInt(localStorage.getItem('DATAACDIN'));
  //var storedDataAUX = parseInt(localStorage.getItem('DATANOTREADY'));
  //var storedDataREADY = parseInt(localStorage.getItem('DATAAVAIL'));
  //var storedDataQUE = parseInt(localStorage.getItem('DATAQUE'));
  
  newData.push(storedDataACDIN);
  newData.push(storedDataAUX);
  newData.push(storedDataREADY);



  console.log(newData);
  // Update chart series with new data
  pieChart.updateSeries(newData);
}


function fetchData() {
    
    //Call Pie
    updateChartData();
    //End


    
    //GET DATA AUX
    let NoUrutan = 1;
    console.log("Hai iwallboard Aux Agent");
    var Abandonrate = 0;
    fetch('https://crm.uidesk.id/roatex/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo?TrxID=UideskIndonesia&TrxUserName=Admin&TrxAction=UIDESK123')
    .then(response => response.text())
    .then(xmlString => {
        // Parse the XML string into an XMLDocument
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Use the xmlDoc as needed
        console.log(xmlDoc);

        const parserX = new DOMParser();
        const xmlDocX = parserX.parseFromString(xmlDoc, "text/xml");
        const jsonString = xmlDoc.getElementsByTagName("string")[0].textContent;

        // Parse the JSON string into a JavaScript object
        const jsonObject = JSON.parse(jsonString);

        console.log(jsonObject);

        $("#listAuxAgent").empty();
        $.each(jsonObject, function (i, items) {
          
            //console.log(items["AuxUserName"]);
            $("#listAuxAgent").append('<li class="px-4 py-2">'+
                  '<div class="d-flex align-items-center">'+
                      '<div class="flex-shrink-0 me-3">'+
                          '<div class="avatar-sm">'+
                              '<div class="avatar-title bg-light text-primary rounded-circle">'+
                              NoUrutan+
                              '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="flex-grow-1 overflow-hidden">'+
                          '<p class="text-muted mb-1 text-truncate">'+ items["AuxUserName"] +'</p>'+
                          '<div class="badge badge-soft-success ms-2">'+ items["AuxDescription"] +'</div>'+
                      '</div>'+
                      '<div class="flex-shrink-0 align-self-start">'+
                          '<h6> '+ items["TimeDiff"] +' <i class="uil uil-arrow-up-right text-success ms-1"></i></h6>'+
                      '</div>'+
                  '</div>'+
              '</li>');
              NoUrutan++;
        });
        storeUserData("DATAAUX",NoUrutan-1);

    })
    .catch(error => {
        console.error('Error fetching XML data:', error);
    });


  //Get data Other Channel
  function getJumlahChannel(channelName, jsonObject) {
    let jumlah = 0;
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].Channel === channelName) {
            jumlah += jsonData[i].Jumlah;
        }
    }
    return jumlah;
}
  fetch('https://crm.uidesk.id/roatex/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo?TrxID=UideskIndonesia&TrxUserName=Admin&TrxAction=UIDESK126')
    .then(response => response.text())
    .then(xmlString => {
        // Parse the XML string into an XMLDocument
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Use the xmlDoc as needed
        console.log(xmlDoc);

        const parserX = new DOMParser();
        const xmlDocX = parserX.parseFromString(xmlDoc, "text/xml");
        const jsonString = xmlDoc.getElementsByTagName("string")[0].textContent;

        // Parse the JSON string into a JavaScript object
        const jsonObject = JSON.parse(jsonString);

        console.log(jsonObject);

        let waTotal=0;
        let waFrt=0;
        let emailTotal=0;
        let emailFrt=0;
        $.each(jsonObject, function (i, items) {
            console.log(items["Jumlah"]);   
            if(items["Channel"]=="Whatsapp"){
              waTotal =items["Jumlah"];
              waFrt=items["FRT"];
            }  else{
              emailTotal=items["Jumlah"];
              emailFrt=items["FRT"];
            }  
        });

        
        
        // Get the number of occurrences of the "Whatsapp" channel
        

          $('#watotal').html(waTotal);
          $('#wafrt').html(waFrt);
          $('#emailtotal').html(emailTotal);
          $('#emailfrt').html(emailFrt);

    })
    .catch(error => {
        console.error('Error fetching XML data:', error);
    });


  //End
  

  var jqxhr = $.getJSON("BE/getssh.php", function (data) {
    console.log("Hai iwallboard");
    
    //Get Data Detail
    console.log(data["DataDetail"]);
    //End Get Data Detail
    
    $('#table-skill-split tbody').html('');
    let service_level = 0;
    let abandon = 0;
    let call_receive = 0;
    let que = 0;
    let talking = 0;
    let rateABD = 0;
    let notReady = 0;
    let answer = 0;
    let SL = 0;
    let totalRow = 0;
    let NoUrutan = 1;
    let JumlahTotalCallAnswered = 0;
   

    // Initialize a counter for AVAIL occurrences
    var availCount = 0;
    var auxCount = 0;
    var acdIN = 0;
    var agentOutboundStaffed = 0;
    var agentStaffed = 0;
    var agentAux = 0;
    $.each(data["DataDetail"], function (i, items) {
        console.log(items.state);
        
        if (items.state  === "OK") {
          availCount++;
        }
        if (items.state  === "") {
          auxCount++;
        }
        if (items.state  === "ACD") {
         
            acdIN++;
         
        }

        if (items.state  === "AUX") {
          
            agentOutboundStaffed++;
          
        }
        agentStaffed = items.JumlahNotReady + items.JumlahReady;

      
    });
    var storedDataAUX = localStorage.getItem('DATAAUX');
    $('#avail').html(availCount);
    $('#staffed').html(parseInt(storedDataAUX)+parseInt(availCount));
    $('#auxagent').html(storedDataAUX);
    //$('#staffed').html(availCount);

    // Data to be stored
    

    // Call the function to store the data
    storeUserData("DATAAVAIL",availCount);
    storeUserData("DATANOTREADY",auxCount);
  })
    .done(function () {
      //console.log( "done" );
      
    })
    .fail(function () {
      //console.log( "error" );
    })
    .always(function () {
      //console.log( "complete" );
    });

  // Perform other work here ...

  // Set another completion function for the request above
  jqxhr.always(function () {
    //console.log( "second complete" );
  });

  var a = 0;
  var b = 0;
  console.log("Hai iwallboard summary call");
  var Abandonrate = 0;
  var jqxhr = $.getJSON("BE/getsummary.php", function (data) {
  $.each(data["DataDetail"], function (i, items) {
      console.log(items.TypeNya);
      console.log(items.jumlah);

      if(items.TypeNya=="CallReceived"){
         
          a = items.jumlah;
      }
      if(items.TypeNya=="CallAnswered"){
          //$('#callanswer').html(items.jumlah);
      }
      if(items.TypeNya=="CallAbandoned"){
          $('#callabdn').html(items.jumlah);
          b = items.jumlah;
      }
      if(a==0){
          Abandonrate = "0";
      }else{
          Abandonrate = (b / a) * 100;
      }
      
      
  

  });
  })
  .done(function () {
    //console.log( "done" );
    
  })
  .fail(function () {
    //console.log( "error" );
  })
  .always(function () {
    //console.log( "complete" );
  });
  
  //get List Aux Talktime

  console.log("Hai iwallboard get Talktime");
  var Abandonrate = 0;

  let NoUrutanTalk=1;
  
  var jqxhr = $.getJSON("BE/getauxtalktime.php", function (data) {
  $("#listTalkAgent").empty();
  $.each(data["DataDetail"], function (i, items) {
      console.log(items.agent);
      console.log(items.talktime);

      if(items.agent == null){
        //console.log(items["AuxUserName"]);
      
      }else{
        $("#listTalkAgent").append('<li class="px-4 py-2">'+
          '<div class="d-flex align-items-center">'+
              '<div class="flex-shrink-0 me-3">'+
                  '<div class="avatar-sm">'+
                      '<div class="avatar-title bg-light text-primary rounded-circle">'+
                      NoUrutanTalk+
                      '</div>'+
                  '</div>'+
              '</div>'+
              '<div class="flex-grow-1 overflow-hidden">'+
                  '<p class="text-muted mb-1 text-truncate">'+ items.agent+'</p>'+
                  '<div class="badge badge-soft-success ms-2">Talk time</div>'+
              '</div>'+
              '<div class="flex-shrink-0 align-self-start">'+
                  '<h6> '+ secondsToMinutes(items.talktime) +' <i class="uil uil-arrow-up-right text-success ms-1"></i></h6>'+
              '</div>'+
          '</div>'+
      '</li>');
      NoUrutanTalk++;
      }
      
      
      
  

  });
  })
  .done(function () {
    //console.log( "done" );
    
  })
  .fail(function () {
    //console.log( "error" );
  })
  .always(function () {
    //console.log( "complete" );
  });
  
  //get ACD IN

  //GET List Avail Agent
  console.log("Hai iwallboard get Available Times");
  let NoUrutanAvail=1;
  
  var jqxhr = $.getJSON("BE/getssh_listagent_que.php", function (data) {
  $("#listAvailAgent").empty();
  $.each(data, function (i, items) {
      console.log(items.name);
      console.log(items.lastcalltime);

      if(NoUrutanAvail<=5){
        
        //console.log(items["AuxUserName"]);
      $("#listAvailAgent").append('<li class="px-4 py-2">'+
          '<div class="d-flex align-items-center">'+
              '<div class="flex-shrink-0 me-3">'+
                  '<div class="avatar-sm">'+
                      '<div class="avatar-title bg-light text-primary rounded-circle">'+
                      NoUrutanAvail+
                      '</div>'+
                  '</div>'+
              '</div>'+
              '<div class="flex-grow-1 overflow-hidden">'+
                  '<p class="text-muted mb-1 text-truncate">'+ items.name+'</p>'+
                  '<div class="badge badge-soft-success ms-2">Avail time</div>'+
              '</div>'+
              '<div class="flex-shrink-0 align-self-start">'+
                  '<h6> '+ secondsToHHMMSS(items.lastcalltime) +' <i class="uil uil-arrow-up-right text-success ms-1"></i></h6>'+
              '</div>'+
          '</div>'+
      '</li>');
      NoUrutanAvail++;
  
      }
      
      
  

  });
  })
  .done(function () {
    //console.log( "done" );
    
  })
  .fail(function () {
    //console.log( "error" );
  })
  .always(function () {
    //console.log( "complete" );
  });

  //End
  let dataAuxNya=0;
  let dataACDNya=0;
  let dataQUENya=0;
  let dataREADYNya=0;
  let dataUNAVAILNya=0;
  var jqxhr = $.getJSON("BE/getssh_state.php", function (data) {
    $.each(data["DataDetail"], function (i, items) {
      console.log("getssh_state here...");
        console.log(items['ACD-IN']);
        console.log(items['QUE']);
      
        //$('#acdin').html(items['ACD-IN']);
        if(items['ACD-IN']>0){
          $('#acdin').html("<font color='blue' id='elem'>"+items['ACD-IN']+"</font>");
        }else{
          $('#acdin').html(items['ACD-IN']);
        }
        if(items['QUE']>0){
          $('#queline').html("<font color='red' id='elem'>"+items['QUE']+"</font>");
        }else{
          $('#queline').html(items['QUE']);
        }
        
        dataAuxNya=2;
        dataACDNya=items['ACD-IN'];
        dataQUENya=items['QUE'];
        dataREADYNya=items['READY'];
        dataUNAVAILNya=items['UNAVAILABLE'];
        storeUserData("DATAACDIN",dataACDNya);
        storeUserData("DATAQUE",dataQUENya);
        storeUserData("DATAREADY",dataREADYNya);
        storeUserData("DATAUN",dataUNAVAILNya);
        

    });
    })
    .done(function () {
      //console.log( "done" );
      
    })
    .fail(function () {
      //console.log( "error" );
    })
    .always(function () {
      //console.log( "complete" );
    });

  //get END

  var a = 0;
  var b = 0;
  console.log("Hai iwallboard summary call v2");
  var Abandonrate = 0;
  var currentDate = new Date();

  // Get the current date components
  var year = currentDate.getFullYear(); // Get the full year (e.g., 2024)
  var month = currentDate.getMonth() + 1; // Get the month (0-11, add 1 to get the actual month number)
  var day = currentDate.getDate(); // Get the day of the month (1-31)

  var jqxhr = $.getJSON("BE/getsummary_v2.php", function (data) {
  $.each(data["DataDetail"], function (i, items) {
      console.log(items['Total Call'][day]);
      console.log(items['SCR'][day]);
      $('#servicelevel').html(items['Service Level'][day]+' %');
      $('#calltotal').html(items['Total Call'][day]);
      $('#callanswer').html(items['Call Answered'][day]);
      //$('#abnringing').html(items['Abnd. Ringing'][day]);
      $('#abnque').html(items['Abnd. Queue'][day]);
     // $('#abnivr').html(items['ivr terminated'][day]);
      const seconds = items['Average Handling Time (AHT)'][day];
      const formattedTime = secondsToMinutes(seconds);
      $('#ahtdata').html(formattedTime);
      //$('#callabdn').html(items['early abandoned'][day]);
     
  });
  })
  .done(function () {
    //console.log( "done" );
    
  })
  .fail(function () {
    //console.log( "error" );
  })
  .always(function () {
    //console.log( "complete" );
  });
// Perform other work here ...

// Set another completion function for the request above
jqxhr.always(function () {
  //console.log( "second complete" );
});
}
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}
function blink(selector){
  $(selector).fadeOut('slow', function(){
      $(this).fadeIn('slow', function(){
          blink(this);
      });
  });
}

function agentList() {
    getDateTime();
   
}

function agentList() {
  getDateTime();
  var jqxhr = $.getJSON("getData.php", function (data) {
			  	 	  
    $('#1_TampungListAgent').html('')
    $.each(data, function (i, item) {
      /*
		Code 1 System Aux
		Code 2 Istirahat
		Code 3 Eskalasi
		Code 4 Briefing
		Code 5 Outgoing call
		Code 6 Restroom
		Code 7 Sholat
		//Code 8 Isi form
		Code 8 System Error
		Code 0 System Aux
		*/
    //GET DATA WB Header
    //Code Data calloutbound staffedoutbound auxagent waiting acdin avail callabdn callanswer
    /*
    0: " ACD Calls " 
    1: " csplit INQUEUE "
    2: " Agents Staffed "
    3: " Agents in AUX "
    4: " % Within Service Level "
    5: " % Aban Calls "
    6: " Outbound Aban Calls "
    7: " Aban Calls"
    */
      console.log("Provider " + item["INOUT PROV SMG"]);
      console.log("Customer " + item["INOUT CUST SMG"]);
      //console.log(item["INOUT PROV SMG"][2]);
      //console.log(item["INOUT CUST SMG"][2]);
      
      
      
      /*
      $('#staffed').html(item["INOUT PROV SMG"][2]);
      $('#servicelevel').html(item["INOUT PROV SMG"][4]);
      
      $('#callabdn').html(item["INOUT PROV SMG"][7]);
      $('#callanswer').html(item["INOUT PROV SMG"][0]);
      if(item["INOUT PROV SMG"][1]==="0"){
        document.getElementById("waitingImg").src = "icon/Waiting1.png"; 
        $('#waiting').html(item["INOUT PROV SMG"][1]);
      }else{
        document.getElementById("waitingImg").src = "icon/Waiting2.png"; 
        $('#waiting').html("<font color='red' id='elem'>"+item["INOUT PROV SMG"][1]+"</font>");
        $("#waiting").blink(500);
      }
      */
    //End GET DATA Header
    
	  //alert(item[4])
	  var auxReason="";
	  if(item[4]=="0"){
		auxReason = "System Aux";
	  }else if(item[4]=="1" || item[4]=="System Aux"){
		auxReason = "System Aux";
	  }else if(item[4]=="2" || item[4]=="Istirahat"){
		auxReason = "Istirahat";
	  }else if(item[4]=="3" || item[4]=="Eskalasi"){
		auxReason = "Eskalasi";    
	  }else if(item[4]=="4" || item[4]=="Briefing"){
		auxReason = "Briefing";    
	  }else if(item[4]=="5" || item[4]=="Outgoing Call"){
		auxReason = "Outgoing Call";    
	  }else if(item[4]=="6" || item[4]=="Restroom"){
		auxReason = "Rest Room";    
	  }else if(item[4]=="7" || item[4]=="Sholat"){
		auxReason = "Sholat";    
	  }else if(item[4]=="8" || item[4]=="System Error"){
		auxReason = "System Error";    
	  }else if(item[4]=="9" || item[4]=="Isi form"){
		auxReason = "Isi form";    
	  }else{
		  auxReason = "";
	  }
	  
      $('#1_TampungListAgent').append('<a href="#" class="list-item">' +
        '<div class="list-info">' +
        '<img src="Foto/' + item[2] + '.jpg" width="46px" class="img-thumbnail">' +
        '</div>' +
        '<div class="list-text">' +
        '<span style="font-size:18px;" class="list-text-name">' + item[1] + ' - ' + item[2] + '</span>' +
        '<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
        '<i class="icon-circle"></i>' +
        item[5] + ' - ' + auxReason  + ' - ' + String(item[7]).toHHMMSS() +
        '</div>' +
        '</div>' +
        '</a>')
    });
  })
    .done(function () {
      //console.log( "done" );
    })
    .fail(function () {
      //console.log( "error" );
    })
    .always(function () {
      //console.log( "complete" );
    });

  // Perform other work here ...

  // Set another completion function for the request above
  jqxhr.always(function () {
    //console.log( "second complete" );
  });
}
function getDateTime() {
  var today = new Date();
  let hours = today.getHours(); // get hours
  let minutes = today.getMinutes(); // get minutes
  let seconds = today.getSeconds(); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  var time = hours + ":" + minutes + ":" + seconds;
  var today = new Date();
  var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + ' ' + time;
  var divTimenya = $('#timeNya');
  var divDateNya = $('#dateNya');

  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  var current_date = new Date();
  current_date.setDate(current_date.getDate() + 0);
  month_value = current_date.getMonth();
  day_value = current_date.getDate();
  year_value = current_date.getFullYear();
  divTimenya.empty();
  divTimenya.append(time);
  divDateNya.empty();
  divDateNya.append(months[month_value] + " " + day_value + ", " + year_value);
}