var express = require('express'),
    path    = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg  = require('pg'),
    env = require('dotenv').config(),
    app = express()

    //DB Connect String
const { Pool, Client } = require('pg')
const connect = process.env.DB_CONNECT;

//Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

//Set Default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
     
      const client = new Client({
        connectionString: connect,
      })
      client.connect()
      
      client.query('SELECT * FROM recipes', (err, result) => {
          if(err){
              console.log(err)
          } else {
            
            res.render('index', {recipes: result.rows});
          }
        
        client.end()
      })
     
});



//Server
app.listen(3000, function(){
    console.log('Server running');
})



    