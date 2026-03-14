import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: string;
  public category!: string;
  public type!: string;
  public price!: number;
  public stock!: number;
  public status!: string;
  public description!: string;
  public shades?: string[];
  public details!: { label: string; content: string }[];
  public rating!: number;
  public reviews!: number;
  public image!: string;
  public providerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
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
      defaultValue: 'Physical Product',
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'product',
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shades: {
      type: DataTypes.JSON, // Stores array of strings
      defaultValue: [],
    },
    details: {
      type: DataTypes.JSON, // Stores array of objects
      defaultValue: [],
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product;
