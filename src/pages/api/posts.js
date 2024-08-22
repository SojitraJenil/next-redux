import clientPromise from "../../../lib/mongodb"; // Adjust the path as needed

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");

    switch (req.method) {
      case "POST":
        let bodyObject = req.body;
        let result = await db.collection("posts").insertOne(bodyObject);
        let myPost = await db
          .collection("posts")
          .findOne({ _id: result.insertedId });
        res.json(myPost);
        break;
      case "GET":
        const allPosts = await db.collection("posts").find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error("Database Connection Error:", error); // Log the error details
    res
      .status(500)
      .json({ error: "An error occurred while connecting to the database" });
  }
}
