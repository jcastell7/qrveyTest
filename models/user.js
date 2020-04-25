const Schema = mongoose.Schema;
var ObjectID = require("bson-objectid");

const userSchema = new Schema({
  _id: ObjectId,
  userName: String,
  password: String,
  set: obfuscate,
  set: createId
});

const obfuscate = password => {
  return password
    ? (password = createPasswordHash(password))
    : (password = createPasswordHash("1234"));
};
const createPasswordHash = password => {
  return passwordhash.hashPassword(password);
};

const createId = () => {
  return ObjectID().toString();
};

let user = mongoose.model("User", userSchema);

module.exports = { User: user };
