export const databaseConfig = {
    options: {
        verbose: process.env.NODE_ENV !== 'production',
    },
    path: process.env.DB_PATH ?? './salon.sqlite',
};
