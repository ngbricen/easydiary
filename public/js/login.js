$(document).ready(function() {
  // Getting references to the email and password
  var emailInput = $("#email");
  var pwdInput = $("#password");
  var messageDiv = $("#signinmessage");
  var user;

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#signin", handleAuthorFormSubmit);

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!emailInput.val().trim() || !pwdInput.val().trim()) {
      return;
    }
    else{
    	user = "/" + emailInput.val().trim() + "/" + pwdInput.val().trim();
    	$.get("/users" + user, function(data) {
	      console.log(data);
	      // console.log(data.id);
	      if (!data) {
	        displayNoUser();
	      }
	      else {
	      	console.log("yes");
	      	messageDiv.removeClass("alert alert-danger");
    			messageDiv.html("User Found");
	        window.location.href = "/add-diary/?user_id=" + data.id;
	      }
    	});
    }
  }

  // Function for handling what to render when there are no users
  function displayNoUser() {
    messageDiv.addClass("alert alert-danger");
    messageDiv.html("Username and/or password not found");
  }

});
















// $(document).ready(function() {

// 	// This function grabs diaries from the database and updates the view
//   function getdiaries(user) {
//     userId = user || "";
//     if (userId) {
//       userId = "/?user_id=" + userId;
//     }
//     $.get("/api/diaries" + userId, function(data) {
//       console.log("diaries", data);
//       diaries = data;
//       if (!diaries || !diaries.length) {
//         displayEmpty(user);
//       }
//       else {
//         initializeRows();
//       }
//     });
//   }
// }