const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let typeSuggestionSchema = require('../models/TypeSuggestions');

//ADD TYPE
router.route('/AjoutType').post((req, res) => {
    console.log(req.body)

    typeSuggestionSchema.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
            //return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ TYPES
router.route('/ListTypes').get((req, res) => {
    typeSuggestionSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Single TYPE
router.route('/ListTypes/:id').get((req, res) => {
    typeSuggestionSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = router;