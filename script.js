document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    if (document.getElementById("userGreeting")) {
        if (!username) {
            alert("Please log in first.");
            window.location.href = "index.html";
        } else {
            document.getElementById("userGreeting").innerText = `Welcome, ${username}`;
        }
    }

    if (document.getElementById("from")) {
        loadCurrencies();
    }
});

// Register a new user
function register() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    if (newUsername && newPassword) {
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);
        alert("Registration successful! Please log in.");
        showLogin();
    } else {
        alert("Please fill in both fields.");
    }
}

// Login user
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        window.location.href = "converter.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Logout user
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "index.html";
}

// Show register form
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// Show login form
function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Load currency options dynamically
async function loadCurrencies() {
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await response.json();
    let currencyOptions = Object.keys(data.rates);
    
    let fromSelect = document.getElementById("from");
    let toSelect = document.getElementById("to");

    currencyOptions.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "INR";
}

// Convert currency
async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (!amount) {
        alert("Please enter an amount.");
        return;
    }

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        let data = await response.json();
        let rate = data.rates[to];
        let result = amount * rate;

        document.getElementById("result").innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    } catch (error) {
        alert("Error fetching exchange rates. Try again.");
    }

    // Logout function
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Redirect to login page
}

// Ensure the username is displayed when logged in
window.onload = function () {
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${username}!`;
        document.getElementById("logoutBox").style.display = "block";
    }
};

}