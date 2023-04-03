import User from "./users.js";

const admins = User.discriminator("Admin", {}, { discriminatorKey: "_type" });

export default admins
