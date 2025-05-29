export type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export type FormInputNumberProps = {
  defaultValue?: number;
};

export type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

export type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};
