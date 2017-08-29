$(document).ready(function() {
  // Getting references to the email and password
  var nameInput = $("#inputName");
  var emailInput = $("#inputEmail");
  var pwdInput = $("#inputPassword");
  // var messageDiv = $("#signinmessage");
  // var user;

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("click", "#signUpButton", handleAuthorFormSubmit);

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!emailInput.val().trim() || !pwdInput.val().trim() || !nameInput.val().trim()) {
      return;
    }
    else{

      var newUser = {
        name: nameInput.val().trim(),
        email: emailInput.val().trim(),
        password_hash: pwdInput.val().trim()
      };

    	$.post("/api/users", newUser, function(data) {
	      console.log(data);
        window.location.href = "/view-diary/?user_id=" + data.id;
    	});
    }
  }

});