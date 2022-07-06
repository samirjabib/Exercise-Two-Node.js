// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllTasks = catchAsync(async (req, res, next) => {

  const tasks = await Task.findAll();

  res.status(200).json({
    tasks,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate, startDate } = req.body;


  const newTasks = await Task.create({title, userId, limitDate, startDate})

  

  res.status(201).json({
    newTasks
  });
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({});
});

const updateTask = catchAsync(async (req, res, next) => {

  const { task } = req
  const { finishDate } = req.body

  //console.log(new Date (task.limitDate.get(getTime()))) podemos convertir a un dato numerico la fecha para hacer operaciones


  //get numerical values of the date
  const limitDateNum = new Date(task.limitDate).getTime();
  const finishDateNum = new Date(finishDate).getTime();


  const remainingTime = limitDateNum-finishDateNum ;

  if(remainingTime > 0){
    await task.update({finishDate, status:"completed"})
  } else if (remainingTime < 0){
    await task.update({finishDate, status:"late"})
  }


  res.status(200).json({
    status: 'success',
    task,
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTasksByStatus,
  updateTask,
  deleteTask,
};
