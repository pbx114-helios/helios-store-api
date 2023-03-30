import { model, Schema } from "mongoose";
import { validate } from "email-validator";

const userSchema = new Schema({
    name: { type: String, required: [true, "Please provide all the details"] },
    username: {
        type: String,
        required: [true, "Please provide all the details"],
    },
    password: {
        type: String,
        required: [true, "Please provide all the details"],
    },
    email: {
        type: String,
        validate: [validate, "Please provide a valid email id"],
    },
});

const userModel = model("user", userSchema);
export default userModel;
