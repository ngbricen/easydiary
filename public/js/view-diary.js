$(document).ready(function() {
  /* global moment */

  // diaryContainer holds all of our diaries
  var diaryContainer = $(".diary-container");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleDiaryDelete);
  $(document).on("click", "button.edit", handleDiaryEdit);
  $(document).on("click", "button.public", handleDiaryPublic);

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
    // if (userId) {
    //   userId = "/?user_id=" + userId;
    // }
    $.get("/api/diaries/" + userId, function(data) {
      console.log("diaries", data);
      diaries = data;
      if (diaries) {
        //If the user is found, display the user's name
        if (userId){
          if (!diaries[0].Diaries.length){
            user = diaries[0].name;
            displayEmpty(user, true);
          }
          else{
            initializeRows();
          }
        }
        else{
          initializeRows();
        } 
      }
      else {
        displayEmpty(userId, false);
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
      getdiaries(userId);
    });
  }

// This function does an API call to delete diaries
  function changeDiaryVisbility(diary) {
    $.ajax({
      method: "PUT",
      url: "/api/diaries",
      data: diary,
      url: "/api/diaries/" + diary.id
    })
    .done(function() {
      getdiaries(userId);
    });
  }

  // InitializeRows handles appending all of our constructed diary HTML inside diaryContainer
  function initializeRows() {
    diaryContainer.empty();
    var diariesToAdd = [];
    var diariesToDisplay = [];

    //If a user is being passed in, display only the diary entry for that user,
    //Otherwise display all the entries that have been set public   
    if (userId){
      diariesToDisplay = diaries[0].Diaries.filter(function (el) {return (el.UserId === parseInt(userId))});;
    }
    else{
      diariesToDisplay = diaries.filter(function (el) {return (el.isPublic === true)});;
    } 

    for (var i = 0; i < diariesToDisplay.length; i++) {
        diariesToAdd.push(createNewRow(diariesToDisplay[i]));
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
    var publicBtn = $("<button>");

    //If Diary is public, change the the display appropriately
    if (diary.isPublic){
      publicBtn.text("Make Private");
    }
    else{
      publicBtn.text("Make Public"); 
    }
    publicBtn.addClass("public btn btn-info");
    var newDiaryTitle = $("<h2>");
    var newDiaryDate = $("<small>");
    var newDiaryUser = $("<h5>");
    newDiaryUser.text("Written by: " + diaries.name);
    newDiaryUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newDiaryPanelBody = $("<div>");
    newDiaryPanelBody.addClass("panel-body");
    var newDiaryBody = $("<p>");
    newDiaryTitle.text(diary.title + " ");
    newDiaryBody.text(diary.body);
    newDiaryDate.text(formattedDate);
    newDiaryTitle.append(newDiaryDate);
    newDiaryPanelHeading.append(deleteBtn);
    newDiaryPanelHeading.append(editBtn);
    newDiaryPanelHeading.append(publicBtn);
    newDiaryPanelHeading.append(newDiaryTitle);
    newDiaryPanelHeading.append(newDiaryUser);
    newDiaryPanelBody.append(newDiaryBody);
    newDiaryPanel.append(newDiaryPanelHeading);
    newDiaryPanel.append(newDiaryPanelBody);
    newDiaryPanel.data("Diary", diary);
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
    window.location.href = "/add-diary?diary_id=" + currentDiary.id;
  }

  // This function figures out which Diary we want to make public and runs the updation
  function handleDiaryPublic() {
    var currentDiary = $(this)
      .parent()
      .parent()
      .data("Diary");
    currentDiary.isPublic = !currentDiary.isPublic
    changeDiaryVisbility(currentDiary);
  }

  // This function displays a messgae when there are no diaries
  function displayEmpty(id, isUserFound) {
    var query = window.location.search;
    var partial = "";
    if (id && isUserFound) {
      partial = " for " + id;
      //Update the login Message
      $("#userWelcome").html("Welcome <strong>" + id + "</strong>");
      $("#signin").hide();
    }
    else if (id && !isUserFound) {
      partial = " for User #" + id;
      $("#signin").show();
    }
    diaryContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No diaries yet" + partial + ", navigate <a href='/add-diary" + query +
    "'>here</a> in order to get started.");
    diaryContainer.append(messageh2);
  }

});
