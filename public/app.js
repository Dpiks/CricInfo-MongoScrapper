$(document).on("click", "#btn_scrape", function() {
    $("#articles").empty();

    $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .done(function(data) {
            console.log(data);
            $("#articles").show();
            $("#savedArticles").hide();
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                var newDiv = $("<div>");
                newDiv.addClass("div_article");

                // newDiv.attr('')               
                newDiv.attr('matchTitle', data[i].matchTitle);
                newDiv.attr('storyTitle', data[i].storyTitle);
                newDiv.attr('articleLink', data[i].articleLink);

                newDiv.append("<p class='match_title'>" +data[i].matchTitle + "</p>");
                newDiv.append("<a href='" + data[i].articleLink + "' target=_blank>" + data[i].storyTitle + "</a>");
                newDiv.append("<img class='img_wrap' src='" + data[i].imgLink + "'>");
                newDiv.append("<p class='p_story'>" + data[i].story + "</p>")
                newDiv.append("<button class='btn_saveArticle' data-id='" + data[i]._id + "'> Save article </button>");

                $("#articles").append(newDiv);
            }

        });
});


$(document).on("click", ".btn_saveArticle", function() {

    $.ajax({
            method: "POST",
            url: "/saveArticle",
            data: {
                matchTitle: $(this).parent().attr("matchTitle"),
                storyTitle: $(this).parent().attr("storyTitle"),
                articleLink: $(this).parent().attr("articleLink"),
                story: $(this).parent().find("p").text(),
                imgLink: $(this).parent().find("img").attr("src")
            }
        })
        .done(function(data) {
            // remove saved artice from the Scraped articles list
            $(this).parent().hide();
        });
});

//Delete a saved article
$(document).on("click", ".btn_delArticle", function() {
	console.log("Delete article button clicked");
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/deleteArticle/" + thisId
    }).done(function(data) {
        $(this).parent().hide();
    });

});
//Display empty/existing notes
$(document).on("click",".btn_notes",function(){
	// Empty the notes from the note section

  $("#notes").empty();
  $("#notes").show();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h4>" + data.matchTitle + "</h4>");
      $("#notes").append("<h2>" + data.storyTitle + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button class='btn-primary' data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

//To save notes
// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});






//Display all saved articles
$(document).on("click", "#btn_savedArticles", function() {
	$("#notes").hide();
	$("#savedArticles").empty();
    $.ajax({
        method: "GET",
        url: "/savedArticles"
    }).done(function(data) {
        $("#articles").hide();
        $("#savedArticles").show();
        $("#btn_scrape").hide();
        //display all saved articles
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            var newDiv = $("<div>");
            newDiv.addClass("div_savedArticle");

            // newDiv.attr('')               
            newDiv.attr('matchTitle', data[i].matchTitle);
            newDiv.attr('storyTitle', data[i].storyTitle);
            newDiv.attr('articleLink', data[i].articleLink);


            newDiv.append("<a href='" + data[i].articleLink + "' target=_blank>" + data[i].storyTitle + "</a>");
            newDiv.append("<img src='" + data[i].imgLink + "'>");
            newDiv.append("<p>" + data[i].story + "</p>")
            newDiv.append("<button class='btn_notes btn-primary' data-id='" + data[i]._id + "'> Add Notes </button>");
            newDiv.append("<button class='btn_delArticle btn-warning' data-id='" + data[i]._id + "'> Delete Article </button>");


            $("#savedArticles").append(newDiv);

        }

    });
});

$(document).on("click", "#btn_home", function() {


});


window.onload=function(){
	$("#articles").hide();
	$("#savedArticles").hide();
	$("#notes").hide();
}
