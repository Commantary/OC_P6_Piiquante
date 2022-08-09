const { mongoose } = require("mongoose");

let client = null;

function connect(url, callback) {
   // Connect to MongoDB
   mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });

   // Get the mongoose connection
   client = mongoose.connection;

   // Bind connection to error event (to get notification of connection errors)
   client.on("connected", () => {
      console.log("Connected to MongoDB");
      callback();
   })

   client.on("error", (err) => {
      console.log("Error connecting to MongoDB: " + err);
      callback(err);
   });

   client.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
   });

   client.on("close", () => {
      console.log("Connection to MongoDB closed");
   });

   client.on("reconnected", () => {
      console.log("Reconnected to MongoDB");
   });

   client.on("timeout", () => {
      console.log("Timeout connecting to MongoDB");
   });

   client.on("open", () => {
      console.log("Connection to MongoDB opened");
   });

   client.on("reconnectFailed", () => {
      console.log("Reconnect failed to MongoDB");
   });
}

function db() {
   return client;
}

module.exports = {connect, client, db};
