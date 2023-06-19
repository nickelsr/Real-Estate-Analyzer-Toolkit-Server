import sequelize from "@db/connection";
import { DataTypes } from "sequelize";

const fixAndFlip = sequelize.define("fixAndFlip", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  // property info
  street_address: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  num_bedrooms: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  num_bathrooms: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  square_footage: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  year_built: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // estimates
  after_repair_value: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  desired_profit: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  // purchase costs
  purchase_closing_costs: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  // rehab costs
  repair_costs: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  holding_costs: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  holding_time_months: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  // sales costs
  agent_commission: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  sale_closing_costs: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

export default fixAndFlip;
