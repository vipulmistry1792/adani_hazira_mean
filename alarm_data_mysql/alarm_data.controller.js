const express = require('express');
const router = express.Router();
const alarm = require('../services/alarm');
/* GET alarm listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await alarm.getMultiple_last10());
  } catch (err) {
    console.error(`Error while getting alarm `, err.message);
    next(err);
  }
});
router.get('/status', async function(req, res, next) {
    try {
      res.json(await alarm.getstatusalaram());
    } catch (err) {
      console.error(`Error while getting alarm `, err.message);
      next(err);
    }
  });
  router.put('/:id',update);
  function update(req, res, next) {
    alarm.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
  // /* POST alarm */
  // router.post('/', async function(req, res, next) {
  //   try {
  //     res.json(await alarm.create(req.body));
  //   } catch (err) {
  //     console.error(`Error while posting alarm `, err.message);
  //     next(err);
  //   }
  // });
  module.exports = router;