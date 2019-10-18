const express = require('express');
const app = express();
app.use(express.json())

//Users router
const UserRouter = require('./routes/users');
app.use('/users', UserRouter);

//Project router
const ProjectRouter = require('./routes/projects');
app.use('/projects', ProjectRouter)

app.listen(3005, () => {
     console.log(`Listening to port 3005...`)
})