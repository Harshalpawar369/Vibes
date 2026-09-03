from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI(title="Vibes Recommendation Engine")

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
# Replace 'vibes' with your actual database name if different
db = client.get_database() 
# Mongoose automatically pluralizes model names (shopItem -> shopitems)
items_collection = db["shopitems"] 

class RecommendationRequest(BaseModel):
    user_features: str

@app.post("/recommend")
def get_recommendations(req: RecommendationRequest):
    # 1. Fetch catalog directly from MongoDB (Only fetch necessary fields)
    catalog_cursor = items_collection.find({}, {"_id": 1, "category": 1, "brandName": 1, "name": 1})
    
    item_ids = []
    item_features = []
    
    for item in catalog_cursor:
        item_ids.append(str(item["_id"]))
        # Combine database fields into a single string for the ML algorithm
        features = f"{item.get('category', '')} {item.get('brandName', '')} {item.get('name', '')}"
        item_features.append(features.strip())
        
    if not item_features:
        raise HTTPException(status_code=400, detail="Store catalog is empty")
        
    # 2. Add user's profile to the matrix
    corpus = item_features + [req.user_features]
    user_index = len(corpus) - 1

    # 3. Run TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)

    # 4. Calculate Cosine Similarity
    cosine_sim = cosine_similarity(tfidf_matrix[user_index], tfidf_matrix[:-1])
    
    # 5. Extract Top 4 recommendations
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    top_items = []
    for index, score in sim_scores:
        if score > 0.05: # Add a small threshold so it doesn't recommend completely random things
            top_items.append(item_ids[index])
        if len(top_items) == 4:
            break

    return {"recommended_ids": top_items}