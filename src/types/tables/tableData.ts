// Table data types

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: TableRow) => React.ReactNode;
}

export interface TableFilters {
  search?: string;
  [key: string]: any;
}

export interface TableData {
  rows: TableRow[];
  columns: TableColumn[];
  total: number;
}

