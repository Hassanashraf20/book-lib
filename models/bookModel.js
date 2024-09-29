// models/Book
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Book title is required'],
        unique:[true,'Book title must be unique'],
        minlength:[2,'too short Book title name'],
        maxlength:[40,'too long Book title name'],
    },
    author: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
},{
    timestamps: true,
})

const Book = new mongoose.model('Book', bookSchema)

module.exports = Book
