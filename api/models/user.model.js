import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },profilePicture:{
      type: String,
      default : "https://imgs.search.brave.com/ZZL4lnNTqep3cP88nmZ6YbthIhTsmW5h_tobIuShv8s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2Jsb2ct/cmljaHRleHQtaW1h/Z2UvMTAtcHJvZmls/ZS1waWN0dXJlLWlk/ZWFzLXRvLW1ha2Ut/eW91LXN0YW5kLW91/dC5qcGc",
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
