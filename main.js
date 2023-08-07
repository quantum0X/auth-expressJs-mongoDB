import express from 'express'
import ejs from 'ejs'
import { connect, model, Schema } from 'mongoose'
import dotenv from 'dotenv'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

dotenv.config()

app.set('view engine', 'ejs')

const path = process.env.MONGODB_URL

connect(path)

const userSchema = new Schema({
    usermail: 'String',
    password: 'String'
})

const userAuth = new model('authUser', userSchema)

app.get('/', (req, res) => {
    res.render('signup')
})

app.post('/register', async (req, res) => {
    console.log(req.body)

    const newUser = userAuth({
        usermail: req.body.email,
        password: req.body.password
    })

    await newUser.save()
    console.log("saved succesfully")
    res.redirect('/')
})

app.listen(port, () => {
    console.log("server started!")
})