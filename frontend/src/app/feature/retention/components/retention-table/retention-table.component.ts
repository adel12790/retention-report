import { Component, Input, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { RetentionResponse } from '../../models/retention';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface TableRow {
  employeeId: number;
  employeeName: string;
  referenceMonthClients: number;
  [key: string]: any;
}

@Component({
  selector: 'app-retention-table',
  standalone: false,
  templateUrl: './retention-table.html',
  styleUrl: './retention-table.scss',
})
export class RetentionTableComponent implements OnChanges {
  @Input() retentionData: RetentionResponse | null = null;
  @ViewChild(MatSort) sort!: MatSort;


  public dataSource = new MatTableDataSource<TableRow>();
  public displayedColumns: string[] = [];
  public retentionColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['retentionData'] && this.retentionData) {
      this.setupTable();
    }
  }

  private setupTable(): void {
    if (!this.retentionData) return;

    // Setup columns
    this.setupColumns();

    // Transform data for table
    const tableData = this.transformData();
    this.dataSource.data = tableData;

    // Setup table features
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  private setupColumns(): void {
    const baseColumns = ['employeeName', 'referenceMonthClients'];
    this.retentionColumns = [];

    if (this.retentionData?.data.length) {
      const firstEmployee = this.retentionData.data[0];
      this.retentionColumns = firstEmployee.retentionMonths.map(
        month => `month${month.monthOffset}`
      );
    }

    this.displayedColumns = [...baseColumns, ...this.retentionColumns];
  }

  private transformData(): TableRow[] {
    if (!this.retentionData) return [];

    return this.retentionData.data.map(item => {
      const row: TableRow = {
        employeeId: item.employee.employee_id,
        employeeName: `${item.employee.first_name} ${item.employee.last_name}`,
        referenceMonthClients: item.referenceMonthClients
      };

      // Add retention data for each month
      item.retentionMonths.forEach(month => {
        row[`month${month.monthOffset}`] = month;
      });

      return row;
    });
  }

  getRetentionDisplay(month: any): string {
    return `${month.retainedClients} (${month.percentage.toFixed(1)}%)`;
  }

  getColumnHeader(column: string): string {
    if (column === 'employeeName') return 'Employee';
    if (column === 'referenceMonthClients') return 'Reference Clients';
    if (column.startsWith('month')) {
      const monthNum = column.replace('month', '');
      return `Month +${monthNum}`;
    }
    return column;
  }
}
