import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { FixAndFlip } from "@db/models";

export const postFixAndFlip = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const {
    property_details: {
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
    },
    estimates: { after_repair_value, desired_profit },
    purchase_costs: { purchase_closing_costs },
    rehab_costs: { repair_costs, holding_costs, holding_time_months },
    sales_costs: { agent_commission, sale_closing_costs },
  } = req.body;

  try {
    await FixAndFlip.create({
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
    });

    res.status(201).json({
      message: "Fix And Flip form submitted successfully.",
      submission: {
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
      },
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
