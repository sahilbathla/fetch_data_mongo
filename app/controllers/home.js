const express = require('express');
const { body, validationResult } = require('express-validator');
const RecordModel = require('../models/records');

const router = express.Router();
let firstError = null;

const isValidRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  // code 1 denotes validation error
    [firstError] = errors.array();
    return false;
  }
  return true;
};

// get the request for filtering data
// Assumption is all paramters are required
router.post(
  '/',
  body('startDate').isDate(),
  body('endDate').isDate().custom((endDate, { req }) => {
    // Todo - optimize by moving it to a custom validator file
    if (endDate < req.body.startDate) {
      throw new Error('End Date cannot be less than start date');
    }
    return true;
  }),
  body('minCount').isNumeric(),
  body('maxCount').isNumeric().custom((maxCount, { req }) => {
    // Todo - optimize by moving it to a custom validator file
    if (maxCount < req.body.minCount) {
      throw new Error('Max count cannot be less than min count');
    }
    return true;
  }),
  (req, res) => {
    if (!isValidRequest(req)) {
      return res.status(400).json({ code: 1, msg: `${firstError.param}:${firstError.msg}` });
    }

    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;

    // code 2 denotes DB query error
    return RecordModel.filterData(startDate, endDate, minCount, maxCount)
      .then((records) => {
        res.json({
          code: 0,
          msg: 'Success',
          records: RecordModel.serialize(records),
        });
      })
      .catch((e) => res.status(400).json({ code: 2, msg: e.toString() }));
  },
);

module.exports = router;
