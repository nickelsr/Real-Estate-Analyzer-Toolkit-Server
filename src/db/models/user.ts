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
  declare username: CreationOptional<string>;
  declare hashedPassword: string;
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
      type: DataTypes.STRING(320), // max email address length as defined in RFC 5321
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20), // limit username to 20 characters
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING(60), // bcrypt resultant hash is 60 characters
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
