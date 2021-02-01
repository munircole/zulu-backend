var Sequelize = require('sequelize');
const userModel =  require("../models/users");
const teamModel = require("../models/team");
const teamMemberModel = require("../models/team_members");
const projectModel = require("../models/projects");
const taskModel = require("../models/tasks");

require('dotenv').config();
dbconfig = {
    host: 'remotemysql.com',
    user: 'oSn07NiZcl',
    password: '87gS9TMljl',
    database: 'oSn07NiZcl',
    dialect: "mysql"

};


const defaultDbConn = {
  host: dbconfig.host,
  user: dbconfig.user,
  database: dbconfig.database,
  password: dbconfig.password
};

const testDbConn = {
  host: dbconfig.host,
  user: dbconfig.user,
  database: dbconfig.database,
  password: dbconfig.password
};

const conn = process.env.NODE_ENV === 'test' ? testDbConn : defaultDbConn;

const sequelize = new Sequelize(conn.database, conn.user, conn.password, {
  host: conn.host,
  dialect: dbconfig.dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' ,*/
  logging: false
});




const User = userModel(sequelize, Sequelize);
const Team = teamModel(sequelize, Sequelize);
const TeamMember = teamMemberModel(sequelize, Sequelize); 
const Project = projectModel(sequelize, Sequelize);
const Task = taskModel(sequelize, Sequelize);





module.exports = {sequelize, User, Team, TeamMember, Project, Task};
