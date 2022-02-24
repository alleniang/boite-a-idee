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

// Update SUGGESTION
router.route('/update-Types/:id').put((req, res, next) => {
    typeSuggestionSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Type updated successfully !')
        }
    })
})

module.exports = router;