import { mongooseConnection } from "@/lib/mongoose";
import { Newsletter } from "@/models/newsletter";

export default async function handle(req: any, res: any) {
  const { method } = req;
  await mongooseConnection();

  if (method === "GET") {
    res.json(await Newsletter.find());
  } else if (method === "POST") {
    const { email } = req.body;
    const date = new Date();
    const newsletterDoc = await Newsletter.create({
      email,
      date: date,
    });
    res.json(newsletterDoc);
  } else if (method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedNewsletter = await Newsletter.findByIdAndDelete(id);

      if (!deletedNewsletter) {
        return res.status(404).json({ success: false, message: 'Newsletter not found' });
      }

      return res.status(200).json({ success: true, data: deletedNewsletter });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
