$(document).ready(function() {
  /* global moment */

  // diaryContainer holds all of our diaries
  var diaryContainer = $(".diary-container");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleDiaryDelete);
  $(document).on("click", "button.edit", handleDiaryEdit);
  // Variable to hold our diaries
  var diaries;

  // The code below handles the case where we want to get diary diaries for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getdiaries(userId);
  }
  // If there's no userId we just get all diaries as usual
  else {
    getdiaries();
  }


  // This function grabs diaries from the database and updates the view
  function getdiaries(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/diaries" + userId, function(data) {
      console.log("diaries", data);
      diaries = data;
      if (!diaries || !diaries.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete diaries
  function deleteDiary(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/diaries/" + id
    })
    .done(function() {
      getdiaries(DiaryCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed diary HTML inside diaryContainer
  function initializeRows() {
    diaryContainer.empty();
    var diariesToAdd = [];
    for (var i = 0; i < diaries.length; i++) {
      diariesToAdd.push(createNewRow(diaries[i]));
    }
    diaryContainer.append(diariesToAdd);
  }

  // This function constructs a diary's HTML
  function createNewRow(diary) {
    var formattedDate = new Date(diary.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newDiaryPanel = $("<div>");
    newDiaryPanel.addClass("panel panel-default");
    var newDiaryPanelHeading = $("<div>");
    newDiaryPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newDiaryTitle = $("<h2>");
    var newDiaryDate = $("<small>");
    var newDiaryAuthor = $("<h5>");
    newDiaryAuthor.text("Written by: " + Diary.Author.name);
    newDiaryAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newDiaryPanelBody = $("<div>");
    newDiaryPanelBody.addClass("panel-body");
    var newDiaryBody = $("<p>");
    newDiaryTitle.text(Diary.title + " ");
    newDiaryBody.text(Diary.body);
    newDiaryDate.text(formattedDate);
    newDiaryTitle.append(newDiaryDate);
    newDiaryPanelHeading.append(deleteBtn);
    newDiaryPanelHeading.append(editBtn);
    newDiaryPanelHeading.append(newDiaryTitle);
    newDiaryPanelHeading.append(newDiaryAuthor);
    newDiaryPanelBody.append(newDiaryBody);
    newDiaryPanel.append(newDiaryPanelHeading);
    newDiaryPanel.append(newDiaryPanelBody);
    newDiaryPanel.data("Diary", Diary);
    return newDiaryPanel;
  }

  // This function figures out which Diary we want to delete and then calls deleteDiary
  function handleDiaryDelete() {
    var currentDiary = $(this)
      .parent()
      .parent()
      .data("Diary");
    deleteDiary(currentDiary.id);
  }

  // This function figures out which Diary we want to edit and takes it to the appropriate url
  function handleDiaryEdit() {
    var currentDiary = $(this)
      .parent()
      .parent()
      .data("Diary");
    window.location.href = "/cms?Diary_id=" + currentDiary.id;
  }

  // This function displays a messgae when there are no diaries
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    diaryContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No diaries yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    diaryContainer.append(messageh2);
  }

});
