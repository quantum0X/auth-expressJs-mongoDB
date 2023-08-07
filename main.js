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
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('dashboard')
    }
    else {

        res.render('signup')
    }
})

// dashboard page
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard')
    } else {
        res.redirect('/')
    }
})

app.post('/register', (req, res) => {

    userAuth.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/dashboard')
            })
        }
    })
})

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

app.listen(port, () => {
    console.log("server started!")
})