export interface Input {
  title: string;
  description: string;
}

export interface CheckBoxItems {
  label: string;
  value: boolean;
}

export interface CheckBoxList {
  checkbox: [CheckBoxItems];
}

export interface Radial {
  name: string;
  rating: number;
}
