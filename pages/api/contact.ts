import { Contact } from "@/models/contact";
import { mongooseConnection } from "@/lib/mongoose";

export default async function handle(req: any, res: any) {
  const { method } = req;
  await mongooseConnection();

  if (method === "GET") {
    res.json(await Contact.find());
  }

  if (method === "POST") {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    const date = new Date();

    const contactDoc = await Contact.create({
      name,
      email,
      subject,
      message,
      date: date,
    });
    res.json(contactDoc);
  }

  if (method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedContact = await Contact.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }

      return res.status(200).json({ success: true, data: deletedContact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
}
