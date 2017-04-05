const express = require('express');
const fs = require('fs');

const router = express.Router();

router.delete('/', (req, res) => {
  fs.writeFile('questions.json', JSON.stringify([]), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Succesfully wiped questions.json');
    }
  });

  res.end();
});

module.exports = router;
