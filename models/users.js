import { model, Schema } from "mongoose";

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
});

const userModel = model("user", userSchema);
export default userModel;
