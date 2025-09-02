import sqlite3 from 'sqlite3';

import { databaseConfig } from '../config/database';

export class Database {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(databaseConfig.path);
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public query<T>(sql: string, params: any[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows as T[]);
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public run(sql: string, params: any[]): Promise<{ changes: number; id: number }> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({ changes: this.changes, id: this.lastID });
            });
        });
    }
}

export const database = new Database();
