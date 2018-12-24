const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

mongoose.Promise = global.Promise
const url = 'mongodb://localhost:27017/edx-module4-assignment'

mongoose.connect(url,{ useNewUrlParser: true })
    
    
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
const Account = require('./models/account_model')

app.get('/accounts', (req, res) => {
    Account.find({}, null, {sort:{_id:-1}})
        .exec((err, results) => {
            if (err) return 'There was an error getting this page'
            console.log(results)
            res.send(results)
    })
})

app.post('/accounts', (req, res) => {
    const accounts = req.body
    const account = new Account(accounts)
    account.save((err,results) => {
        if (err) {
            console.log('there was an error', err)
        } else {
            console.log(`account with id: ${account._id} was succesfully saved`)
            res.send(results)
        }
    })

})

app.put('/accounts/:id', (req, res) => {
    Account.findById({ _id: req.params.id }, (err, account) => {
        if (err) {
            console.log(`An error occured. Details: ${err}`)
        } else {
            if(req.body.name) account.name = req.body.name
            if(req.body.balance) account.name = req.body.balance
            account.save((err, results) => {
                if (err) {
                    return err
                } else {
                    console.log(`account with id: ${account._id} was succesfully updated`)
                    res.send(results)
                }
            })
            
        }
    })
    
})
app.delete('/accounts/:id', (req, res) => {
    Account.findById({ _id: req.params.id }, (err, account) => {
        if (err) {
            console.log(`An error occured. Details ${err}`)
        } else {
            account.remove((err, results) => {
                if (err) {
                    return err
                } else {
                    console.log(`account with id: ${account._id} was succesfully deleted`)
                    res.send(results)
                }
            })
            
        }
    })
    
})
app.use(errorhandler())

app.listen(port)
console.log(`server running at port:${port}`)



