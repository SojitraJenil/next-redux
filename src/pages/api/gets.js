import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");
    const collection = db.collection("posts");

    console.log("db=======>", db);
    console.log("collection======>", collection);

    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    console.log("Query Parameters:", { pageNumber, limitNumber });

    try {
      const data = await collection
        .find({})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .toArray();

      if (!data.length) {
        console.warn("No data found for the given query.");
      }

      console.log("Query Results:", data);
      res.status(200).json({ status: "Data Show Successfully", data });
    } catch (queryError) {
      console.error("Query Error:", queryError);
      res
        .status(500)
        .json({ error: "An error occurred while querying the database" });
    }
  } catch (error) {
    console.error("Database Connection Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while connecting to the database" });
  }
}
