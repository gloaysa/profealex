import { FunctionComponent } from "react";

interface SafeHtmlProps extends React.HTMLAttributes<HTMLSpanElement> {
  html: string | undefined;
}

export const SafeHtml: FunctionComponent<SafeHtmlProps> = ({
  html,
  ...props
}) => {
  if (!html) {
    return null;
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} {...props} />;
};
