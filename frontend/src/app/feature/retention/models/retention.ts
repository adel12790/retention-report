export interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
}

export interface RetentionMonth {
  monthOffset: number;
  percentage: number;
  retainedClients: number;
}

export interface RetentionData {
  employee: Employee;
  referenceMonthClients: number;
  retentionMonths: RetentionMonth[];
}

export interface RetentionResponse {
  data: RetentionData[];
  referenceMonth: string;
  totalClientsInReference: number;
}

export interface RetentionRequest {
  referenceMonth: string;
  monthsToTrack?: number;
}
