console.log("welcome")

let queryParem = {
    launch_year:'',
    launch_success:'',
    land_success:'',
    limit:20,
    offset:0
}


function getData() {
    let dataLen = $(".spacex-item").length;
    if (dataLen == 0) {
        $('.loadmore-btn').hide();
    } 

    // ajax call get data from api
    $.ajax({
        url: 'https://api.spacexdata.com/v3/launches?',
        method : 'GET',
        data: queryParem,
        dataType: "json",
        success: function (response) {

            console.log(response);

            appendData(response); // function call

            $('.loadmore-btn').show()
            $('.loadmore-btn').html('').text('Load More')
            $('.loading').hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$(document).ready(function(){
    getData(); // function call
})


// function for load more data 
function loadmore() {
    $('.loadmore-btn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span> Loading')
    queryParem.offset += 20 
    queryParem.limit = 20 
    getData();
}

// append data dynamically
function appendData(response) {

    
    
    let length = response.length; // array length
    console.log(response);

    // iteration for get array of data
    for(let i=0; i<length; i++) {
        // console.log(response[i].mission_id)
        let missionIdLength = response[i].mission_id.length;
        let missinList = '';
        if(missionIdLength > 0) {
            for(let j=0; j<missionIdLength; j++) {
                missinList += `<li><span class="textColor">${response[i].mission_id[j]}</span></li>`
            }
        }
        
        // land success 
        let landSuccess = '';
        let coreLen = response[i].rocket.first_stage.cores.length;
        if (coreLen) {
            for(let k = 0; k < coreLen; k++) {
                console.log
                if (response[i].rocket.first_stage.cores[k].land_success == true) {
                    landSuccess = true;
                    break;
                }
            }
        }

        landSuccess =  landSuccess == null ? '' : landSuccess;
      
        let appendHtml = `
                        <div class="col-lg-3 col-md-6 col-sm-12 mt-3 spacex-item">
                            <div class="card rounded">
                                <div class="p-3">
                                    <div class="backColor">
                                        <img src=${response[i].links.mission_patch} onerror="this.src='http://placehold.jp/efefef/003366/150x150.png?text=No%20Image'" class="card-img-top p-3" alt="img">
                                     </div>                            
                                </div>
                                <h6 class="ml-3 textColor"><b>${response[i].mission_name}#${response[i].flight_number}</b></h6>
                                <div class="card-body">
                                    <div class="row">
                                        <b class="ml-3">Mission Ids:</b >
                                    </div>
                                    <div class="row" style="display:${missinList == '' ? 'none' : 'block'}">
                                        <div class="d-block">
                                            <ol>    
                                                ${missinList}
                                            </ol>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <b class="ml-3">Launch Year:<span class="textColor">${response[i].launch_year}</span></b>
                                    </div>
                                    <div class="row">
                                        <b class="ml-3">Successful Launch:<span class="textColor">${response[i].launch_success}</span></b>
                                    </div>
                                    <div class="row">
                                        <b class="ml-3">Successful Landing:<span class="textColor">${landSuccess}</span></b>
                                    </div>
                                </div>
                            </div>
                        </div>`

        $("#lauchData").append(appendHtml);  // append data 
    }
} 

// addevent listner for filter year
$( ".launch-year-btn" ).click(function(e) {

    $("#lauchData").empty();
    console.log(e.target.value);
    queryParem.launch_year = e.target.value;
    $(".launch-year-btn").removeClass("active");    //remove active class
    $(e.target).addClass("active");                 // active button
    console.log(queryParem.launchYear);
    queryParem.offset = 0;
    getData();

  });

  
// addevent listner for launch success
  $( ".success-lunch-btn" ).click(function(e) {

    $("#lauchData").empty();
    console.log(e.target.value);
    queryParem.launch_success = e.target.value;
    $(".success-lunch-btn").removeClass("active");  // remove active class
    $(e.target).addClass("active");                 // active button
    console.log(queryParem.launchSuccess);
    queryParem.offset = 0;
    getData();
  });

  
  // addevent listner for land success
  $( ".success-land-btn" ).click(function(e) {

    $("#lauchData").empty();
    console.log(e.target.value);
    queryParem.land_success = e.target.value;       
    $(".success-land-btn").removeClass("active");   // remove active class
    $(e.target).addClass("active");                  // active button
    console.log(queryParem.landSuccess);
    queryParem.offset = 0;
    getData();
  });

