# ✂️ CutURL

**CutURL** is a modern, full-stack **link shortener app** built with  
⚡ **FastAPI** (Python) for the backend & 🌐 **Next.js** for the frontend.

Create, manage, and share short links easily — all in a clean and user-friendly interface.

---

## 🚀 Features

- ✏️ Shorten any long URL with one click
- 📊 View and manage your created short links
- ⚙️ Built with a modular, scalable architecture
- 💻 Fully responsive frontend built with Next.js
- 🐍 Fast and lightweight backend with FastAPI & SQLAlchemy

---

## 🛠 Tech Stack

| Frontend | Backend  | Database |
| -------: | :------: | -------: |
| Next.js  | FastAPI  | MySQL (via SQLAlchemy & PyMySQL) |

Other tools:  
- Uvicorn  
- Pydantic  
- Tailwind CSS or Chakra UI (optional)

---

## 📦 Getting Started (Local)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mSrishan/cuturl.git
cd cuturl

cd server
python -m venv venv
.\venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload

cd ../frontend
npm install
npm run dev


