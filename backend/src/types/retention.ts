import { Employee } from './database';

export interface RetentionData {
    employee: Employee;
    referenceMonthClients: number;
    retentionMonths: RetentionMonth[];
}

export interface RetentionMonth {
    monthOffset: number; // like +1, +2, +3
    percentage: number;
    retainedClients: number;
}

export interface RetentionRequest {
    monthsToTrack?: number;
    referenceMonth: string;
}

export interface RetentionResponse {
    data: RetentionData[];
    referenceMonth: string;
    totalClientsInReference: number;
}
