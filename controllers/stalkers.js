var express = require('express');
var Stalker = require('../models/stalker');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Stalker.find(function(err, stalkers) {
      if (err) return res.status(500).send(err);

      return res.send(stalkers);
    });
  })
  .post(function(req, res) {
    Stalker.create(req.body, function(err, stalker) {
      if (err) return res.status(500).send(err);

      return res.send(stalker);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Stalker.findById(req.params.id, function(err, stalker) {
      if (err) return res.status(500).send(err);

      return res.send(stalker);
    });
  })
  .put(function(req, res) {
    Stalker.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  })
  .delete(function(req, res) {
    Stalker.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  });

module.exports = router;
