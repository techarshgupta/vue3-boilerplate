export interface Test {
  id: number;
  description: string;
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'FAILURE';
}
