import { FunctionComponent, useState } from "react";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface IProps extends ButtonProps {
  accept: () => void;
  reject?: () => void;
}

export const ConfirmButton: FunctionComponent<IProps> = ({
  accept,
  reject,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button {...props} onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        onHide={() => {
          setVisible(false);
          reject && reject();
        }}
        header={props.label}
      >
        <div className="p-4">
          <p>
            ¿Está seguro de que desea continuar? Esta acción no se puede
            deshacer.
          </p>
        </div>
        <div className="flex w-full gap-4 justify-content-between align-items-center">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              setVisible(false);
              reject && reject();
            }}
          />
          <Button
            label="Continuar"
            severity="danger"
            onClick={() => {
              accept();
              setVisible(false);
            }}
          />
        </div>
      </Dialog>
    </>
  );
};
