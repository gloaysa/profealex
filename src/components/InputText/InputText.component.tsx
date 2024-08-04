import {
  InputText as PrimeInputText,
  InputTextProps as PrimeInputTextProps,
} from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { FunctionComponent } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface InputTextProps extends PrimeInputTextProps {
  icon?: string;
  label?: string;
  iconPosition?: "right" | "left";
  iconClassName?: string;
  iconOnClick?: () => void;
}

/**
 * InputFieldMol component
 * @component

 *
 * This component is a custom input field that extends the functionality of the PrimeReact InputText component.
 * It allows for additional customization such as adding an icon to the input field and handling form validation errors.
 *
 * @param icon - An optional property that represents the icon for the input field.
 * @param iconPosition - An optional property that represents the position of the icon in the input field.
 * @param iconClassName - An optional property that represents the class name for the icon.
 * @param iconOnClick - An optional property that represents the class name for the icon.
 * @param props - An optional property that represents a function to be executed when the icon is clicked.
 *
 */
export const InputText: FunctionComponent<InputTextProps> = ({
  icon,
  iconPosition,
  iconOnClick,
  ...props
}) => {
  const handleClick = iconOnClick ? () => iconOnClick() : undefined;
  return (
    <div className={`p-field ${props.className}`}>
      <FloatLabel>
        <IconField iconPosition={iconPosition}>
          {icon && <InputIcon className={icon} onClick={handleClick} />}
          <PrimeInputText
            {...props}
            className="w-full"
            placeholder={props.placeholder}
            autoCapitalize="off"
          />
        </IconField>
        <label htmlFor={props.name}>
          {props.label && <span>{props.label}</span>}
        </label>
      </FloatLabel>
    </div>
  );
};
