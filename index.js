const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const mongoose=require('mongoose');
//For Session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const customMware=require('./config/middleware');
const MongoStore = require('connect-mongo');
const clientP=mongoose.connect('mongodb://localhost/codeial_dev', 
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(m => m.connection.getClient())

const sassMiddleware=require('node-sass-middleware'); 
const flash = require('connect-flash');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

// make the uploads path visible
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//

//Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongoStore is used to store the session cookie in the DB
app.use(session({
    name: "codeial",
    //change secret before deployment
    secret: "Anyrandomthing",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            clientPromise: clientP,
            autoRemove: 'disabled'
        }, 
        function(err){
            console.log(err || 'connect-mongodb setup OK');
        }
    )
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
    //     }, 
    //     function(err){
    //         console.log(err || 'connect-mongodb setup OK');
    //     }
    // )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port ${port}`);
})

