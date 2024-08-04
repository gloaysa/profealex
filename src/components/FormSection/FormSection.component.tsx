import { FunctionComponent, ReactNode, useState } from "react";
import { Fieldset } from "primereact/fieldset";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export const FormSection: FunctionComponent<FormSectionProps> = ({
  title,
  children,
}) => {
  const [collapsed, setCollapse] = useState(true);
  return (
    <Fieldset
      legend={<span className="uppercase">{title}</span>}
      toggleable
      collapsed={collapsed}
      onChange={() => setCollapse(!collapsed)}
    >
      <div className="flex flex-column gap-4 mt-2">{children}</div>
    </Fieldset>
  );
};
