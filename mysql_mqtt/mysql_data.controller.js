const express = require('express');
const router = express.Router();
const datas = require('../services/tags');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await datas.getMultiple_last10(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await datas.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});
/* POST quotes */
router.post('/filter', async function(req, res, next) {
  try {
    res.json(await datas.filter(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});

module.exports = router;