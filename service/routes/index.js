var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/files/*', function(req, res, next) {
  const arr = req.url.split('/')
  const fileName = arr[arr.length - 1]
  const filePath = path.join(__dirname, '../public/files', fileName)
  res.setHeader("Content-type", "application/octet-stream")
  res.setHeader("Content-Disposition", "attachment; filename="+fileName)
  fs.createReadStream(filePath).pipe(res)
});

module.exports = router;
