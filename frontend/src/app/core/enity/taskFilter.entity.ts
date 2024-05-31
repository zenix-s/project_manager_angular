
export interface taskFilter {
  search: string | null;
  category: number[];
  priority: string | null;
  status: boolean;
  subtaskFilter: boolean;
}
