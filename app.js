const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Successfully connected to database.");
  }
})

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    console.log();
    console.log();

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })

    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("All articles deleted successfully");
      } else {
        res.send(err)
      }
    })
  })




app.listen(3000, function () {
  console.log("Server started on port 3000");
});

/*
[
    {
        "_id": "60aa2bb3c69c7d2cfc1b4b47",
        "title": "Shan Leo",
        "content": "Explore Mario Arends's board \"Random shit\" on Pinterest. See more ideas about bones funny, best funny pictures, nato phonetic alphabet.",
        "__v": 0
    },
    {
        "_id": "60aa32696c24b428849c82b2",
        "title": "Imalsha Sandeepani",
        "content": "Amazingly loving",
        "__v": 0
    }
] */