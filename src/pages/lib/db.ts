import serverlessMysql from "serverless-mysql";

const mysql = serverlessMysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export const db = async (query, params?) => {
  try {
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
  } catch (error) {
    return { error };
  }
};
