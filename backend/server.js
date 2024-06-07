const express =require('express');
const app =express();
const connectDB=require('./config/db.js');
var cors = require('cors');
app.use(cors())

//init middeleware 
app.use(express.json({extends: false}));
// this use full body.request worrking parser is very needfull.

app.get('/',(req,res)=>res.send('api runing'));
app.use('/api/auth',require('./routes/api/auth.js'));

app.use('/api/users',require('./routes/api/users.js'));
app.use('/api/posts',require('./routes/api/posts.js'));
app.use('/api/profile',require('./routes/api/profile.js'));
app.use('/api/users',require('./routes/api/users.js'));
app.use('/api/subscription',require('./routes/api/subscription.js'));
app.use('/api/post',require('./routes/api/posts.js'));
app.use('/api/register',require('./routes/api/Register.js'));
app.use('/api/menu',require('./routes/api/menu.js'));
app.use('/api/callrequest',require('./routes/api/CallRequest.js'));


// Serve the 'uploads' directory statically
app.use('/uploads', express.static('uploads'));

const PORT =process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server started on ${PORT}`));