require("../utils/MongooseUtil");
const Models = require("./Models");

const OrderDAO = {
  async insert(order) {
    const mongoose = require("mongoose");
    order._id = new mongoose.Types.ObjectId();
    const result = await Models.Order.create(order);
    return result;
  },
  async selectByCustID(_cid) {
    const query = { "customer._id": _cid };
    const orders = await Models.Order.find(query).exec();
    return orders;
  },
  async selectAll() {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const orders = await Models.Order.find(query).sort(mysort).exec();
    return orders;
  },
  async update(_id, newStatus) {
    const newvalues = { status: newStatus };
    const result = await Models.Order.findByIdAndUpdate(_id, newvalues, { new: true });
    return result;
  },
  async selectProductRevenue() {
    const revenueData = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { 
        _id: '$items.product._id', 
        revenue: { $sum: { $multiply: ['$items.quantity', '$items.product.price'] } }, 
        productName: { $first: '$items.product.name' },
        totalQuantity: { $sum: '$items.quantity' }
      } },
      { $sort: { revenue: -1 } } // descending
    ]).exec();
    return revenueData;
  }
};
module.exports = OrderDAO;
