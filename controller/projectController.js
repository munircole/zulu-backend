const {sequelize, Project, User} = require("../config/sequelize");





const createProject = async (req, res) => {
  const {
    projectName, requirement, client, priority, project_type, start_date, end_date
  } = req.body;
  try {
    const user_id = req.user.id;
    const team_id = req.team.id;
    const user = await User.findByPk(user_id);
    const team = await Team.findByPk(taem_id);


    if (user.dataValues.role.toLowerCase() !== 'team leader' && project.dataValues.project_type.toLowerCase() == 'team project') {
      return res.status(422).json({
        status: 'error',
        errors: { message: 'Only team leaders can create team projects' }
      });
    }



    const project = await Project.build({
      user_id,
      team_id,
      name,
      requirement,
      client,
      priority,
      project_type, 
      start_date,
      end_date
      
    }).save();

    const created = project.dataValues;

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'project Created Successfully',
        projectID: created.id,
        projectName: created.name
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




const getProjects = async (req, res) => {
  //let { page } = req.query;

  //!page || parseInt(page) <= 1 ? (page = 0) : (page = parseInt(page) - 1);

  //const limit = 30;
  //const offset = Number(page * limit);

  try {
    const projects = await Project.findAndCountAll();

    if (projects) {
      return res.status(200).json( projects.rows
        );
    }

    return res.status(404).json({
      status: 'error',
      errors: {
        message: 'No project Found'
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





const getSingleProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await Project.findOne({ where: { id: ProjectId } });

    if (result == null) {
      return res.status(204).json({
        status: 'success',
        data: {
          message: 'project not found'
        }
      });
    }

    return res.status(200).json( result
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: {
        message: err.message
      }
    });
  }
  return true;
};


const updateProject = async (req, res) => {
  const {
    projectName, requirement, client, priority, project_type, start_date, end_date
  } = req.body;
  try {
    const { projectId } = req.params;
    const projectExists = await Project.findByPk(projectId);
    const entries = {};

    if (!projectExists) {
      return res.status(422).json({
        status: 'error',
        errors: {
          message: 'project does not exist.'
        }
      });
    }

    if (projectName) entries.projectName = projectName;
    if (requirement) entries.requirement = requirement;
    if (client) entries.client = client;
    if (priority) entries.priority = priority;
    if (project_type) entries.project_type = project_type;
    if (start_date) entries.start_date = start_date;
    if (end_date) entries.end_date = end_date;


    const project = await Project.update(
      entries,
      {
        where: { id: projectId },
        returning: true,
        plain: true
      }
    );

    if (!project) {
      return res.status(500).json({
        status: 'error',
        errors: {
          message: 'There was an error updating the project'
        }
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'project Updated Successfully',
        product,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: error
    });
  }
};




const deleteProject = async (req, res) => {

  try {
    const { projectId } = req.params;
    const projectExists = await Project.findByPk(projectId);

    if (!projectExists) {
      return res.status(422).json({
        status: 'error',
        errors: {
          message: 'project does not exist.'
        }
      });
    }

    const project = await Project.destroy({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(500).json({
        status: 'error',
        errors: {
          message: 'There was an error deleting the project'
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'project Deleted Successfully',
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: error
    });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getSingleProject,
  deleteProject
};