const express = require('express');
const router = express.Router();
const Project = require('../models/projects');

//get - show
router.get('/', (req, res) => {
    Project.findAll().then(projects => {
        res.send(projects)
    }).catch(err => {
        res.send(err);
    })
});

// //post - create
// router.post('/', (req, res) => {
//      const uuidv1 = require('uuid/v1');
//      data['id'] = uuidv1();
//      Project.create()
// });


// const data = req.body;
//      const uuidv1 = require('uuid/v1');
//      data['id'] = uuidv1();
//      const sql = `INSERT INTO projects(id, project_name, createdAt) values('${data.id}', '${data.project_name}', NOW())`;
//      const query = db.query(sql, (err, results) => {
//           if(err) throw err;
//           db.query(`INSERT INTO uses_projects(user_id, project_id) values( '${data.userId}', '${data.id}' )`, (err, results ) => {
//                if(err) throw err;
//                res.send('Project created!!!')
//           })
//      })

module.exports = router;