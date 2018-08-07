// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


/*reverseChanger takes the response from the
api and converts it to */
function reverseChanger(oldStr){
  // var newArr = oldArr.split("");
  // console.log("hit");
  // // console.log(newArr);
  // for (var i = 0; i < newArr.length; i ++){
  //     if(newArr[i] === "_"){
  //         newArr[i] = "/";
  //     } else if (newArr[i] === "-"){
  //         newArr[i] = "+";
  //     }
  // }; 
  // newArr = newArr.join("");
  // console.log(newArr);
  // var mapObj = {["_"]: "/", ["-"]: "+"};
  // var re = new RegExp(Object.keys(mapObj).join("|"), "g");
  // return oldStr.replace(re, function(matched){
  //   return mapObj[matched];
  // }); 
  return oldStr.replace(/_/g, "/").replace(/-/g, "+");
};

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


function errorFunction(xhr, status, error) {
  if (xhr.responseJSON.error) {
    var errors = xhr.responseJSON.error.errors
    for (var i = 0; i < errors.length; ++i) {
      alert(errors[i].message);
    }
  }
  return;
}

function displayPageScore(result, status, xhr) {
  score = result.ruleGroups.SPEED.score
  console.log(score);
}

//Gives display picture for page
function getPageSpeedInsightsFor(URL, API_KEY) {
  var API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?screenshot=true&strategy=mobile&';
  var query = [
    'url=' + URL,
    'key=' + API_KEY,
  ].join('&');
  $.ajax({
    url: API_URL + query,
    type: "GET",
  }).then(function (response) {
    // console.log(response.screenshot.data);
    $(".dump").empty();
    $(".dump").append(`<img src="data:image/jpeg;base64, ${reverseChanger(response.screenshot.data)}" alt="screenshot">`)
    reverseChanger(response.screenshot.data);
    console.log(reverseChanger(response.screenshot.data));
  });
  
}

//button for display
$(".peek-a-boo").click(function(){
  urlSeeker = $(this).data("site");
  $.ajax("/api/peeker/", {
    type: "GET"
  }).then(response =>{
    // console.log(response.api_key);
    console.log("hit");
    var apiKey = response.api_key;
    getPageSpeedInsightsFor("http://" + urlSeeker, apiKey);
  });
});