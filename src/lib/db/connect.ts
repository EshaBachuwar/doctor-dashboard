import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

declare global {
  var mongoose: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  console.log('dbConnect');
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;
