$(document).ready(function() {
  // Getting jQuery references to the post body, title and form
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var isPublicInput = $("#isPublic");
  var entryForm = $("#entry");
  // Adding an event listener for when the form is submitted
  $(entryForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var diaryId;
  var userId;
  var userPortion;
  var diaryPortion


  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // If user and diary information were passed in
  if (url.indexOf("?diary_id=") !== -1) {
    if (url.indexOf("&user_id=") !== -1){
      diaryPortion = url.split("&")[0];
      userPortion = url.split("&")[1];
      diaryId = diaryPortion.split("=")[1];
      userId = userPortion.split("=")[1];
    }
     // If only diary information was passed in
    else{
      diaryId = url.split("=")[1]; 
    }
    getDiaryData(diaryId, "diary");
  }
  // Otherwise if we have an user_id in our url, use this id to save to the database as the editor of diary
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getDiaryData(userId, "user");
  }

  //Redirect to log in if the user was not entered
  if (!userId){
    if (diaryId){
      $("#diarySubmit")[0].disabled = true;
    }
    else{
      window.location.href = "/login";
      $("#diarySubmit").disabled = false;
    }
  }



  // Getting the users, and their diaries
  // getUsers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body and title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newDiary = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      isPublic: isPublicInput[0].checked,
      UserId: userId
    };

    console.log(newDiary);

    // If we're updating a diary run updateDiary to update a diary entry
    // Otherwise run submitDiary to create a whole new Diary
    if (updating) {
      newDiary.id = diaryId;
      updateDiary(newDiary);
    }
    else {
      submitDiary(newDiary);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitDiary(diary) {
    $.post("/api/diaries", diary, function() {
      window.location.href = "/view-diary?user_id=" + userId;
    });
  }

  // Gets diary data for the current diary if we're editing, or if we're adding to an author's existing posts
  function getDiaryData(id, type) {
    var queryUrl;
    switch (type) {
      case "diary":
        queryUrl = "/api/diary/" + id;
        updating = true;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        var userName;

        //Different Get queries are run depending on whether or not we are updating or adding a new record
        if (updating){
          userName = data.User.name;
          titleInput.val(data.title);
          bodyInput.val(data.body);
          isPublicInput[0].checked = data.isPublic;
          $("#diarySubmit")[0].textContent = "Update";
        }
        else{
          userName = data.name;
        }

        console.log(data.id);
        userId = data.id;
        // If we have a diary with this id, set a flag for us to know to update the post
        // when we hit submit
        $("#userWelcome").html("Welcome <strong>" + userName + "</strong>");
        $("#signin").hide();

        //Display diary container for data entry
        $(".hidden").removeClass("hidden");
      }
    });
  }

  // Update a given Diary, bring user to the blog page when done
  function updateDiary(diary) {
    $.ajax({
      method: "PUT",
      url: "/api/diaries",
      data: diary
    })
    .done(function() {
      window.location.href = "/view-diary?user_id=" + userId;
    });
  }
});
