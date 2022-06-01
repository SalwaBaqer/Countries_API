const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://salwa:salwa@cluster0.2wrxq.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
