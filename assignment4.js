document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postalCode").value.trim();
    const province = document.getElementById("province").value;
    const age = document.getElementById("age").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value.trim();

    clearErrors();

    // Regex patterns
    const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    // Mandatory fields
    if (firstName === "") {
        showError("firstNameError", "First Name is required.");
        isValid = false;
    }

    if (lastName === "") {
        showError("lastNameError", "Last Name is required.");
        isValid = false;
    }

    if (address === "") {
        showError("addressError", "Address is required.");
        isValid = false;
    }

    if (city === "") {
        showError("cityError", "City is required.");
        isValid = false;
    }

    if (postalCode === "") {
        showError("postalCodeError", "Postal Code is required.");
        isValid = false;
    } else if (!postalRegex.test(postalCode)) {
        showError("postalCodeError", "Postal Code must be in Canadian format like A1A 1A1.");
        isValid = false;
    }

    if (province === "") {
        showError("provinceError", "Please select a province.");
        isValid = false;
    }

    if (age === "") {
        showError("ageError", "Age is required.");
        isValid = false;
    } else if (parseInt(age) < 18) {
        showError("ageError", "Age must be at least 18.");
        isValid = false;
    }

    if (password === "") {
        showError("passwordError", "Password is required.");
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError("passwordError", "Password must be at least 6 characters and include 1 uppercase letter and 1 digit.");
        isValid = false;
    }

    if (confirmPassword === "") {
        showError("confirmPasswordError", "Please confirm your password.");
        isValid = false;
    } else if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match.");
        isValid = false;
    }

    if (email === "") {
        showError("emailError", "Email is required.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (isValid) {
        alert("Thanks for registering with our website, your customer record was created successfully.");
        document.getElementById("registrationForm").reset();
    }
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => error.textContent = "");
}