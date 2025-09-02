import { Client, Employee } from '../types/database';
import { database } from '../utils/database';

export type ClientWithEmployee = Client & Employee & { first_visit_date: string };

export class RetentionRepository {
    async getClientsInFirstVisitReferenceMonth(referenceMonth: string): Promise<ClientWithEmployee[]> {
        const sql = `
            SELECT DISTINCT 
            c.client_id, c.first_name, c.gender, c.last_name,
            a.employee_id, e.first_name, e.last_name, 
            a.date as first_visit_date
        FROM clients c
        INNER JOIN appointments a ON c.client_id = a.client_id
        INNER JOIN EMPLOYEES e ON a.employee_id = e.employee_id 
        INNER JOIN (
            SELECT client_id, MIN(date) as first_date
            FROM appointments 
            WHERE strftime('%Y-%m', date) = ?
            GROUP BY client_id
        ) first_visits ON a.client_id = first_visits.client_id 
            AND a.date = first_visits.first_date
        WHERE strftime('%Y-%m', a.date) = ?
        `;

        return database.query<Client & Employee & { first_visit_date: string }>(sql, [
            referenceMonth,
            referenceMonth,
        ]);
    }

    async getRetainedClientsForMonth(clientIds: number[], targetMonth: string): Promise<number[]> {
        if (clientIds.length === 0) return [];

        const placeholders = clientIds.map(() => '?').join(',');
        const sql = `
            SELECT DISTINCT client_id
            FROM appointments
            WHERE client_id IN (${placeholders})
            AND strftime('%Y-%m', date) = ?
        `;

        const results = await database.query<{ client_id: number }>(sql, [
            ...clientIds,
            targetMonth,
        ]);

        return results.map((row) => row.client_id);
    }
}
