import express from 'express'
import ejs from 'ejs'
import { connect, model, Schema } from 'mongoose'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import passportLocalMongoose from 'passport-local-mongoose'
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

dotenv.config()

app.set('view engine', 'ejs')

const path = process.env.MONGODB_URL

// session
app.use(session({
    secret: 'secret not reveal',
    resave: false,
    saveUninitialized: false
}))
// passport for session
app.use(passport.initialize())
app.use(passport.session())

connect(path)

const userSchema = new Schema({
    username: 'String',
    password: 'String'
})

userSchema.plugin(passportLocalMongoose)

const userAuth = new model('authUser', userSchema)

passport.use(userAuth.createStrategy())
passport.serializeUser(userAuth.serializeUser())
passport.deserializeUser(userAuth.deserializeUser())

// signup page
app.get('/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('signup')
    }
})

// dashboard page
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard')
    } else {
        res.redirect('/login')
    }
})

// login page
app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

// new user handle
app.post('/register', (req, res) => {
    userAuth.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, () => res.redirect('/'))
        }
    })
})

// user login handle
app.post('/loginUser', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = new userAuth({
        username: username,
        password: password
    })
    req.login(user, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, () => { res.redirect('/') })
        }
    })
})

// user logout handle
app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/login')
        }
    })
})

// server start
app.listen(port, () => {
    console.log("server started!")
})