import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Booking extends Model {
  public id!: string;
  public userId!: number;
  public serviceId!: string;
  public date!: Date;
  public status!: 'pending' | 'confirmed' | 'cancelled';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
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
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    }
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
  }
);

export default Booking;
