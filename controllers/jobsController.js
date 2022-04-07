import Job from '../models/job.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';
import UnauthorizedError from '../errors/Unauthorized.js';

const createJob = async (req, res) => {
  const {
    company,
    position,
    location,
    dateApplied,
    status,
    isFavorite,
    companyURL,
    listingURL,
  } = req.body;

  if (!company || !position || !location) {
    throw new BadRequestError('Missing fields');
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  res.send('cdelete job');
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numPages: 1 });
};
const updateJob = async (req, res) => {
  res.send('update job');
};
const showStats = async (req, res) => {
  res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
