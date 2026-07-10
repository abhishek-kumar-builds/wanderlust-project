const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

async function initDB() {
    await Listing.deleteMany({});
    console.log("Old data deleted");

    const data = initData.data.map((obj) => ({
        ...obj,
        category: assignCategory(obj),
        owner: "6a133c66b94de76f237474e3",
    }));

    await Listing.insertMany(data);
    console.log("Data initialized");
}

module.exports = initDB;