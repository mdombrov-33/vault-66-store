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

export type ButtonSize = "default" | "lg" | "sm";

export type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: ButtonSize;
  disabled?: boolean;
};

export type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

export type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
