import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("nextjs-mongodb-demo");

      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }
      const collection = db.collection("posts");
      const result = await collection.insertOne({ title, content });
      if (result.acknowledged) {
        res.status(201).json({
          message: "Post created successfully",
          postId: result.insertedId,
        });
      } else {
        res.status(500).json({ error: "Failed to create post" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
