import { Motion, spring } from "react-motion";
import { css, styled, theme } from "../../styles/style";
import Text from "./text";
import * as React from "react";
import classNames from "classnames";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rightIconComponent?: (size: number) => React.ReactNode;
  rightIconPress?: () => void;
}

export const ICON_SIZE = 16;

export default function TextInput(props: Props) {
  const { label, value, onChange, rightIconComponent, rightIconPress } = props;
  const [isFocusing, setFocusing] = React.useState<boolean>(false);

  const onBlur = React.useCallback(() => {
    setFocusing(false);
  }, []);

  const onFocus = React.useCallback(() => {
    setFocusing(true);
  }, []);
  return (
    <Container>
      <Motion
        defaultStyle={{
          x: 12,
          y: 120,
          fontSize: 14,
          opacity: 0.5,
        }}
        style={{
          x: isFocusing || !!value ? spring(-16) : spring(12),
          y: isFocusing || !!value ? spring(0) : spring(12),
          fontSize: isFocusing || !!value ? spring(14) : spring(16),
          opacity: isFocusing || !!value ? spring(1) : spring(0.5),
        }}
      >
        {(motion: any) => (
          <>
            <Text
              className={styles.label()}
              style={{
                top: motion?.x,
                left: motion?.y,
                fontSize: motion?.fontSize,
                opacity: motion?.opacity,
              }}
            >
              {label}
            </Text>
          </>
        )}
      </Motion>
      <input
        {...props}
        className={classNames(
          styles.input(),
          !!rightIconComponent && styles.rightIconPadding()
        )}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        style={{
          borderColor: isFocusing ? "#2F80ED" : "#333333",
        }}
      />
      {!!rightIconComponent && (
        <RightIconContainer onClick={rightIconPress}>
          {rightIconComponent(ICON_SIZE)}
        </RightIconContainer>
      )}
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  position: "relative",
  marginTop: 28,
  width: "100%",
});

const RightIconContainer = styled("div", {
  position: "absolute",
  right: 8,
  top: 12,
  cursor: "pointer",
  zIndex: 1,
});

const styles = {
  input: css({
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    borderWidth: 1,
    width: "100%",
    zIndex: 1,
    backgroundColor: "transparent",
  }),
  label: css({
    position: "absolute",
    left: 12,
    top: 12,
    zIndex: 0,
  }),
  rightIconPadding: css({
    paddingRight: 32,
  }),
};
