from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. THIS IS THE MISSING LINE: You must define 'app' first!
app = FastAPI(title="Globe Trotter API")

# Allow your HTML frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define your data models
class UserProfile(BaseModel):
    first_name: str
    last_name: str
    mobile_number: str
    address: str

# 2. Now @app will work perfectly because it was defined above
@app.post("/api/profile")
def create_profile(profile: UserProfile):
    print(f"Saving profile for {profile.first_name} {profile.last_name}")
    return {"message": "Profile initialized successfully", "data": profile.model_dump()}

# (Add your other @app.post and @app.get routes down here)