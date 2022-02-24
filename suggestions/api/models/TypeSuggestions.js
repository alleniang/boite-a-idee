const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let typeSuggestionSchema = new Schema({
    libelle:{
        type: String
    },

}, {
    collection: 'typeSuggestions'
})

module.exports = mongoose.model('TypeSuggestions', typeSuggestionSchema)