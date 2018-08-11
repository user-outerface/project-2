// $("body").append(`<img src='data', ${varForDataStringGoesHere}`);
$("body").append(`<h1>hello world</h1>`);

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
    //   console.log(response.screenshot.data);
    //   reverseChanger(response.screenshot.data);
    $("body").append(`<img src="data:image/jpeg;base64, ${reverseChanger(response.screenshot.data)}" alt="screenshot">`)
    });
   
}

function reverseChanger(oldArr){
    var newArr = oldArr.split("");
    for (var i = 0; i < newArr.length; i ++){
        if(newArr[i] === "_"){
            newArr[i] = "/";
        } else if (newArr[i] === "-"){
            newArr[i] = "+";
        }
    }; 
    newArr = newArr.join("");
    return newArr;
  };

$(document).ready(function () {
var apiKey = 'AIzaSyDUAyBLdCKvyP-bqD34KxmwqtzPpCHBVrY';
getPageSpeedInsightsFor('http://www.reddit.com', apiKey);
})