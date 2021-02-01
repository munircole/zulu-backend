const {sequelize, Team, Project, User, Team_Member} = require("../config/sequelize");





const createTeam = async (req, res) => {
  const {
    team_name
  } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);


    if (user.dataValues.role.toLowerCase() !== 'team leader') {
      return res.status(422).json({
        status: 'error',
        errors: { message: 'Only team leaders can create team' }
      });
    }



    const team = await Team.build({
      userId,
      team_name,      
    }).save();

    const created = team.dataValues;

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Team Created Successfully',
        teamID: created.id,
        teamName: created.name
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: {
        message: 'internal Server Error',
        error
      }
    });
  }
};




const getTeams = async (req, res) => {
  //let { page } = req.query;

  //!page || parseInt(page) <= 1 ? (page = 0) : (page = parseInt(page) - 1);

  //const limit = 30;
  //const offset = Number(page * limit);

  try {
    const teams = await Team.findAndCountAll();

    if (teams) {
      return res.status(200).json( teams.rows
        );
    }

    return res.status(404).json({
      status: 'error',
      errors: {
        message: 'No team Found'
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      errors: {
        message: err.message,
      }
    });
  }
};

const deleteTeam = async (req, res) => {

  try {
    const { teamId } = req.params;
    const teamExists = await Team.findByPk(teamId);

    if (!teamExists) {
      return res.status(422).json({
        status: 'error',
        errors: {
          message: 'team does not exist.'
        }
      });
    }

    const team = await Team.destroy({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(500).json({
        status: 'error',
        errors: {
          message: 'There was an error deleting the team'
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'team Deleted Successfully',
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: error
    });
  }
};


const getTeamProjects = async (req, res) => {
  let { page } = req.query;
  const { teamId } = req.params;

  !page || parseInt(page) <= 1 ? page = 0 : page = parseInt(page) - 1;

  const limit = 30;
  const offset = Number(page * limit);

  try {
      const projects = await Project.findAndCountAll({
          where: {
              team_id: teamId
          },
          offset,
          limit
      });

      if (projects) {
          return res.status(200).json(projects.rows,
                                  
          );
      }

      return res.status(404).json({
          status: 'error',
          error: {
              message: 'No project Found'
          }
      });
  } catch (error) {
      return res.status(500).json({
          status: 'error',
          error: {
              message: error.message,
          }
      });
  }
};





const getTeamMembers = async (req, res) => {
  let { page } = req.query;
  const { teamId } = req.params;

  !page || parseInt(page) <= 1 ? page = 0 : page = parseInt(page) - 1;

  const limit = 30;
  const offset = Number(page * limit);

  try {
      const team_members = await Team_Member.findAndCountAll({
          where: {
              team_id: teamId
          },
          offset,
          limit
      });

      if (team_members) {
          return res.status(200).json(team_members.rows,
                                  
          );
      }

      return res.status(404).json({
          status: 'error',
          error: {
              message: 'No member Found'
          }
      });
  } catch (error) {
      return res.status(500).json({
          status: 'error',
          error: {
              message: error.message,
          }
      });
  }
};







module.exports = {
  createTeam,
  getTeams,
  deleteTeam,
  getTeamProjects,
  getTeamMembers
};