const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');


const PORT = process.env.PORT || 1000; 
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes

//register / login routes 
app.use("/auth", require("./routes/jwtAuth"));

//dashboard routes

app.use("/dashboard", require("./routes/dashboard"));

//landing page
app.get('/', async(req, res) =>{
   res.send('Welcome to the server')
    
});


//!        add a todo
app.post('/todos', async(req, res) =>{
    try{
        //>if requires a parameter
        //const {id} = req.params;

        //>if requires data from body
        const data = req.body;

        const queryText = `insert into bernabeadraque_todo.todos(user_id, todo_name, description, date, status)
                            values($1, $2, $3, $4, 'Incomplete') returning *`;
        const dataQuery = [data.uid, data.todo_name, data.description, data.date];


        const query = await pool.query(queryText,dataQuery);
        res.json(query.rows);

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});

//!     get all todos
app.get('/todos', async(req, res) =>{

    try{
        //>if requires a parameter
        //const {id} = req.params;

        //>if requires data from body
        //const data = req.body;

        //const queryText = ;
        //const dataQuery = ;

        const query = await pool.query(`select * from bernabeadraque_todo.todos`);
        res.json(query.rows);

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});

//!      get a todo
app.get('/todos/:id', async(req, res) =>{

    try{
        //>if requires a parameter
        const {id} = req.params;

        //>if requires data from body
        //const data = req.body;

        //const queryText = ;
        //const dataQuery = ;

        const query = await pool.query(`select * from bernabeadraque_todo.todos where todo_id = $1`, [id]);
        res.json(query.rows);

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});
app.post('/todos', async(req, res) =>{

    try{
        //>if requires a parameter
        //const {id} = req.params;

        //>if requires data from body
        const {uid} = req.body;


        const queryText = `select * from bernabeadraque_todo.todos where user_id = $1`;
        const dataQuery = [uid];

        const query = await pool.query(queryText, dataQuery);
        res.json(query.rows);

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});



//!         update a todo

app.put('/todos/:id', async(req, res) =>{

    try{
        //>if requires a parameter
        const {id} = req.params;

        //>if requires data from body
        const data = req.body;

        const queryText = `
        
        update bernabeadraque_todo.todos set todo_name = $1, description = $2, date = $3 , status = $4 where todo_id = $5`;
        const dataQuery = [data.todo_name, data.description, data.date, data.status, id];

        const query = await pool.query(queryText, dataQuery);
        res.json("todo was updated");

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});

//!         delete a todo

app.delete('/todos/:id', async(req, res) =>{

    try{
        //>if requires a parameter
        const {id} = req.params;

        //>if requires data from body
        //const data = req.body;

        //const queryText = ;
        //const dataQuery = ;

        const query = await pool.query(`delete from bernabeadraque_todo.todos where todo_id = $1`, [id]);
        res.json("delete successful");

    }catch(error){
        console.error(error.message);
        res.send('An error has occured')
    }

});
app.listen(PORT, () =>{
    console.log('server stated as localhost at Port: ${PORT}')
});