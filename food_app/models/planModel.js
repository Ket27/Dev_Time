const mongoose = require('mongoose')

const db_link = 'mongodb+srv://admin_27:HOLmQFpdgiCMN2jU@cluster0.68ayqn5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    console.log("db connected")
})
.catch((error) => {
    console.log("error")
})


const planSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true,
        maxlength : 20
    },

    duration :{
        type : Number,
        required : true
    },

    price : {
        type : Number,
        required : true       
    },

    ratingsAverage:{
        type : Number,
    },

    discount : {
        type : Number,
        validate : function(){
            return this.discount < 100
        }
    }
})


const planModel = mongoose.model('planModel', planSchema)

module.exports = planModel