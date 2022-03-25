async function adduser() {
  var firstname = document.getElementById("fname").value;
  var lastname = document.getElementById("lname").value;
  var username = document.getElementById("uname").value;
  var password = document.getElementById("pwd").value;
  var cpassword = document.getElementById("cpwd").value;
  if ((firstname, lastname, username, password, cpassword == "")) {
    alert("Field cannot be empty");
  } else {
    var userExist = await usercheck();
    // console.log(userExist, "user existssssss");
    if (!userExist) {
      if (cpassword == password) {
        var entry = {
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
        };
        fetch("http://127.0.0.1:5000/newuser", {
          method: "POST",
          body: JSON.stringify(entry),
          headers: new Headers({
            "content-type": "application/json",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            let li = `<tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>Username</th><th>Password</th></tr>`;
            json.forEach((task) => {
              li += `<tr>
                            <td><b>${task.id}</b></td>
                            <td><b>${task.firstname}</b></td>
                            <td><b>${task.lastname}</b></td>
                            <td><b>${task.username}</b></td>
                            <td><b>${task.password}</b></td>
                        </tr>`;
            });
          });
        alert("User Added");
        window.location.href = "login.html";
      } else {
        alert("Passwords do not match");
      }
    }
  }
}

function auth() {
  var username = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  if ((username, password == "")) {
    alert("Field cannot be empty");
  } else {
    var entry = { username: username, password: password };
    fetch("http://127.0.0.1:5000/auth", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json["auth"])
        // console.log(["auth"])
        if (json["auth"] == "True") {
          // alert("Correct")
          window.location.replace("alldata.html");
        } else {
          alert("Incorrect username or Password");
          document.getElementById("user").value = "";
          document.getElementById("pass").value = null;
        }
      });
  }
}
function openform() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("rbutton").style.visibility = "hidden";
  document.getElementById("loginbtn").style.visibility = "hidden";
}

async function usercheck() {
  var username = document.getElementById("uname").value;
  // console.log(username)
  var entry = { username: username };
  return await fetch("http://127.0.0.1:5000/allusername", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.auth == true) {
        alert("Username already exists");
        return true;
      } else {
        return false;
      }
    });
}

function verifyPassword(){
    var pw = document.getElementById("pwd").value;
    if(pw.length <8){
        document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
        return false;
    }
    if(pw.length >16){
        document.getElementById("message").innerHTML = "**Password length must not exceed 16characters";
        return false;
    }
    else{
        return true
    }
}
