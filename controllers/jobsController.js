import Job from '../models/job.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFound.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res) => {
  const { company, position, location } = req.body;

  if (!company || !position || !location) {
    throw new BadRequestError('Missing fields');
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, job.createdBy);
  await Job.deleteOne({ _id: jobId });
  res.status(StatusCodes.OK).json({ msg: 'Job Sucessfully Removed' });
};

const getAllJobs = async (req, res) => {
  const { search, status, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (search) {
    queryObject.company = { $regex: search, $options: 'i' };
    //queryObject.position = { $regex: search, $options: 'i' };
  }
  //sort
  let result = Job.find(queryObject);
  if (sort === 'latest') {
    result = result.sort('-dateApplied');
  }
  if (sort === 'oldest') {
    result = result.sort('dateApplied');
  }
  if (sort === 'a-z') {
    result = result.sort('company');
  }
  if (sort === 'z-a') {
    result = result.sort('-company');
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, location } = req.body;
  if (!company || !position || !location) {
    throw new BadRequestError('Please Provide All Values');
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, job.createdBy);
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  //turn stats array into object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interviewing: stats.interviewing || 0,
    rejected: stats.rejected || 0,
  };

  let monthlyApps = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$dateApplied' },
          month: { $month: '$dateApplied' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  monthlyApps = monthlyApps
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApps });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
