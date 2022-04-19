import Interview from '../models/interview.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFound.js';
import checkPermissions from '../utils/checkPermissions.js';

const createInterview = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Missing fields');
  }
  req.body.createdBy = req.user.userId;
  const interview = await Interview.create(req.body);
  res.status(StatusCodes.CREATED).json({ interview });
};

const updateInterview = async (req, res) => {
  const { id: interviewId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Missing fields');
  }
  const interview = await Interview.findOne({ _id: interviewId });
  checkPermissions(req.user, interview.createdBy);
  const updatedInterview = await Interview.findOneAndUpdate(
    { _id: interivewId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedInterview });
};

const deleteInterview = async (req, res) => {
  const { id: interviewId } = req.params;
  const interview = await Interview.findOne({ _id: interviewId });
  if (!interview) {
    throw new NotFoundError(`No interview with id ${interviewId}`);
  }
  checkPermissions(req.user, interview.createdBy);
  await Interview.deleteOne({ _id: interviewId });
  res.status(StatusCodes.OK).json({ msg: 'Interview Sucessfully Removed' });
};

const getAllInterviews = async (req, res) => {
  const { search, status, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (search) {
    //queryObject.company = { $regex: search, $options: 'i' };
    queryObject.position = { $regex: search, $options: 'i' };
  }
  //sort
  let result = Interview.find(queryObject);
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
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const interviews = await result;

  const totalInterviews = await Interview.countDocuments(queryObject);
  const numPages = Math.ceil(totalInterviews / limit);
  res.status(StatusCodes.OK).json({ interviews, totalInterviews, numPages });
};

export { createInterview, updateInterview, deleteInterview, getAllInterviews };
