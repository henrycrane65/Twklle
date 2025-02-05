console.log({
    userID: username,
    password: password,
});

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
    console.log(response); // Log the response for debugging
    if (response.ok) {
        setCookie("username", username, 30);
        window.location.href = "./thanks.html";
    } else {
        passerror.style.fontSize = "small";
        passerror.innerHTML = "There was an error processing your request.";
    }
})
.catch(function(error) {
    passerror.style.fontSize = "small";
    passerror.innerHTML = "There was an error processing your request.";
});
