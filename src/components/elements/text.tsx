import * as React from "react";
interface Props {
  children?: any;
  className?: any;
  style?: React.CSSProperties;
}

const Text = React.forwardRef((props: Props, forwardedRef) => {
  return (
    <span {...(props as any)} ref={forwardedRef} sty />
  ) as unknown as any;
});

export default Text;
