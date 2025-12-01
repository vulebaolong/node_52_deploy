import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const PORT = process.env.PORT;

export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

// chỉ log khi dev để kiểm tra
// khi lên prod phải tắt đi
console.log(
  '\n',
  {
    DATABASE_URL: DATABASE_URL,
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
    ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
    PORT: PORT,

    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_PASSWORD,
  },
  '\n',
);
