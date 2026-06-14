//const api = "https://6a2ef1cdc9776ca6c0c5203c.mockapi.io/users";

const form = document.getElementById("registerForm");
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // create user pbject 

    let newUsers = {
        name: name,
        userName: userName,
        password : password,

    };
    // ajax post , try catch use panna better 
    const response = await fetch('https://6a2ef1cdc9776ca6c0c5203c.mockapi.io/users', {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(newUsers)
    });
    console.log(response);

    const data = await response.json();
    console.log(data);

    
    document.getElementById("msg").innerHTML = "Registered Successfully";

      setTimeout(()=>{
        window.location.href="login.html";
    },2000);

});


