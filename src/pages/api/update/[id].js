import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const client = await clientPromise;
      const db = client.db("nextjs-mongodb-demo");

      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const { title, content } = req.body;

      if (!title && !content) {
        return res.status(400).json({ error: "Title or content is required" });
      }

      const collection = db.collection("posts");
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, content, updatedAt: new Date() } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Post updated successfully" });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
