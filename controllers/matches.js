var express = require('express');
var Match = require('../models/match');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        Match.find(function(err, matches) {
            if (err) return res.status(500).send(err);

            return res.send(matches);
        });
    })
    .post(function(req, res) {
        Match.create(req.body, function(err, match) {
            if (err) return res.status(500).send(err);

            return res.send(match);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        Match.findById(req.params.id, function(err, match) {
            if (err) return res.status(500).send(err);

            return res.send(match);
        });
    })
    .put(function(req, res) {
        Match.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    })
    .delete(function(req, res) {
        Match.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    });

module.exports = router;
