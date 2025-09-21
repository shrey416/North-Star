import os
import ssl
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

def get_database_url():
    db_host = os.environ.get("INSTANCE_HOST", "127.0.0.1")  # Use 127.0.0.1 if using Cloud SQL Proxy
    db_user = os.environ.get("DB_USER", "postgres")
    db_pass = os.environ.get("DB_PASS", "Polaris@1")
    db_name = os.environ.get("DB_NAME", "postgres")
    db_port = os.environ.get("DB_PORT", "5432")
    # Use asyncpg for async SQLAlchemy
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

def get_connect_args():
    connect_args = {}
    # Only set SSL if all certs are provided
    db_root_cert = os.environ.get("DB_ROOT_CERT")
    db_cert = os.environ.get("DB_CERT")
    db_key = os.environ.get("DB_KEY")
    if db_root_cert and db_cert and db_key:
        ssl_context = ssl.create_default_context(cafile=db_root_cert)
        ssl_context.load_cert_chain(certfile=db_cert, keyfile=db_key)
        connect_args["ssl"] = ssl_context
    else:
        # If not using SSL, explicitly set ssl to None for asyncpg
        connect_args["ssl"] = None
    return connect_args

DATABASE_URL = get_database_url()
CONNECT_ARGS = get_connect_args()

# Remove unsupported pool arguments for asyncpg
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args=CONNECT_ARGS,
)

AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(
                text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
            )
            tables = [row[0] for row in result.fetchall()]
            print(f"Connected to DB. Tables in 'public' schema: {tables}")
        except Exception as e:
            print(f"Database connection error: {e}")
        yield session

# --- Cloud SQL Proxy Note ---
# If connecting to Google Cloud SQL, run the Cloud SQL Proxy locally:
# cloud_sql_proxy --instance=<INSTANCE_CONNECTION_NAME>=tcp:5432
# Then set INSTANCE_HOST=127.0.0.1 and DB_PORT=5432 in your environment.