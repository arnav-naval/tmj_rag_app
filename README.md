# TMJ RAG Chatbot Application

A Retrieval-Augmented Generation (RAG) chatbot application designed to provide accurate, context-aware answers about Temporomandibular Joint (TMJ) and Temporomandibular Disorders (TMD) using a modern web interface. The system is trained on reputable medical documents and leverages advanced AI to deliver informative responses.

## 🎯 Overview

This application consists of three main components:

1. **Frontend**: Angular 19 web application with a chat interface
2. **Backend API**: FastAPI server providing RAG-powered chat endpoints
3. **Ingestion Pipeline**: Jupyter notebook for processing PDF documents and populating the vector database

## 🏗️ Architecture

### Frontend (Angular Application)
- **Framework**: Angular 19 with standalone components
- **Styling**: TailwindCSS 4.x with DaisyUI components
- **Components**: Modular chat interface with header, messages, input, and overview components
- **API Integration**: Communicates with FastAPI backend via HTTP
- **State Management**: Angular signals for reactive state management
- **Port**: Runs on `http://localhost:4200`

### Backend API (FastAPI Server)
- **Framework**: FastAPI with async support
- **Vector Store**: Pinecone for semantic search and retrieval
- **Embeddings**: OpenAI `text-embedding-3-small` for vector generation
- **LLM**: OpenAI GPT-4o-mini for response generation
- **RAG Chain**: LangChain-based retrieval and generation pipeline using MMR (Maximum Marginal Relevance)
- **Observability**: LangSmith integration for tracing and monitoring
- **Port**: Runs on `http://localhost:8000`
- **CORS**: Configured for frontend communication

### Ingestion Pipeline (Jupyter Notebook)
- **PDF Processing**: Unstructured library for extracting text, tables, and metadata from PDFs
- **Text Splitting**: LangChain RecursiveCharacterTextSplitter (1000 chars with 200 char overlap)
- **Embedding Generation**: OpenAI embeddings for vector creation
- **Vector Storage**: Pinecone vector database
- **Document Processing**: Processes 11+ TMJ/TMD medical PDF documents

## 📁 Project Structure

```
tmj_rag_app/
├── Frontend/
│   └── tmj_chatbot/              # Angular application
│       ├── src/
│       │   └── app/
│       │       ├── chat/         # Chat components (header, input, message, messages, overview)
│       │       ├── api/          # API client and types
│       │       ├── models/       # Data models
│       │       ├── services/     # Chat service for state management
│       │       └── app.component.*
│       └── package.json
│
├── Backend/
│   └── app/
│       ├── api/
│       │   └── chat.py           # Chat endpoint with RAG chain
│       ├── core/
│       │   ├── deps.py           # Dependency injection (vectorstore, LLM, embeddings)
│       │   ├── lifespan.py       # App lifespan management (initializes vectorstore/LLM)
│       │   └── settings.py       # Configuration from environment variables
│       ├── schemas/
│       │   └── chat_schemas.py   # Pydantic models for request/response
│       └── main.py               # FastAPI application entry point
│
├── Ingestion/
│   ├── notebooks/
│   │   └── ingestion.ipynb       # Jupyter notebook for data processing
│   └── data/
│       └── pdfs/                 # Source PDF documents (11 TMJ/TMD documents)
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) and npm
- **Python** (3.12 or higher)
- **OpenAI API Key** (required for embeddings and LLM)
- **Pinecone API Key** (required for vector storage)
- **LangSmith API Key** (optional, for observability)

### Installation

#### 1. Backend Setup

```bash
cd Backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Frontend Setup

```bash
cd Frontend/tmj_chatbot
npm install
```

#### 3. Ingestion Setup

```bash
cd Ingestion

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### Configuration

#### Backend Configuration

Create a `.env` file in the `Backend` directory:

```env
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=your_pinecone_index_name
OPENAI_API_KEY=your_openai_api_key_here
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_TRACING=True
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_PROJECT=your_project_name
```

#### Ingestion Configuration

Create a `.env` file in the `Ingestion` directory:

```env
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX=your_pinecone_index_name
OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Usage

### Step 1: Data Ingestion

1. Place your TMJ/TMD PDF documents in `Ingestion/data/pdfs/`
2. Open `Ingestion/notebooks/ingestion.ipynb` in Jupyter
3. Update the file path if needed (default: `C:/Users/User/Downloads/tmj_rag_app/Ingestion/data/pdfs`)
4. Run all cells to:
   - Extract text from PDFs using Unstructured library
   - Convert to LangChain Document objects
   - Split documents into chunks (1000 chars, 200 overlap)
   - Generate embeddings using OpenAI
   - Store embeddings in Pinecone vector database

### Step 2: Start the Backend API

```bash
cd Backend
# Activate virtual environment first
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Step 3: Start the Frontend

```bash
cd Frontend/tmj_chatbot
npm start
```

The application will be available at `http://localhost:4200`

Navigate to `/chat` to access the chatbot interface.

### API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔧 Technology Stack

### Frontend
- **Angular** 19.2.0
- **TypeScript** 5.7.2
- **TailwindCSS** 4.1.18
- **DaisyUI** 5.5.14
- **RxJS** 7.8.0

### Backend
- **FastAPI** 0.128.0
- **LangChain** 1.2.0
- **LangChain OpenAI** 1.1.6
- **LangChain Pinecone** 0.2.13
- **OpenAI** 2.14.0
- **Pinecone** 7.3.0
- **Uvicorn** 0.40.0
- **Pydantic** 2.12.5

### Ingestion
- **Python** 3.12+
- **Unstructured** library for PDF processing
- **LangChain** for document processing and text splitting
- **OpenAI** for embeddings
- **Pinecone** for vector storage
- **Jupyter** Notebooks

## 📊 How It Works

### Data Flow

1. **Ingestion Phase** (One-time setup):
   - PDFs are processed and text is extracted
   - Documents are chunked into smaller pieces
   - Embeddings are generated for each chunk
   - Embeddings are stored in Pinecone vector database

2. **Query Phase** (Runtime):
   - User submits a question via the Angular frontend
   - Frontend sends POST request to `/chat` endpoint
   - Backend uses RAG chain:
     - Converts query to embedding
     - Retrieves top 5 relevant chunks from Pinecone using MMR
     - Passes context and query to GPT-4o-mini with medical prompt
     - Returns generated response to frontend
   - Frontend displays the response in the chat interface

### RAG Chain Details

The RAG chain uses:
- **Retrieval**: MMR (Maximum Marginal Relevance) search for diverse, relevant results
- **Prompt Template**: Specialized medical prompt that instructs the LLM to:
  - Answer only using provided context
  - Use precise medical terminology
  - Indicate when context is insufficient
  - Include medical disclaimer
- **LLM**: GPT-4o-mini with temperature=0.0 for consistent, factual responses

## 🎨 Key Features

- **Semantic Search**: Vector-based retrieval for contextually relevant document chunks
- **Medical Specialization**: Tailored prompts for TMJ/TMD medical information
- **Context-Aware Responses**: RAG ensures answers are grounded in source documents
- **Modern UI**: Beautiful, responsive chat interface built with Angular and TailwindCSS
- **Observability**: LangSmith integration for monitoring and debugging
- **Stateless Architecture**: Each request is independent, allowing for easy scaling

## ⚠️ Important Notes

- **Medical Disclaimer**: This application provides informational purposes only and does not replace professional medical advice. Always consult healthcare professionals for medical advice and treatment.
- **API Costs**: Using OpenAI and Pinecone APIs will incur costs based on usage
- **Data Privacy**: Ensure compliance with healthcare data regulations when processing medical documents
- **Vector Store**: The application uses Pinecone (cloud-based). Ensure your Pinecone index is properly configured and accessible.

## 🔮 Future Enhancements

- [ ] Chat history persistence
- [ ] User authentication and session management
- [ ] Source citations in responses
- [ ] Support for ChromaDB (local vector store) option
- [ ] Multi-language support
- [ ] Enhanced document management interface
- [ ] Streaming responses for better UX

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Arnav Naval - arnav.naval@gmail.com

---

**Note**: This project is designed for educational and informational purposes. Always consult healthcare professionals for medical advice and treatment.
