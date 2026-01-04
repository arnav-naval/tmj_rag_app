from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    pinecone_api_key: str = Field(..., validation_alias="PINECONE_API_KEY")
    pinecone_index_name: str = Field(..., validation_alias="PINECONE_INDEX_NAME")
    openai_api_key: str = Field(..., validation_alias="OPENAI_API_KEY")

    embedding_model: str = "text-embedding-3-small"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

