import sequelize from "@db/connection";
import User from "@db/models/user";
import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

export const propertyTypes = [
  "Single Family Home",
  "Townhouse",
  "Duplex",
  "Condo",
  "Apartment",
  "Other",
] as const;

type PropertyType = (typeof propertyTypes)[number];

export function isPropertyType(value: any): value is PropertyType {
  return propertyTypes.includes(value);
}

export class FixAndFlip extends Model<
  InferAttributes<FixAndFlip>,
  InferCreationAttributes<FixAndFlip>
> {
  declare UserId: ForeignKey<User["id"]>;
  declare User?: NonAttribute<User>;

  declare id: CreationOptional<number>;
  declare street_address: string;
  declare city: string;
  declare state: string;
  declare zip_code: string;
  declare property_type: string | null;
  declare num_bedrooms: number | null;
  declare num_bathrooms: number | null;
  declare square_footage: number | null;
  declare year_built: number | null;
  declare description: string | null;
  declare after_repair_value: number;
  declare desired_profit: number;
  declare purchase_closing_costs: number;
  declare repair_costs: number;
  declare holding_costs: number;
  declare holding_time_months: number;
  declare agent_commission: number;
  declare sale_closing_costs: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;
}

FixAndFlip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    after_repair_value: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    desired_profit: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    purchase_closing_costs: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
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
    agent_commission: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sale_closing_costs: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "FixAndFlips",
    sequelize,
  }
);
