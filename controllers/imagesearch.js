var rp = require("request-promise");

exports.search = function (req, res) {
  var bing_url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + encodeURIComponent(req.params.query) + "&count=20"
  if ('offset' in req.query){
    bing_url += "&offset=" + req.query.offset;
  }
  console.log(bing_url);
  //TODO: Save req.params.query and Date to MongoDB
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
      res.send(result);
    })
    .catch(function (err) {
      console.log(err); 
    });
};

exports.latest = function(req, res){
  
};