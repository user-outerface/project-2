// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


/*reverseChanger takes the response from the
api and converts it to */
function reverseChanger(oldArr) {
  var newArr = oldArr.split("");
  console.log("hit");
  console.log(newArr);
  for (var i = 0; i < newArr.length; i++) {
    if (newArr[i] === "_") {
      newArr[i] = "/";
    } else if (newArr[i] === "-") {
      newArr[i] = "+";
    }
  };
  newArr = newArr.join("");
  console.log(newArr);
  return newArr;
};

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function () {
  var apiKey = 'AIzaSyDUAyBLdCKvyP-bqD34KxmwqtzPpCHBVrY';
  getPageSpeedInsightsFor('http://craigslist.org', apiKey);
});

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
    console.log(response.screenshot.data);
    console.log(response);
    reverseChanger(response.screenshot.data);
    $("#test").append(`<h1>hello world</h1>`);
    $("#test").append(`<img src="data:image/jpeg;base64, ${reverseChanger(response.screenshot.data)}" alt="screenshot">`);

  });

}


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



