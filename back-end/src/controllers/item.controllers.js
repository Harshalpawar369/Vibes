const shopitemModel = require('../../models/shopItem');
const {uploadFile} = require('../../services/storage.services.js')
const { v4:uuid } = require('uuid')

async function createItem(req,res){

    try {

        console.log("Body:", req.body);
        console.log("File:", req.file);

      if (!req.file) return res.status(400).json({ message: "No image provided" });

        const uploadResponse = await uploadFile(req.file.buffer, Date.now() + "-" + req.file.originalname);

        const newItem = await shopitemModel.create({
            itemCategory: req.body.itemCategory,
            brandName: req.body.brandName,
            price: req.body.price,
            image: uploadResponse.url 
        });

        return res.status(201).json({
            message: "Item added successfully",
            item: newItem
        });

    } catch (error) {
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
}

async function getItems(req, res) {
    try {
        const items = await shopitemModel.find();   
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
}


module.exports = { createItem, getItems };