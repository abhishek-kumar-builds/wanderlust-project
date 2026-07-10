const mongoose = require("mongoose");
require("dotenv").config();
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/wanderlust";

function assignCategory(listing) {
    const text = `${listing.title} ${listing.description}`.toLowerCase();

    if (/pool|swim|beach|ocean|lake/.test(text)) return "amazing-pools";
    if (/mountain|cabin|retreat|ski|alpine|himalaya/.test(text)) return "mountains";
    if (/castle|villa|historic|palace|fort/.test(text)) return "castles";
    if (/camp|tent|wilderness|forest/.test(text)) return "camping";
    if (/farm|ranch|countryside|vineyard/.test(text)) return "farm";
    if (/arctic|snow|igloo|polar|winter/.test(text)) return "arctic";
    if (/dome|geodesic|bubble/.test(text)) return "domes";
    if (/boat|yacht|houseboat|sail|river cruise/.test(text)) return "boats";
    if (/downtown|city|urban|loft|apartment|metropolitan/.test(text)) return "iconic-cities";

    return "room";
}

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("old data deleted");
    initData.data = initData.data.map((obj) => ({
        ...obj,
        category: assignCategory(obj),
        owner: "6a133c66b94de76f237474e3",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
