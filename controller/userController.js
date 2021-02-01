var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer = require('multer');

const {sequelize, Project, User, Team} = require("../config/sequelize");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.profile_pics + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

/**
 * @api {get} /api/v1 Api Landing Route
 * @apiName Landing
 * @apiGroup Api
 *
 *
 * @apiSuccess {String} status Status of the request.
 * @apiSuccess {Object} body  Body of the response.
 */

/* eslint-disable no-unused-vars */
 const getLandingPage = (req, res, next) => {
  res.json({
    status: 'success',
    data: {
      message: 'zulu api'
    }
  });
};
/* eslint-disable no-unused-vars */

// Register new users
 const registerNewUser = (req, res, next) => {
  let image;
  let uploadImage;
  let imgUrl = '';

  // Check if the user attach an image or not
  if (req.files) {
    uploadImage = req.files.photo;
  }

  const {
    username, email, firstName, lastName,  contact_number, gender, dob, country, role, password,
  } = req.body;

  // Check if given email is already in use
  User.findOne({ where: { email } })
    .then((check) => {
      if (check) {
        return res.status(403).json({
          status: 'error',
          errors: {
            message: `User with the email: ${email} already exist`
          }
        });
      }

    
      sequelize
        .sync()
        .then(() => {
          if (image) {
            imgUrl = image.url;
          }


          // Generate hashed password and store along with other user data
          bcrypt.hash(password, 10, (err, hashed) => {
            if (err) {
              return res.status(500).json({
                status: 'error',
                errors: {
                  message: err
                }
              });
            }
            return User.build({
              username,
              email,
              firstName,
              lastName,
              contact_number,
              gender,
              dob,
              country,
              role,
              password: hashed,
              profile_pics: imgUrl
            })
              .save()
              .then((user) => {
                const { id } = user.dataValues;
                res.status(201).json({
                  status: 'success',
                  data: {
                    message: 'User created successfully',
                    userId: id
                  }
                });
              });
          });
        })
        .catch((err) => res.status(500).json({
          status: 'error',
          errors: {
            message: err
          }
        }));
      return true;
    })
    .catch((err) => res.status(500).json({
      status: 'error',
      errors: {
        message: err
      }
    }));
};
/* eslint-disable no-unused-vars */


 const userSignin = (req, res, next) => {
  const { email, password } = req.body;

  // Check if given user email is in database
  User.findOne({ where: { email } })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({
          status: 'error',
          errors: {
            message: `user with email ${email} does not exist`
          }
        });
      }

      // If found in database decode password from database and compare with one given
      bcrypt.compare(password, user.dataValues.password, (err, response) => {
        if (err !== undefined) {
          return res.status(500).json({
            status: 'error',
            errors: { message: 'An error occurred on comaparing password' }
          });
        }

        if (response === false) {
          return res.status(401).json({
            status: 'error',
            errors: { message: 'Authentication Failed: Wrong Password' }
          });
        }

        // Generate token if password matches above
        if (response) {
          const token = jwt.sign(
            {
              email: user.dataValues.email,
              id: user.dataValues.id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '24hr'
            }
          );
          return res.status(200).json({
            token,
            status: 'success',
            data: {
              message: 'Authentication Successful',
            }
          });
        }

        return res.status(401).json({
          status: 'error',
          errors: 'Authentication Failed'
        });
      });
      return true;
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        errors: {
          message: err
        }
      });
    });
};



// User Profile
const getUserProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Find the user by primary key.
    const user = await User.findOne(
      {
        where: {
          id: userId
        },
        attributes: [
          'id',
          'username',
          'email',
          'firstName',
          'lastName',
          'contact_number',
          'gender',
          'dob',
          'country',
          'profile_pics'
        ]
      }
    );

    if (user) {
      return res.status(200).json(user.dataValues );
    }
    return res.status(404).json({
      status: 'error',
      error: {
        message: 'User does not exist.'
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      errors: {
        message: 'Internal Server error',
        error
      }
    });
  }
};




const getUserProjects = async (req, res) => {
  let { page } = req.query;
  const { userId } = req.params;

  !page || parseInt(page) <= 1 ? page = 0 : page = parseInt(page) - 1;

  const limit = 30;
  const offset = Number(page * limit);

  try {
      const projects = await Project.findAndCountAll({
          where: {
              user_id: userId
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




module.exports = {
  getLandingPage,
  userSignin,
  registerNewUser,
  getUserProfile,
  getUserProjects
};