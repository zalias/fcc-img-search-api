var rp = require("request-promise");
var History = require("../models/history.js");

exports.search = function (req, res) {
  var bing_url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + encodeURIComponent(req.params.query) + "&count=20";
  if ('offset' in req.query){
    bing_url += "&offset=" + req.query.offset;
  }
  console.log(bing_url);
  var options = {
    url: bing_url,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    },
    simple: true
  };
  
  rp(options)
    .then(function (body) {
      var result = JSON.parse(body).value.map(function(image){
        return {
          "url" : image.contentUrl,
          "snippet" : image.name,
          "thumbnail" : image.thumbnailUrl,
          "context" : image.hostPageDisplayUrl //Bing sometimes returns partial Source Page Url
        };
      });
      new History({term : req.params.query}).save();
      res.send(result);
    })
    .catch(function (err) {
      console.log(err); 
    });
};

exports.latest = function(req, res){
  History
    .find({})
    .limit(10)
    .sort({date: -1})
    .select({ _id: 0, term : 1, date : 1})
    .exec(function (err, docs) {
      if (err){
        console.log(err);
        res.end();
      }
      res.send(docs);
    });
};

exports.home_page = function(req, res){
  res.render('index.pug', {hostname : process.env.HOST_NAME});
};