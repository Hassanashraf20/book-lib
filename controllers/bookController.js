const factoryHandler=require("./handlerFactory")


const BOOK = require('../models/bookModel')


//@desc Get list of BOOKs
//@route GET api/BOOK
//@accses puplic
exports.getBOOKs=factoryHandler.getAll(BOOK)

//@desc Get Spacific BOOK
//@route GET api/BOOK/:id
//@accses puplic
exports.getBOOK=factoryHandler.getOne(BOOK)


//@desc create BOOK 
//@route POST api/BOOK

exports.createBOOK=factoryHandler.createOne(BOOK)

//@desc Update BOOK
//@route PUT api/BOOK/:id

exports.updateBOOK=factoryHandler.updateOne(BOOK)



//@desc Delete BOOK
//@route DELETE api/BOOK/:id

exports.deleteBOOK=factoryHandler.deleteOne(BOOK)

