const express = require('express');
const http = require('http')
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const socketio = require('socket.io');
const { timeStamp } = require('console');

const app = express();
const server = http.createServer(app)
const io = require('socket.io').listen(server)

app.use(express.static('public'));

const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))
  
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').urlencoded({ extended: true }))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/chatroom').connect(io)

app.use('/', require('./routes/login_rej.js'));
app.use('/user', require('./routes/account.js'))
app.use('/chatroom', require('./routes/chatroom.js').router)
app.use('/play', require('./routes/browse'))
app.use('/createnew', require('./routes/createnew'))
app.use('/quizzes', require('./routes/play.js'))
app.use('/search', require('./routes/search.js'))
app.use('/tag', require('./routes/tags.js') )

const AdminQuiz = require('./models/schema.js').AdminQuiz

app.get('*', (req, res) => {
    res.render('error')
})


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started`)
});
