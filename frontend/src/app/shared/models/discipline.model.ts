export interface Discipline {
  id?: number;
  name: string;
  code: string;
  credits: number;
  workload: number;
  description?: string;
  semesterId: number;
  semester?: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
  };
}
