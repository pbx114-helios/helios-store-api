import User from "./users.js";

const vendors = User.discriminator("Vendor", {}, { discriminatorKey: "_type" });

export default vendors
