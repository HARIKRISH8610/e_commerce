const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    confrimPassword: {
      type: String,
      required: [true, "ConfrimPassword is required"],
      validate: {
        validator: function (el) {
          console.log(el);
          return el === this.password;
        },
        message: "Password and confrim password are not same",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "lead", "user"],
        message: "Role must be with in admin, lead and user",
      },
      required: [true, "Role is required for creating user"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.confrimPassword = undefined;
  next();
});

userSchema.methods.checkLoginPassword = async function (
  dbPassword,
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
