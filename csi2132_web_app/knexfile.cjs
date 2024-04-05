module.exports = {
    client: "postgresql",
    connection: {
        database: "YOUR_DATABASE_NAME",
        user: "YOUR_USERNAME",
        password: "YOUR_PASSWORD",
    },
    pool: {
        min: 2,
        max: 10,
    },
};