import { IColumn } from '@/interfaces/column.interface';

export interface IColumnsState {
  data: Array<IColumn>;
  error: string | null;
}
