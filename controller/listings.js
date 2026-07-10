const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const { q, category } = req.query;
    let filter = {};

    if (q) {
        const regex = new RegExp(q, "i");
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
            { description: regex },
        ];
    }

    if (category && category !== "trending") {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", {
        allListings,
        q: q || "",
        category: category || "trending",
    });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id }= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {
      path:"author",
    },}).populate("owner");
    if (!listing) {
    req.flash("error","Listing you requested for does not exist");
    return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async (req, res) => {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }
        await newListing.save();
        req.flash("success","New listing created");
        res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error","Listing you requested for does not exist");
    return res.redirect("/listings");
    }
    let originalImageUrl = listing.image?.url || "";
    if (originalImageUrl.includes("/upload")) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    }
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
        let { id } = req.params;
        let updateData = { ...req.body.listing };
        if (req.file) {
            updateData.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }
        await Listing.findByIdAndUpdate(id, updateData, { new: true });
        req.flash("success", "Listing updated");
        res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
    req.flash("success","listing deleted");
  res.redirect("/listings");
};

