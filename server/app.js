const express = require('express');
const mysql = require('mysql');
const PORT = 3005;
const app = express();

app.use(express.json());

const db = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'root@12345',
     database : 'trello'
});
   
db.connect((err) => {
     if(err) {
          console.log(err.sqlMessage)
     }
     console.log('MySql Connected....');
})
 
app.get('/', (req, res) => {
     res.send({
          notice: 'Trello Clone using MySQL'
     })
});

// Show users
app.get('/getUsers', (req, res) => {
     db.query('SELECT * FROM users', (err, results) => {
          if(err) throw err;
          res.send(results)
     })
})

// adding users
app.post('/addUser', (req, res) => {
     const uuidv1 = require('uuid/v1');
     const data = req.body;
     data['id'] = uuidv1();
     const sql = `INSERT INTO users(id, name, email, password, bio) values('${data.id}', '${data.name}', '${data.email}', '${data.password}', '${data.bio}')`
     const query = db.query(sql, (err, results) => {
          if(err) throw err;
          //assigning role to user
          db.query(`INSERT INTO user_roles(user_id, role_id) values('${data.id}', 2)`, (err, results) => {
               if(err) throw err;
               res.send('User created!!!')
          })
     })
});

// adding project
app.post('/addProject', (req, res) => {
     const data = req.body;
     const uuidv1 = require('uuid/v1');
     data['id'] = uuidv1();
     const sql = `INSERT INTO projects(id, project_name, createdAt) values('${data.id}', '${data.project_name}', NOW())`;
     const query = db.query(sql, (err, results) => {
          if(err) throw err;
          db.query(`INSERT INTO uses_projects(user_id, project_id) values( '${data.userId}', '${data.id}' )`, (err, results ) => {
               if(err) throw err;
               res.send('Project created!!!')
          })
     })
});

//adding task
app.post('/addTask', (req, res) =>{
     const data = req.body;
     const uuidv1 = require('uuid/v1');
     data['id'] = uuidv1();
     const sql = `INSERT INTO tasks(id, name, start_date, end_date, notes, status, project_id) values('${data.id}', '${data.name}', '${data.start_date}', '${data.end_date}', '${data.notes}', 'New', '${data.projectId}')`;
     const query = db.query(sql, (err, results) => {
          if(err) throw err;
          res.send('Task created!!!')
     })
})


// For invalid URL
app.use((req, res) => {
     res.status(404).send({
          'notice': 'URL not found!!'
     })
})

app.listen(PORT, () => {
     console.log(`Listening to port - ${PORT}...`)
})