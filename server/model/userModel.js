const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  passwordChangedAt: Date,
  passwordToken: String,
  passwordTokenExpiredAt: Date,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.confrimPassword = undefined;
  next();
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
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
userSchema.methods.changedPasswordToken = function (jwtTokenExpired) {
  const parseTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  if (jwtTokenExpired < parseTime) return false;
  return true;
};
userSchema.methods.passwordResetTokenCreate = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordTokenExpiredAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
