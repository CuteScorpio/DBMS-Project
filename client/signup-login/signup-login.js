function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

let loginForm = document.getElementById("login");

// loginForm.addEventListener("submit", async (event) =>{
//     event.preventDefault();

//     const email = document.getElementById("login_email").value; 
//     const password = document.getElementById("login_password").value;
//     const loginData = {
//         email,
//         password
//     };
//     const response= await fetch("http://localhost:8000/user/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//     });

//     if (response.ok) {
//         const result = await response.json();
//         if(result.message === "Admin login successful"){
//             alert("Admin login Successfully!");
//             window.location.href = '../admin/admin.html';
//         } else if(result.token) {
//             localStorage.setItem("token", result.token);
//             alert("User login Successfully!");
//             window.location.href = '../dashboard/dashboard.html';
//         }
//     } else {
//         console.error("Failed to login user");
//         alert("Failed to login user");
//     }
// });

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login_email").value; 
    const password = document.getElementById("login_password").value;
    const loginData = { email, password };

    const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    if (response.ok) {
        const result = await response.json();
        
        if (result.token) {
            localStorage.setItem("token", result.token);
        
            if(result.message === "Admin login successful"){
                alert("Admin login Successfully!");
                window.location.href = '../admin/admin.html';
            }else{
                alert("User login Successfully!");
                window.location.href = '../dashboard/dashboard.html';
            }
        } else {
            alert("Authentication failed!");
        }
    } else {
        alert("Failed to login user");
    }
});



let registerForm = document.getElementById("register");

registerForm.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const firstName = document.getElementById("register_first_name").value; 
    const lastName = document.getElementById("register_last_name").value; 
    const email = document.getElementById("register_email").value;
    const password = document.getElementById("register_password").value;
    const registerData = {
        firstName,
        lastName,
        email,
        password
    };
    const response= await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("User registered Successfully!");
    } else {
        console.error("Failed to register user");
        alert("Failed to register user");
    }
});