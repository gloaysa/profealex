import {
  MultiSelect as PrimeMultiSelect,
  MultiSelectProps as PrimeMultiSelectProps,
} from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import { FunctionComponent } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import "./MultiSelect.css";

interface InputMultiSelectProps extends PrimeMultiSelectProps {
  icon?: string;
  label?: string;
  iconPosition?: "right" | "left";
  iconClassName?: string;
  iconOnClick?: () => void;
}

export const InputMultiSelect: FunctionComponent<InputMultiSelectProps> = ({
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
          <PrimeMultiSelect
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
