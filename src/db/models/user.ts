import sequelize from "@db/connection";
import { FixAndFlip } from "@db/models/fix-and-flip";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  NonAttribute,
  Association,
} from "sequelize";

class User extends Model<
  InferAttributes<User, { omit: "fixAndFlips" }>,
  InferCreationAttributes<User, { omit: "fixAndFlips" }>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getFixAndFlips: HasManyGetAssociationsMixin<FixAndFlip>;
  declare addFixAndFlip: HasManyAddAssociationMixin<FixAndFlip, number>;
  declare addFixAndFlips: HasManyAddAssociationsMixin<FixAndFlip, number>;
  declare setFixAndFlips: HasManySetAssociationsMixin<FixAndFlip, number>;
  declare removeFixAndFlip: HasManyRemoveAssociationMixin<FixAndFlip, number>;
  declare removeFixAndFlips: HasManyRemoveAssociationsMixin<FixAndFlip, number>;
  declare hasFixAndFlip: HasManyHasAssociationMixin<FixAndFlip, number>;
  declare hasFixAndFlips: HasManyHasAssociationsMixin<FixAndFlip, number>;
  declare countFixAndFlips: HasManyCountAssociationsMixin;
  declare createFixAndFlip: HasManyCreateAssociationMixin<FixAndFlip, "UserId">;

  declare fixAndFlips?: NonAttribute<FixAndFlip[]>;

  declare static associations: {
    fixAndFlips: Association<User, FixAndFlip>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "Users",
    sequelize,
  }
);

export default User;
