function sendData(){
    fetch("http://localhost:3000/data",{
        methods:"post",
        headers:{
            "content-type":"application/json"        
    },
    body: Json.stringify({
        name: "Mouli",
        skill: "backend"
    })
    })
.then(res=>res.text())
.then(data => alert(data));

}
