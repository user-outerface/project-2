// Get references to page elements
var $quoteText = $("#quote-text");
var $quoteDescription = $("#quote-description");
var $submitBtn = $("#submit");
var $quoteList = $("#quote-list");
//sets update switcher
var urlUpdater = false;


/*reverseChanger takes the response from the
api and converts it to */
function reverseChanger(oldStr) {
  return oldStr.replace(/_/g, "/").replace(/-/g, "+");
};

// The API object contains methods for each kind of request we'll make
var API = {
  saveQuote: function (quote) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/quotes",
      data: JSON.stringify(quote)
    });
  },
  getQuotes: function () {
    return $.ajax({
      url: "api/quotes",
      type: "GET"
    });
  },
  deleteQuote: function (id) {
    return $.ajax({
      url: "api/quotes/" + id,
      type: "DELETE"
    });
  }
};

// refreshQuotes gets new quotes from the db and repopulates the list
var refreshQuotes = function () {
  API.getQuotes().then(function (data) {
    var $quotes = data.map(function (quote) {
      var $a = $("<a>")
        .text(quote.text)
        .attr("href", "/quote/" + quote.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": quote.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $quoteList.empty();
    $quoteList.append($quotes);
  });
};

// handleFormSubmit is called whenever we submit a new quote
// Save the new quote to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var quote = {
    text: $quoteText.val().trim()
  };

  API.saveQuote(quote).then(function () {
    refreshQuotes();
  });

  $quoteText.val("");
  $quoteDescription.val("");
};

// handleDeleteBtnClick is called when an quote's delete button is clicked
// Remove the quote from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteQuote(idToDelete).then(function () {
    refreshQuotes();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$quoteList.on("click", ".delete", handleDeleteBtnClick);


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
function getPageSpeedInsightsFor(URL, API_KEY, divId) {
  var API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?screenshot=true&strategy=mobile&';
  var query = [
    'url=' + URL,
    'key=' + API_KEY,
  ].join('&');
  $.ajax({
    url: API_URL + query,
    type: "GET",
  }).then(function (response) {
    console.log("hit");
    // $(".dump").empty();
    // $(".dump").append(`<img src="data:image/jpeg;base64, ${reverseChanger(response.screenshot.data)}" alt="screenshot">`)
    // reverseChanger(response.screenshot.data);
    // console.log(reverseChanger(response.screenshot.data));
    var imgB64 = "url('data:image/jpeg;base64, " + reverseChanger(response.screenshot.data) + "')";
    //so the background image is working, but it makes
    //the html look like garbage
    $("#" + divId).css("background-image", imgB64);
    console.log("fin");
  });

}

//button for display
// $(".peek-a-boo").click(function(){
//   urlSeeker = $(this).data("site");
//   $.ajax("/api/peeker/", {
//     type: "GET"
//   }).then(response =>{
//     console.log("hit");
//     var apiKey = response.api_key;
//     getPageSpeedInsightsFor("http://" + urlSeeker, apiKey);
//   });
// });
$(".peek-a-boo").text("intentionally broken");

function baseInfection() {
  $(".ajax-iterator").each(function () {
    var targeter = $(this).attr("id");
    console.log(targeter);
    var urlPusher = $("section#" + targeter).find("div.url-spell").text().trim();
    console.log(urlPusher);
    $.ajax('/api/peeker/', {
      type: "GET"
    }).then(response => {
      var apiKey = response.api_key;
      getPageSpeedInsightsFor("http://" + urlPusher, apiKey, targeter);
      console.log("hit init");
    });
  });
};

function makeid(idType) {
  var text = idType + Math.round(new Date().getTime() / 1000);
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//pushes a new url into the users array of objects for urls
function hitMeUp() {
  $("#submit-me").click(function (event) {
    event.preventDefault();
    var urlPasser = {
      uId: makeid("url"),
      url: $("#url-me-up").val().trim(),
      comment: $("#comment-me-up").val().trim(),
      filePath: $("#path-me-up").val().trim()
    };
    $.ajax("/api/mongo/new-url", {
      type: "PUT",
      data: urlPasser
    }).then(function () {
      location.reload();
    });

  });
};

//deletes urls from the users array of objects for urls
function deleteMeUp() {
  $(".delete-me").click(function () {
    var idPass = {
      uId: $(this).data("id")
    };
    $.ajax('/api/mongo/del-url', {
      type: "PUT",
      data: idPass
    }).then(function () {
      location.reload();
    })
  });
}

//initiates an update instance. Can save or cancel update at this point
function updateInit() {
  $(".change-me").click(function () {
    if ($(this).attr("data-update") === "true" || urlUpdater === true) {
      return;
    };
    urlUpdater = true;
    $(this).attr("data-update", "true");
    var idGab = $(this).data("id");
    $(".url-grabber-" + idGab).replaceWith(function () {
      return $(`<input class="${$(this).attr("class")}">`)
        .val($(this).text().trim());
    });
    $(".url-house-" + idGab).append(`<button class="cancel-me delete-on-save">cancel</button>
      <button class="save-me delete-on-save">Save</button><hr><hr>`);
    selectorPasser = $(this);
    updateCancel(idGab, selectorPasser);
    updateMeUp(idGab, selectorPasser);
  });
}

//cancels update
function updateCancel(idPlac, selectorTaker) {
  $(".cancel-me").click(function () {
    urlUpdater = false;
    selectorTaker.attr("data-update", "false");
    location.reload();
  });
}

//saves update to database
function updateMeUp(idPlac, selectorTaker) {
  $(".save-me").click(function () {
    var newUrlParams = {
      uId: idPlac,
      url: $(".url-" + idPlac).val().trim(),
      comment: $(".comment-" + idPlac).val().trim(),
      filePath: $(".path-" + idPlac).val().trim()
    }
    $.ajax("/api/mongo/up-url", {
      type: "PUT",
      data: newUrlParams
    }).then(results => {
      location.reload();
    });
  });
}


//makes a new user. This needs to be dynamically functional
//right now it is static
$(".new-user").click(function () {
  var newUseId = {
    usId: makeid("user")
  }
  $.ajax('/api/mongo/user-new', {
    type: "POST",
    data: newUseId
  }).then(results => {
    console.log(results);
  });
});

//deletes a user. This needs to be dynamically functional
//right now it is static
$(".delete-user").click(function () {
  $.ajax('/api/mongo/user-delete', {
    type: "DELETE"
  }).then(results => {
    console.log(results);
  });
});

$(document).ready(function () {
  hitMeUp();
  deleteMeUp();
  updateInit();
  baseInfection();
  console.log("yo");
});