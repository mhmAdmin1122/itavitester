import { model, Schema, models } from "mongoose";

const NewsletterSchema = new Schema({
  email: { type: String, required: true },
  date: { type: Date },
});

export const Newsletter = models.Newsletter || model("Newsletter", NewsletterSchema);