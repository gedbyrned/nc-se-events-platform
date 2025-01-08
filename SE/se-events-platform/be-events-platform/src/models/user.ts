import { DataTypes, Model } from "sequelize";
import sequelize from "./index"; // Sequelize instance

class User extends Model {
  public user_id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: string;
  public created_at!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['user', 'staff']], // Ensuring role is either 'user' or 'staff'
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Passing the sequelize instance
    tableName: "users", // Table name in database
    modelName: "User", // Model name
    timestamps: false, // Since you handle the `created_at` manually
  }
);

export default User;
