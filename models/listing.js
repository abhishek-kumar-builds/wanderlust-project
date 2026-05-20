const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    image:{
        type:  String,
        default:"https://unsplash.com/photos/modern-living-room-with-natural-light-and-wooden-accents-2cfj0Y5ch00",
        set:(v)=> v ===""?"https://unsplash.com/photos/modern-living-room-with-natural-light-and-wooden-accents-2cfj0Y5ch00" : v},
    price: Number,
    location: String,
    country: String,
});

const Listing =mongoose.model("Listing",listingSchema);
module.exports = Listing;