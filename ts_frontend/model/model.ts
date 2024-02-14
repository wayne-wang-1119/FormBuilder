export interface Input {
  title: string;
  description: string;
}

export interface CheckBoxItem {
  label: string;
  value: boolean;
}

export interface Radial {
  name: string;
  rating: number;
}

export interface FormState {
  input: Input[];
  checkbox: CheckBoxItem[];
  radial: Radial[];
}
