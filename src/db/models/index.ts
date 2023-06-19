import User from "./user";
import fixAndFlip from "./fix-and-flip";

User.hasMany(fixAndFlip);
fixAndFlip.belongsTo(User);

export { User, fixAndFlip };
