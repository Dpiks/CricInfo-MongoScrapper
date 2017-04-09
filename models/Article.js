// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  matchTitle: {
    type: String,
    required: true
  },
  storyTitle: {
    type: String,
    required: true
  },
  story:{
    type: String,
    required: true
  },
  // link is a required string
  imgLink: {
    type: String,
    required: true
  },
  articleLink: {
    type: String,
    required: true
  }, 
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;