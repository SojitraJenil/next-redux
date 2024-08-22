import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://jenil:jenil@cluster0.rfs9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function testConnection() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("MongoDB connection successful");
    await client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

testConnection();
