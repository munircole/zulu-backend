var express = require('express');
var router = express.Router();

  

var user = require("../controller/userController");
var project = require("../controller/projectController");
var team = require("../controller/teamController");
var task = require("../controller/taskController");
var auth = require('../middleware/auth');

var {UserValidationRules, loginValidationRules, validate} = require('../middleware/validator');



/* GET users listing. */
router.get('/', user.getLandingPage);
router.post('/auth/signin', loginValidationRules(), validate, user.userSignin);
router.post('/auth/register', UserValidationRules(), validate, user.registerNewUser);
router.get('/auth/profile/:userId', user.getUserProfile);
router.get('/users/:userId/projects', user.getUserProjects);


router.post('/projects/create', auth, validate, project.createProject );
router.get('/projects', project.getProjects);
router.put('/projects/:projectId/update', auth, validate, project.updateProject);
router.delete('/projects/:projectId/delete', auth, validate, project.deleteProject);
router.get('/projects/:projectId', project.getSingleProject);



router.post('/teams/create', auth, validate, team.createTeam );
router.get('/teams', validate, team.getTeams)
router.delete('/teams/:teamId/delete', auth, validate, team.deleteTeam);
router.get('/teams/:teamId/projects', team.getTeamProjects);
router.get('/teams/:teamId/members', team.getTeamMembers);




router.post('/tasks/create', auth, validate, task.createTask );
router.put('/tasks/:taskId/update', auth, validate, task.updateTask);
router.delete('/tasks/:taskId/delete', auth, validate, task.deleteTask);
router.get('/tasks/:taskId', task.getSingleTask);




module.exports = router;



//router.get('/users/:userId/products', getUsersProducts);


/* GET users listing. */



//router.get('/users/:userId/products', getUsersProducts);


module.exports = router;
