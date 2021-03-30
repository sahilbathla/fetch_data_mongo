const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  createdAt: Date,
  key: String,
  count: Array,
});

const RecordModel = mongoose.model('records', recordSchema);

RecordModel.filterData = (startDate, endDate, minCount, maxCount) => RecordModel.find({
  $expr: {
    $and: [
      { $gte: ['$createdAt', new Date(startDate)] },
      { $lte: ['$createdAt', new Date(endDate)] },
      { $gte: [{ $sum: '$counts' }, minCount] },
      { $lte: [{ $sum: '$counts' }, maxCount] },
    ],
  },
});

RecordModel.serialize = (records) => records.map((record) => {
  const { key, createdAt, counts } = record.toObject();
  return {
    key,
    createdAt,
    totalCount: counts.reduce((a, b) => a + b),
  };
});

module.exports = RecordModel;
