import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  var uri =
    "mongodb+srv://myMongoAdmin:CBWvii08!@cluster0.fvgkv.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  switch (req.method) {
    case "POST":
      try {
        const database = client.db("SSMW");
        const table = database.collection("Cars");
        await table.insertOne(req.body);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        res.status(200).json("ok");
      }
      break;
    default:
      let cars;
      try {
        const database = client.db("SSMW");
        const table = database.collection("Cars");
        const cursor = table.find({});
        cars = await cursor.toArray();
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        res.status(200).json(cars);
      }
      break;
  }
}
