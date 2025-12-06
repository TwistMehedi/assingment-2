import env from "dotenv";

env.config();

const config = {
    port: process.env.PORT,
    database_string: process.env.DATABASE_URI,
    jwt_secrek_key: process.env.JWT_SECREK_KEY
};

export default config;