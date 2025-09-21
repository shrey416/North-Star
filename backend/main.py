from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI app instance
app = FastAPI(
    title="North Star API",
    description="The backend for the personalized AI career advisor.",
    version="0.1.0",
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your Next.js frontend to communicate with the backend
origins = [
    "http://localhost:8080",  # The default Next.js dev server address
    # Add your production frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
def read_root():
    """A simple health check endpoint."""
    return {"status": "ok", "message": "Welcome to the North Star API!"}

# You can add more routers here later