import { LoaderFunction, json } from "@remix-run/node";
import Joi from "joi";
import mailService from "~/services/mailService.server";

export const action: LoaderFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, { status: 405 });
  }
  const data = await request.json();
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).required(),
    message: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    return json({ message: error.details[0].message }, { status: 422 });
  }
  try {
    await mailService.send(data);
  } catch (error) {
    console.error({ error });
    return json({ message: "Failed to send your message" }, { status: 500 });
  }
  return json({ sent: true });
};
