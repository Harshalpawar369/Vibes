const axios = require("axios");
const orderModel = require("../../models/orderModel");
const shopitemModel = require("../../models/shopItem");

async function getRecommendations(req, res) {
  try {
    const userId = req.user._id;

    const pastOrders = await orderModel.find({ user: userId }).populate("items.item");
    

    if (!pastOrders || pastOrders.length === 0) {
      const trendingItems = await shopitemModel.find().limit(4);
      return res.status(200).json({ type: "trending", items: trendingItems });
    }

    let userFeatures = "";
    pastOrders.forEach(order => {
      order.items.forEach(line => {
        if (line.item) {
          
          userFeatures += `${line.item.category} ${line.item.brandName} `; 
        }
      });
    });

   
    const fullCatalog = await shopitemModel.find().select("_id category brandName");
    const catalogPayload = fullCatalog.map(item => ({
      id: item._id.toString(),
      features: `${item.category} ${item.brandName}`
    }));

   
    const pythonResponse = await axios.post("http://localhost:8000/recommend", {
      catalog: catalogPayload,
      user_features: userFeatures.trim()
    });

    const recommendedIds = pythonResponse.data.recommended_ids;

    const recommendedItems = await shopitemModel.find({ _id: { $in: recommendedIds } });

    return res.status(200).json({ type: "personalized", items: recommendedItems });

  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getRecommendations };