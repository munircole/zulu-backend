const {sequelize, Project, User, Task} = require("../config/sequelize");





const createTask = async (req, res) => {
  const {
    taskName, priority, description, start_date, end_date, assigned_to
  } = req.body;
  try {
    const user_id = req.user.id;
    const team_id = req.team.id;
    const project_id = req.project.id;
    const user = await User.findByPk(user_id);
    const team = await Team.findByPk(taem_id);
    const project = await Project.findByPk(project_id);


    if (user.dataValues.role.toLowerCase() !== 'team leader' && project.dataValues.project_type.toLowerCase() == 'team project'){
      return res.status(422).json({
        status: 'error',
        errors: { message: 'Only team leaders can create team task' }
      });
    }



    const task = await Task.build({
      project_id,
      taskName,
      priority,
      description,
      start_date,
      end_date,
      assigned_to
      
    }).save();

    const created = Task.dataValues;

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'team Created Successfully',
        taskID: created.id,
        taskName: created.name
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





const getSingleTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await Task.findOne({ where: { id: taskId } });

    if (result == null) {
      return res.status(204).json({
        status: 'success',
        data: {
          message: 'task not found'
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


const updateTask = async (req, res) => {
  const {
    taskName, priority, description, start_date, end_date, assigned_to
  } = req.body;
  try {
    const { taskId } = req.params;
    const taskExists = await Task.findByPk(projectId);
    const entries = {};

    if (!projectExists) {
      return res.status(422).json({
        status: 'error',
        errors: {
          message: 'task does not exist.'
        }
      });
    }

    if (name) entries.name = name;
    if (priority) entries.priority = priority;
    if (description) entries.description = description;
    if (start_date) entries.start_date = start_date;
    if (end_date) entries.end_date = end_date;
    if (assigned_to) entries.assigned_to = assigned_to;



    const task = await Task.update(
      entries,
      {
        where: { id: taskId },
        returning: true,
        plain: true
      }
    );

    if (!task) {
      return res.status(500).json({
        status: 'error',
        errors: {
          message: 'There was an error updating the task'
        }
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'task Updated Successfully',
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: error
    });
  }
};




const deleteTask = async (req, res) => {

  try {
    const { taskId } = req.params;
    const taskExists = await Task.findByPk(taskId);

    if (!taskExists) {
      return res.status(422).json({
        status: 'error',
        errors: {
          message: 'task does not exist.'
        }
      });
    }

    const task = await Task.destroy({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(500).json({
        status: 'error',
        errors: {
          message: 'There was an error deleting the task'
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'task Deleted Successfully',
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
  createTask,
  updateTask,
  getSingleTask,
  deleteTask
};