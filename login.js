
document.getElementById("loginForm").addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // fetch data 
    const response = await fetch('https://6a2ef1cdc9776ca6c0c5203c.mockapi.io/users', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });
    const users = await response.json();
    console.log(users);

    const user = users.find(u =>{
        return userName == u.userName && password == u.password
    });
    console.log(user);

    if(user){
        localStorage.setItem("loggedUser", JSON.stringify(user));
        document.getElementById("msg").innerHTML=`Logged in , Welcome ${user.name}`;
        document.getElementById("msg").style.color="green";
        document.getElementById("welcome").innerHTML=`Welcome ${user.name} !`
        setTimeout(()=>{
            window.location.href="index.html";
        },2000);
    }
    else{
        document.getElementById("msg").innerHTML="Invalid Credentials";
    }
    
});