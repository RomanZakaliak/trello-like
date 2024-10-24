import { IColumn } from '@/common/interfaces/column.interface';

export type TNewColumn = Omit<IColumn, 'id' | 'associatedStatus'>;
