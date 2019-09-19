const express=require('express');
const expressGraphQL=require('express-graphql');
const bodyParser = require('body-parser');
const app=express();
const schema =require('./schema');
const cors = require( `cors` );
app.use( cors() );
app.use('/graphql',expressGraphQL
({
    schema,
    graphiql:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, () => console.log(`Example app listening on port 5000!`))