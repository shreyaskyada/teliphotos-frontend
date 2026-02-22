import { InputProps } from "@telephotos/ui";
import { FieldValues, Path } from "react-hook-form";

export interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "name"> {
  /**
   * The field name in your form.
   * It must be a valid path in the form's schema.
   */
  name: Path<T>;

  /** A label to display above the input. */
  label?: string;

  helperText?: string;
}
