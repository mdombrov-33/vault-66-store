import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TextAreaInputProps } from "@/types/form";

function TextAreaInput({ name, labelText }: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize text-3xl">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={5}
        required
        className="leading-loose text-2xl font-[roboto]"
      />
    </div>
  );
}

export default TextAreaInput;
