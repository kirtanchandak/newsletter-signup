const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { post } = require("request");
const { get } = require("express/lib/response");
const https = require("https"); 

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 

app.listen(process.env.PORT || 5000, function() {
    console.log("Server is started at port 5000");
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const name = req.body.name; 
    const emailid = req.body.emailid; 
    const data = {
      members: [
        {
          email_address: emailid,
          status: "subscribed",
          merge_fields: {
            FNAME: name
          }
        }
      ]
    };

   const jsondata = JSON.stringify(data);
   const url = "https://us10.api.mailchimp.com/3.0/lists/e71c921097"
   const options = {
     method: "POST",
     auth: "kirtan1:087bbdbb7050487e9faab9f8fd9c3401-us10"
   }
   
   const request = https.request(url, options, function(response) {

    if(response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html")
    } else {

    }

      response.on("data", function(data) {
        console.log(JSON.parse(data));
      })
   })
   
   request.write(jsondata);
   request.end();
}) 

//API key -
// 087bbdbb7050487e9faab9f8fd9c3401-us10

//List id -
// e71c921097