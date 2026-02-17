import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Service extends Model {
  public id!: string;
  public name!: string;
  public category!: string;
  public price!: number;
  public duration!: string;
  public description!: string;
  public location!: string;
  public specialist!: string;
  public amenities!: string[];
  public image!: string;
  public rating!: number;
  public reviews!: number;
  public providerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.JSON, // Stores array of strings
      defaultValue: [],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // System services might not have a provider
    }
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
  }
);

export default Service;
