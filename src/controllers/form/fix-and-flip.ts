import { RequestHandler } from "express";

import { FixAndFlip, User } from "@db/models";
import { BadRequestError, ForbiddenError, NotFoundError, ServerError, UnauthorizedError } from "@middleware/error";

/**
 * Create a new Fix And Flip record.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const createFixAndFlip: RequestHandler = async (req, res, next) => {
  let duplicateAddress;

  try {
    duplicateAddress = await FixAndFlip.findOne({
      where: { street_address: req.body.street_address },
    });
  } catch (err) {
    return next(new ServerError());
  }

  if (duplicateAddress) {
    return next(new BadRequestError("Duplicate street address. User can only have one Fix-And-Flip record per address."));
  }

  let user;

  try {
    user = await User.findByPk(req.session.userId);
  } catch (err) {
    return next(new ServerError());
  }

  if (!user) {
    return next(new UnauthorizedError());
  }

  let record;

  try {
    record = await user.createFixAndFlip(req.body);
  } catch (err) {
    return next(new ServerError());
  }

  const recordData = record.toJSON();

  res.status(201).json({ success: true, data: recordData });
};

/**
 * Retrieve a Fix And Flip record.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const getFixAndFlip: RequestHandler = async (req, res, next) => {
  let user;

  try {
    user = await User.findByPk(req.session.userId);
  } catch (err) {
    return next(new ServerError());
  }

  if (!user) {
    return next(new UnauthorizedError());
  }

  const recordId = req.params.id;

  let record;

  try {
    record = await FixAndFlip.findByPk(recordId);
  } catch (err) {
    return next(new ServerError());
  }

  if (!record) {
    return next(new NotFoundError());
  }

  const recordData = record.toJSON();

  if (recordData.UserId !== req.session.userId) {
    return next(new ForbiddenError());
  }

  res.status(200).json({ success: true, data: recordData });
};

/**
 * Retrieve all Fix And Flip records.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const getFixAndFlips: RequestHandler = async (req, res, next) => {
  let user;

  try {
    user = await User.findByPk(req.session.userId);
  } catch (err) {
    return next(new ServerError());
  }

  if (!user) {
    return next(new UnauthorizedError());
  }

  let records;

  try {
    records = await user.getFixAndFlips();
  } catch (err) {
    return next(new ServerError());
  }

  const recordsJSON = records.map(record => record.toJSON());

  res.status(200).json({ success: true, data: recordsJSON });
};

/**
 * Update a Fix And Flip record.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const updateFixAndFlip: RequestHandler = async (req, res, next) => {
  const recordId = req.params.id;
  let record;

  try {
    record = await FixAndFlip.findByPk(recordId);
  } catch (err) {
    return next(new ServerError());
  }

  if (!record) {
    return next(new NotFoundError());
  }

  const userId = record.getDataValue("UserId");

  if (userId !== req.session.userId) {
    return next(new ForbiddenError());
  }

  try {
    await record.update(req.body);
  } catch (err) {
    return next(new ServerError());
  }

  const recordJSON = record.toJSON();

  res.status(200).json({
    success: true,
    data: recordJSON,
  });
};

/**
 * Delete a Fix And Flip record.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const deleteFixAndFlip: RequestHandler = async (req, res, next) => {
  const recordId = req.params.id;
  let record;

  try {
    record = await FixAndFlip.findOne({ where: { id: recordId } });
  } catch (err) {
    return next(new ServerError());
  }

  if (!record) {
    return next(new NotFoundError());
  }

  if (record.UserId !== req.session.userId) {
    return next(new ForbiddenError());
  }

  try {
    await record.destroy();
  } catch (err) {
    return next(new ServerError());
  }

  res.status(200).json({
    success: true,
    message: "Fix And Flip record deleted.",
  });
};
