import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let listItem = [];

app.get("/", (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
    let day = today.toLocaleDateString("en-US", options);

  res.render("index.ejs", {newDay: day, listItem: listItem});
});

app.post("/", (req, res) => {
    let list = req.body.list;
    listItem.push(list);
    
    res.redirect("/");
})

app.post("/delete", (req, res) => {
  let index = req.body.index;
  
  if (index >= 0 && index < listItem.length) {
      listItem.splice(index, 1);
  }
  
  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });