export interface CateoryItemFieldProps {
  id: number;
  name: any;
  type?: string;
  value?: any;
  isTitle?: boolean
}

export interface ItemDataProps {
  id: number;
  name?: string;
  type?: string;
  value?: any;
}

export interface ItemProps {
  id: number;
  title: string;
  data?: ItemDataProps[];
}

export interface CategoryItemProps {
  id: number;
  title: string;
  fields: CateoryItemFieldProps[];
  items: ItemProps[];
}

export interface CategoryProps {
  id: number;
  title: string;
  fields: CateoryItemFieldProps[];
  items: ItemProps[];
}

