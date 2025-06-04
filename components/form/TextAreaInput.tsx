import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TextAreaInputProps } from "@/types/form";

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize text-xl">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={5}
        required
        className="leading-loose text-xl font-[roboto]"
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default TextAreaInput;
