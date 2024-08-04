import { FunctionComponent } from "react";
import { DropdownProps, Dropdown as PrimeDropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";

export const Dropdown: FunctionComponent<DropdownProps> = (props) => {
  return (
    <div className={`p-field ${props.className}`}>
      <FloatLabel>
        <PrimeDropdown {...props} className={`w-full ${props.className}`} />
        <label htmlFor={props.name}>
          {props.placeholder && <span>{props.placeholder}</span>}
        </label>
      </FloatLabel>
    </div>
  );
};
