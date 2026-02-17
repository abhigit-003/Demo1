import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Wishlist extends Model {
  public id!: string;
  public userId!: number;
  public serviceId?: string;
  public productId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Wishlist.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Wishlist',
    tableName: 'wishlists',
    validate: {
      eitherServiceOrProduct() {
        if (!this.serviceId && !this.productId) {
          throw new Error('Either serviceId or productId must be set');
        }
        if (this.serviceId && this.productId) {
          throw new Error('Cannot set both serviceId and productId');
        }
      }
    }
  }
);

export default Wishlist;
