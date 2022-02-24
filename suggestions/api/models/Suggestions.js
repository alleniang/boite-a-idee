const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let suggestionSchema = new Schema({
    typeSuggestion:{
        type: ObjectId
    },
    
    description:{
        type: String
    },

}, {
    collection: 'suggestions'
})

module.exports = mongoose.model('Suggestions', suggestionSchema)