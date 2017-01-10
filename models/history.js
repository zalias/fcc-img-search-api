var mongoose = require('../utils/db.js');

var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  term: { type: String, required: true },
  date: { type: Date , default: Date.now },
});

module.exports = mongoose.model('History', HistorySchema);