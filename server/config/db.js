const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

let isConnected = false;
let fallbackStore = null;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/flyjatri';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection failed (${error.message}).`);
    console.log(`🚀 Seamlessly running in High-Performance Local Mock/JSON Store Mode.`);
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
