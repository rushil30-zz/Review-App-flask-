function add(){
    let confirmAction = confirm("Are you sure you want to add review");
if (confirmAction) {
    var department = document.getElementById("department1").value;
    var review = document.getElementById("review1").value;
    if (review ==""){
        alert("Review cannot be empty");
    }
    else{
    var status = document.getElementById("status1").value;
    var entry = {"department":department, "review":review, "status":status};
    fetch("http://127.0.0.1:5000/addnew", {
        method: "POST",
        body: JSON.stringify(entry),
        headers: new Headers({
                        "content-type": "application/json"
        })
    })
        .then(response => response.json())
        .then(json => {
           let li = `<tr><th>ID</th><th>Department</th><th>Review</th><th>Status</th></tr>`;
           json.forEach(task => {
               li += `<tr>
                           <td><b>${task.id}</b></td>
                           <td><b>${task.department}</b></td>
                           <td><b>${task.review}</b></td>
                           <td><b>${task.status}</b></td>
                       </tr>`;
         });
         document.getElementById("data").innerHTML = li; 
         document.getElementById("department1").value = null; 
         document.getElementById("review1").value = null; 
         document.getElementById("status1").value = null; 
        })
        alert("Review Added")
        window.location.href = "login.html"}}
    else{
        alert("Action Cancelled")
    }    
};

function loaddata(){
    fetch("http://127.0.0.1:5000/getdata", {mode:'cors'})

    .then(response => response.json())
    .then(json => {

        let li = `<tr><th style="padding:10px">ID</th><th>Department</th><th>Review</th><th>Status</th></tr>`;

        json["data"].forEach(task => {
            li += `<tr>
                        <td style="padding:13px">${task.id}</td>
                        <td>${task.department}</td>
                        <td>${task.review}</td>
                        <td>${task.status}</td>
                   </tr>`;     
            
        });
        var rathr = document.getElementById("hrrat");
        rathr.innerText = "Average Rating HR:"+" "+json["avghr"];
        var ratacc = document.getElementById("accrat");
        ratacc.innerText = "Average Rating Accounts:"+" "+json["avgacc"];
        var ratit = document.getElementById("itrat");
        ratit.innerText = "Average Rating IT:"+" "+json["avgit"];
        var ratsup = document.getElementById("suprat");
        ratsup.innerText = "Average Rating Support:"+" "+json["avgsup"];

        document.getElementById("data").innerHTML = li;
    })
};

function logout(){
    let confirmAction = confirm("Are you sure you want to Logout");
if (confirmAction) {
    window.location.href = "login.html"
}
// else{
// }
}