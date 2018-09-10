const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const {bookService} = require('../service')

class BookController {
    constructor() {
        // super()
    }
    async addBook(req,res,next){
        try{
            console.log(`body:`,req.body)
            let book = await bookService.addBook(req.body)
            res.send({
                state:'success',
                book
            })
        }catch(error){
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR',
                message: error,
            })            
        }
    }
    async getBooks(req,res,next){
        try{
            let {pageSize,current,docs} = await bookService.getBooks(req.query)
            res.send({
                state:'success',
                pageSize,current,docs
            })
        }catch(error){
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR',
                message: error,
            })            
        }        
    }
    async updateBook(req,res,next){
         try{
            let doc = await bookService.updateBook(req.query)
            res.send({
                state:'success',
                doc
            })
        }catch(error){
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR',
                message: error,
            })            
        }         
    }
    async removeBook(req,res,next){
         try{
            let doc = await bookService.removeBook(req.query)
            res.send({
                state:'success',
                doc
            })
        }catch(error){
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR',
                message: error,
            })            
        }  
    }
}

module.exports = new BookController();