from fastapi import APIRouter
from app.models.user import User

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@router.get("/users", response_model=list[User])
def get_users():
    return [
        {"id": 1, "name": "Srishan"},
        {"id": 2, "name": "Kasun"}
    ]
