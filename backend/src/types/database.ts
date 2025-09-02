export interface Appointment {
    appointment_id: number;
    client_id: number;
    date: string;
    employee_id: number;
}

export interface Client {
    client_id: number;
    first_name: string;
    gender: string;
    last_name: string;
}

export interface Employee {
    employee_id: number;
    first_name: string;
    last_name: string;
}
