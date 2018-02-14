const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String
})

userSchema.methods.validPassword = function(candidatePassword) {
  if(this.password != null) {
      return bcrypt.compareSync(candidatePassword, this.password);
  } else {
      return false;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;