const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  delete require.cache[require.resolve('../questions')];
  const questions = require('../questions');

  res.json(questions);
});

router.put('/', (req, res) => {
  delete require.cache[require.resolve('../questions')];
  const questions = require('../questions');
  const newQuestion = req.body;

  questions.push(newQuestion);

  fs.writeFile('questions.json', JSON.stringify(questions), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Succesfully wrote to questions.json');
    }
  });

  res.end();
});

module.exports = router;
