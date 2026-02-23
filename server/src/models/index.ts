import User from './User';
import Service from './Service';
import Product from './Product';
import Booking from './Booking';
import Wishlist from './Wishlist';

// User Associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Service, { foreignKey: 'providerId' });
Service.belongsTo(User, { foreignKey: 'providerId' });

User.hasMany(Product, { foreignKey: 'providerId' });
Product.belongsTo(User, { foreignKey: 'providerId' });

// Booking Associations
Booking.belongsTo(Service, { foreignKey: 'serviceId' });
Service.hasMany(Booking, { foreignKey: 'serviceId' });

// Wishlist Associations
Wishlist.belongsTo(Service, { foreignKey: 'serviceId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

export {
  User,
  Service,
  Product,
  Booking,
  Wishlist
};
