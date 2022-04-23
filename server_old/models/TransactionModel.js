const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});
schema.method('toJSON', function () {
  const { __V, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
})
const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
