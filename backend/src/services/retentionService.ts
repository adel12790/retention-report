import { ClientWithEmployee, RetentionRepository } from '../repositories/retentionRepository';
import { RetentionData, RetentionMonth, RetentionResponse } from '../types/retention';
import { addMonths, formatYearMonth } from '../utils/dateHelper';

export class RetentionService {
    private retentionRepository: RetentionRepository;

    constructor(retentionRepository: RetentionRepository) {
        this.retentionRepository = retentionRepository;
    }

    async calculateRetentionReport(
        referenceMonth: string,
        monthsToTrack: number
    ): Promise<RetentionResponse> {
        const clients = await this.retentionRepository.getClientsInFirstVisitReferenceMonth(referenceMonth);

        const groupClientsByEmployee = new Map<number, ClientWithEmployee[]>();

        for (const client of clients) {
            if (!groupClientsByEmployee.has(client.employee_id)) {
                groupClientsByEmployee.set(client.employee_id, []);
            }
            groupClientsByEmployee.get(client.employee_id)?.push(client);
        }

        const retentionData: RetentionData[] = [];

        // get clients retained in the following months
        for (const [employeeId, clients] of groupClientsByEmployee) {
            if (!employeeId) continue;

            const retentionMonths: RetentionMonth[] = [];
            const clientIds = clients.map((client) => client.client_id);

            // fetch retention data for the tracked months
            for (let i = 1; i <= monthsToTrack; i++) {
                const targetMonth = formatYearMonth(addMonths(new Date(referenceMonth + '-01'), i));
                const retainedClients = await this.retentionRepository.getRetainedClientsForMonth(
                    clientIds,
                    targetMonth
                );

                retentionMonths.push({
                    monthOffset: i,
                    percentage: Math.round((retainedClients.length / clientIds.length) * 100),
                    retainedClients: retainedClients.length,
                });
            }

            retentionData.push({
                employee: {
                    employee_id: employeeId,
                    first_name: clients[0].first_name,
                    last_name: clients[0].last_name,
                },
                referenceMonthClients: clientIds.length,
                retentionMonths: retentionMonths,
            });
        }

        return {
            data: retentionData,
            referenceMonth: referenceMonth,
            totalClientsInReference: clients.length,
        };
    }
}
