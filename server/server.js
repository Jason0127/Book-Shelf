const express = require('express')
const bodyarser = require('body-parser')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./conifg/config').get(process.env.NODE_ENV)
const app = express();


mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE)


app.use(bodyarser.json());
app.use(cookieparser());

// app.use(express.static('client/build'))


const {User} = require('./models/user')
const {Book} = require('./models/book')
const {auth} = require('./middleware/auth')

// GET //

app.get('/api/auth', auth, (req, res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

app.get('/api/logout', auth, (req, res)=>{
    req.user.deleteToken((err, user)=>{
        if(err) return res.status(400).send(err)
        res.json(user)
    })
})


app.get('/api/getBook', (req, res)=>{
    let id = req.query.id;

    Book.findById(id, (err, docs)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(docs)
    })
})

app.get('/api/Books', (req, res)=>{
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, docs)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(docs)
    })
})

app.get('/api/getReviewer', (req, res)=>{
    let id = req.query.id
    if(!id) return res.status(400).send({
        error: true 
    })
    User.getReviewer(id, (err, reviewer)=>{
        if(!reviewer) return res.status(400).send({error: true})
        res.status(200).json({
            name: reviewer.name,
            lastname: reviewer.lastname
        })
    })
})

app.get('/api/user_post', (req, res)=>{
    Book.find({ownerId: req.query.user}).exec((err, docs)=>{
        if(err) return res.status(400).send(err)
        res.json(docs)
    })
})

// Fetch All User
app.get('/api/users', (req, res)=>{
    User.find({}, (err, docs)=>{
        if(err) return res.status(400).send(err)
        res.json(docs)
    })
})

// POST //

app.post('/api/book', (req, res)=>{
    const book = new Book(req.body);

    book.save((err, docs)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post: true,
            bookId: docs._id
        })
    })
})


// Register User
app.post('/api/register', (req, res)=>{
    const user = new User(req.body);
    user.save((err, docs)=>{
        if(err) return res.json({success: false})
        res.status(200).json({
            success: true,
            user: docs
        })
    })
})

// Login User
app.post('/api/login',(req, res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user) return res.json({isAuth: false, message: 'Auth Failed Email not Found'})
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.status(200).json({
                isAuth: false,
                message: 'Wrong Password'
            })
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

// UPDATE //

app.post('/api/book_update', (req, res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, docs)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            docs
        })
    })
})

// DELETE //

app.delete('/api/delete_book', (req, res)=>{
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, docs)=>{
        if(err) return res.status(400).send(err)
        res.json({
            success: true,
            docs
        })
    })
})


if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/*', (req, res)=>{
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })

}

const port = process.env.PORT || 1010

app.listen(port, ()=>{
    console.log(`server is running in port ${port}`)
})