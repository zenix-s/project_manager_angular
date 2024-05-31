export type ToasterType = 'success' | 'error' | 'warning' | 'info';
export interface Toaster {
  id: number;
  action: string;
  message: string;
  type: ToasterType;
}
