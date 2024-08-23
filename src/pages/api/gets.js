import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");
    const collection = db.collection("posts");
    const data = await collection.find({}).toArray();
    res.status(200).json({ status: "Data Show Successfully", data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
