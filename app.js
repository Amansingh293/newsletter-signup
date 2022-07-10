const express = require("express");

const app = express();

const https = require("https"); //request replacement

const client = require("mailchimp-marketing");

const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));





app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {

  client.setConfig({
    apiKey: "17b72c207024dafb38f95f2be77dc595-us18",
    server: "us18",
  });

  const firstName = req.body.firstName;

  const secondName = req.body.secondName;

  const email = req.body.email;

  const phone = req.body.pnumber;

  const birthday = req.body.bday;

  const listId = "5ba9f98a44";

  async function run() {
    const response = await client.lists.batchListMembers("5ba9f98a44", {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
          PHONE: phone,
        }
      }],
    });

    console.log(response);

    if (response.error_count === 0) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});




app.listen(process.env.PORT || 3000, function() {

  console.log("server is running on 3000 port");
});



// 17b72c207024dafb38f95f2be77dc595-us18     api key

// 5ba9f98a44  AUD ID
