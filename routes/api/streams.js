const express = require('express');
const router = express.Router();
const Stream = require('../../models/Stream');

// @route   GET api/streams
// @desc    Get all streams
// @access  Public
router.get('/', (req, res) => {
    Stream.find()
        .sort({ date: -1 })
        .then(streams => res.json(streams));
});

// @route   POST api/streams
// @desc    Add a new stream
// @access  Private
router.post('/', (req, res) => {
    const newStream = new Stream({
        name: req.body.name,
        url: req.body.url,
        city: req.body.city
    });

    newStream.save().then(stream => res.json(stream));
});

// @route   DELETE api/streams
// @desc    Delete a stream by ID
// @access  Private
router.delete('/:id', (req, res) => {
    Stream.findById(req.params.id)
        .then(stream => stream.remove().then(() => res.json({ success: true})))
        .catch(err => res.status(404).json({error: `Could not find stream with id: ${req.params.id}`}));
});

module.exports = router;