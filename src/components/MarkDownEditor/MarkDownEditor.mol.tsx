import { FunctionComponent, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import "./MarkDownEditor.css";
import { FloatLabel } from "primereact/floatlabel";

interface IMarkDownEditorProps {
  label?: string;
  name?: string;
  value: string | undefined;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onScroll?: (
    e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>,
    type: "md" | "html",
  ) => void;
}

export const MarkDownEditor: FunctionComponent<IMarkDownEditorProps> = ({
  value,
  label,
  name,
  ...props
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(!label);

  return (
    <FloatLabel
      pt={{
        root: {
          className: `md-editor ${value ? "has-value" : ""}`,
        },
      }}
    >
      <MdEditor
        className="h-full"
        shortcuts
        allowPasteImage={false}
        value={value}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        view={{ menu: true, md: true, html: false }}
        onFocus={() => setShowPlaceholder(true)}
        onBlur={() => setShowPlaceholder(!label)}
        canView={{
          menu: true,
          md: true,
          html: false,
          both: false,
          fullScreen: false,
          hideMenu: false,
        }}
        {...props}
        placeholder={showPlaceholder ? props.placeholder : ""}
      />
      <label htmlFor={name}>{label && <span>{label}</span>}</label>
    </FloatLabel>
  );
};
