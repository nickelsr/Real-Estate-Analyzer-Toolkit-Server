import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { FixAndFlip, User } from "@db/models";

export const createFixAndFlip = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const userId = res.locals.userId;
  const fixAndFlipProps = parseReqBody(req);

  try {
    const duplicateAddress = await FixAndFlip.findOne({
      where: { street_address: fixAndFlipProps.street_address },
    });
    if (duplicateAddress) {
      return res.status(400).json({
        message:
          "Duplicate street address. User can only have one Fix-And-Flip " +
          "entry with the same address. Either delete the existing entry " +
          "and retry, or edit the existing entry instead.",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Cannot create record." });
    }

    const record = await user.createFixAndFlip(fixAndFlipProps);

    res.status(201).json({
      message: "Fix And Flip form submitted successfully.",
      record: record,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(400).json({
      message: "There was an error submitting the Fix and Flip form.",
    });
  }
};

export const getFixAndFlip = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const recordId = req.params.id;

  try {
    const record = await FixAndFlip.findByPk(recordId);
    if (!record) {
      return res.status(400).json({ message: "Invalid recordId." });
    }

    const ownerId = record.getDataValue("UserId");
    if (ownerId !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User is not the record owner." });
    }

    return res.status(200).json({ record: record });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(400)
      .json({ message: "There was an error fetching the record." });
  }
};

export const getFixAndFlips = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const records = await user.getFixAndFlips();

    return res.status(200).json({
      message: "Fix And Flip records fetched successfully.",
      records: records,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(400)
      .json({ message: "Failed to fetch users Fix And Flip records." });
  }
};

export const updateFixAndFlip = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const recordId = req.params.id;
  const userId = res.locals.userId;
  const fixAndFlipProps = parseReqBody(req);

  try {
    const record = await FixAndFlip.findByPk(recordId);
    if (!record) {
      return res
        .status(404)
        .json({ message: "Fix And Flip record not found." });
    }
    const ownerId = record.getDataValue("UserId");
    if (ownerId !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User is not the record owner." });
    }

    await record.update(fixAndFlipProps);

    return res.status(200).json({
      message: "Fix And Flip record updated successfully.",
      record: record,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(400)
      .json({ message: "Failed to update Fix And Flip record." });
  }
};

export const deleteFixAndFlip = async (req: Request, res: Response) => {
  const recordId = req.params.id;
  const userId = res.locals.userId;

  try {
    const record = await FixAndFlip.findOne({ where: { id: recordId } });
    if (!record) {
      return res
        .status(404)
        .json({ message: "Fix And Flip record not found." });
    }

    const owner = record.getDataValue("UserId");
    if (owner !== userId) {
      return res
        .status(401)
        .json({ message: "User does not own the Fix And Flip record." });
    }

    await record.destroy();
    return res
      .status(200)
      .json({ message: "Fix And Flip record deleted successfully." });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(400)
      .json({ message: "Fix And Flip record failed to delete." });
  }
};

const parseReqBody = (req: Request) => {
  const {
    street_address,
    city,
    state,
    zip_code,
    property_type,
    num_bedrooms,
    num_bathrooms,
    square_footage,
    year_built,
    description,
    after_repair_value,
    desired_profit,
    purchase_closing_costs,
    repair_costs,
    holding_costs,
    holding_time_months,
    agent_commission,
    sale_closing_costs,
  } = req.body;

  return {
    street_address,
    city,
    state,
    zip_code,
    property_type,
    num_bedrooms,
    num_bathrooms,
    square_footage,
    year_built,
    description,
    after_repair_value,
    desired_profit,
    purchase_closing_costs,
    repair_costs,
    holding_costs,
    holding_time_months,
    agent_commission,
    sale_closing_costs,
  };
};
