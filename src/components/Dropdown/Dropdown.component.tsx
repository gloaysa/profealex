import { forwardRef, FunctionComponent, RefAttributes } from "react";
import {
  DropdownProps as PrimeDropdownProps,
  Dropdown as PrimeDropdown,
} from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";

interface DropdownProps extends PrimeDropdownProps {}

export const Dropdown: FunctionComponent<
  DropdownProps & RefAttributes<PrimeDropdown>
> = forwardRef<PrimeDropdown, DropdownProps>((props, ref) => {
  return (
    <div className={`p-field ${props.className}`}>
      <FloatLabel>
        <PrimeDropdown
          emptyMessage="No se han encontrado resultados"
          emptyFilterMessage="No se han encontrado resultados"
          {...props}
          ref={ref}
          className={`w-full ${props.className}`}
        />
        <label htmlFor={props.name}>
          {props.placeholder && <span>{props.placeholder}</span>}
        </label>
      </FloatLabel>
    </div>
  );
});
