# TMJ RAG Application

A Retrieval-Augmented Generation (RAG) application designed to provide accurate, context-aware answers about Temporomandibular Joint (TMJ) and Temporomandibular Disorders (TMD) using a chatbot interface. The system is trained on reputable medical documents and leverages advanced AI to deliver informative responses.

## 🎯 Features

- **Intelligent Chatbot Interface**: Modern, user-friendly Angular-based chat interface for interacting with TMJ/TMD knowledge base
- **RAG-Powered Responses**: Retrieval-Augmented Generation ensures answers are grounded in authoritative medical documents
- **Comprehensive Document Processing**: Processes multiple PDF documents with intelligent text extraction and chunking
- **Vector-Based Search**: Utilizes ChromaDB and Pinecone for efficient semantic search and retrieval
- **Medical Document Focus**: Trained on 11+ reputable TMJ/TMD medical documents from authoritative sources
- **Modern UI**: Built with Angular 19, TailwindCSS, and DaisyUI for a beautiful, responsive experience

## 🏗️ Architecture

This application follows a two-part architecture:

### Frontend (Angular Application)
- **Framework**: Angular 19 with standalone components
- **Styling**: TailwindCSS 4.x with DaisyUI components
- **Components**: Modular chat interface with header, messages, and input components
- **Routing**: Angular Router for navigation

### Backend/Ingestion (Python Pipeline)
- **Document Processing**: Unstructured library for PDF parsing and extraction
- **Text Splitting**: LangChain RecursiveCharacterTextSplitter for optimal chunking
- **Embeddings**: OpenAI text-embedding-3-small for vector generation
- **Vector Store**: ChromaDB (local) and Pinecone (cloud) support
- **LLM**: OpenAI GPT-4o-mini for response generation
- **RAG Chain**: LangChain-based retrieval and generation pipeline

## 📁 Project Structure

```
tmj_rag_app/
├── Frontend/
│   └── tmj_chatbot/          # Angular application
│       ├── src/
│       │   └── app/
│       │       ├── chat/     # Chat components
│       │       │   ├── chat-header/
│       │       │   ├── chat-input/
│       │       │   ├── chat-message/
│       │       │   ├── chat-messages/
│       │       │   └── chat-overview/
│       │       ├── app.component.*
│       │       ├── app.routes.ts
│       │       └── app.config.ts
│       └── package.json
│
├── Ingestion/
│   ├── notebooks/
│   │   └── ingestion.ipynb   # Jupyter notebook for data ingestion
│   ├── data/
│   │   ├── pdfs/             # Source PDF documents
│   │   └── chroma_db/        # ChromaDB vector database
│   ├── requirements.txt      # Python dependencies
│   └── venv/                 # Python virtual environment
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) and npm
- **Python** (3.12 or higher)
- **OpenAI API Key** (for embeddings and LLM)
- **Pinecone API Key** (optional, if using Pinecone instead of ChromaDB)

### Installation

#### 1. Frontend Setup

```bash
cd Frontend/tmj_chatbot
npm install
```

#### 2. Backend/Ingestion Setup

```bash
cd Ingestion

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

### Configuration

1. **Create a `.env` file** in the `Ingestion` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_INDEX=your_pinecone_index_name
PINECONE_API_KEY=your_pinecone_api_key_here
```

2. **Update file paths** in `ingestion.ipynb` if needed:
   - PDF file path
   - Vector store configuration

## 📖 Usage

### Data Ingestion

1. Place your TMJ/TMD PDF documents in `Ingestion/data/pdfs/`
2. Open `Ingestion/notebooks/ingestion.ipynb` in Jupyter
3. Run all cells to:
   - Extract text from PDFs
   - Split documents into chunks
   - Generate embeddings
   - Store in vector database

### Running the Frontend

```bash
cd Frontend/tmj_chatbot
npm start
```

The application will be available at `http://localhost:4200`

Navigate to `/chat` to access the chatbot interface.

### Building for Production

```bash
cd Frontend/tmj_chatbot
npm run build
```

The production build will be in `dist/tmj_chatbot/`

## 🔧 Technology Stack

### Frontend
- **Angular** 19.2.0
- **TypeScript** 5.7.2
- **TailwindCSS** 4.1.18
- **DaisyUI** 5.5.14
- **RxJS** 7.8.0

### Backend/Ingestion
- **Python** 3.12+
- **LangChain** 1.1.3
- **LangChain OpenAI** 1.1.1
- **LangChain Chroma** 1.0.0
- **LangChain Pinecone** 0.2.13
- **OpenAI** 2.9.0
- **ChromaDB** 1.3.6
- **Unstructured** 0.18.21
- **Jupyter** Notebooks

## 📊 Data Processing Pipeline

1. **PDF Extraction**: Uses Unstructured library to extract text, tables, and metadata from PDFs
2. **Document Conversion**: Converts extracted elements to LangChain Document objects
3. **Text Chunking**: Splits documents into 1000-character chunks with 200-character overlap
4. **Embedding Generation**: Creates vector embeddings using OpenAI's embedding model
5. **Vector Storage**: Stores embeddings in ChromaDB or Pinecone for semantic search
6. **RAG Chain**: Retrieves relevant chunks and generates answers using GPT-4o-mini

## 🎨 Features in Detail

- **Semantic Search**: Uses MMR (Maximum Marginal Relevance) retrieval for diverse, relevant results
- **Context-Aware Responses**: RAG ensures answers are based on actual document content
- **Medical Terminology**: Specialized prompts for accurate medical information delivery
- **Source Attribution**: Tracks document sources for transparency

## ⚠️ Important Notes

- **Medical Disclaimer**: This application provides informational purposes only and does not replace professional medical advice
- **API Costs**: Using OpenAI APIs will incur costs based on usage
- **Data Privacy**: Ensure compliance with healthcare data regulations when processing medical documents

## 🔮 Future Enhancements

- Backend API server for chat functionality
- User authentication and session management
- Chat history persistence
- Multi-language support
- Enhanced document management interface
- Citation and source links in responses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Arnav Naval - arnav.naval@gmail.com
---

**Note**: This project is designed for educational and informational purposes. Always consult healthcare professionals for medical advice and treatment.
