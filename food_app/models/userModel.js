const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const db_link ='mongodb+srv://admin_27:HOLmQFpdgiCMN2jU@cluster0.68ayqn5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
  console.log("db connected")
})
.catch((error) => {
  console.log("error")
})

const userSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },

  email : {
    type: String,
    required: true,
    unique : true
  },

  password : {
    type: String,
    requires : true
  },

  confirmPassword : {
    type : String,
    requires : true,
    validate : function(){
      return this.password = this.confirmPassword
    }
  },

  role: {
    type: String,
    enum : ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
    default : 'user'
  },

  profileImage: {
    type: String,
    default:'img/users/default.jpeg'
  }
})

userSchema.pre('save', function(){
  this.confirmPassword = undefined
})

userSchema.pre('save', async function(){
  let salt = await bcrypt.genSalt(10); // first generate salt
  let hashString = await bcrypt.hash(this.password, salt); //then use hash
  this.password = hashString;
})

//models

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel;