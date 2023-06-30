import sequelize from "@db/connection";
import { DataTypes } from "sequelize";

const FixAndFlip = sequelize.define("FixAndFlip", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // property info
  street_address: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  num_bedrooms: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  num_bathrooms: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  square_footage: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  year_built: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // estimates
  after_repair_value: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  desired_profit: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  // purchase costs
  purchase_closing_costs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  // rehab costs
  repair_costs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  holding_costs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  holding_time_months: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  // sales costs
  agent_commission: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  sale_closing_costs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

export default FixAndFlip;
