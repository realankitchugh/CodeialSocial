const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const User=require('./models/user');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Use express router
app.use('/', require('./routes'));

//Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    // User.findByIdAndDelete('62aa0dd0de86e919b80ce4e0', function(err){
    //     if(err){console.log('error'); return; }
    // });
    console.log(`Server is running on port ${port}`);
})

// git remote add origin https://github.com/realankitchugh/CodeialSocial.git