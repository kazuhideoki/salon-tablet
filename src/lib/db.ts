import serverlessMysql from "serverless-mysql";

const config = {
        config: {
          host: process.env.NEXT_PUBLIC_MYSQL_HOST,
          database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
          user: process.env.NEXT_PUBLIC_MYSQL_USER,
          password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
          socketPath: undefined,
        },
      };
config.config.socketPath = process.env.NODE_ENV === "production" && process.env.CLOUD_SQL_CONNECTION_NAME

const mysql = serverlessMysql(config)

// ※db(``)の返り値は常に[]
export const db = async (query, params?) => {


    console.log('mysqlのconfigは ' + JSON.stringify(config))
 
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
};
