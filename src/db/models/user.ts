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
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // These mixins must be declared virtually because TS cannot determine
  // model association at compile time. They will only exist once Model.init
  // is called. For more information, see
  // https://sequelize.org/docs/v6/other-topics/typescript/
  declare getFixAndFlips: HasManyGetAssociationsMixin<FixAndFlip>;
  declare addFixAndFlip: HasManyAddAssociationMixin<FixAndFlip, number>;
  declare addFixAndFlips: HasManyAddAssociationsMixin<FixAndFlip, number>;
  declare setFixAndFlips: HasManySetAssociationsMixin<FixAndFlip, number>;
  declare removeFixAndFlip: HasManyRemoveAssociationMixin<FixAndFlip, number>;
  declare removeFixAndFlips: HasManyRemoveAssociationsMixin<FixAndFlip, number>;
  declare hasFixAndFlip: HasManyHasAssociationMixin<FixAndFlip, number>;
  declare hasFixAndFlips: HasManyHasAssociationsMixin<FixAndFlip, number>;
  declare countFixAndFlips: HasManyCountAssociationsMixin;
  declare createFixAndFlip: HasManyCreateAssociationMixin<
    FixAndFlip,
    "ownerId"
  >;
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
