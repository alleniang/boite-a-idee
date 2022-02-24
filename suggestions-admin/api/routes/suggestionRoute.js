const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let suggestionSchema = require('../models/Suggestions');

//ADD SUGGESTION
router.route('/AjoutSuggestion').post((req, res) => {
    console.log(req.body)

    suggestionSchema.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
            //return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ SUGGESTIONS
router.route('/ListSuggestions').get((req, res) => {
    suggestionSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Single SUGGESTION
router.route('/ListSuggestions/:id').get((req, res) => {
    suggestionSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});



module.exports = router;