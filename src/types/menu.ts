export interface MenuItem {
  id: number;
  name: string;
  link: string;
  is_active: number;
  type: string;
  icon: string | null;
  description?: string;
  children: MenuItem[];
  parent_id?: number;
  sort?: number;
}

export interface MenuResponse {
  status: boolean;
  message: string;
  data: MenuItem[];
}
