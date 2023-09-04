import { connectMongoDB } from "@/libs/MongoConnect";
import Task from "@/models/TaskModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET request are allowed." });
    return;
  }

  try {
    await connectMongoDB();
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
