import classNames from "classnames";
import * as React from "react";
import Loader from "react-spinners/PulseLoader";
import { css, styled } from "../../styles/style";
import Text from "./text";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export type ButtonType = "primary" | "secondary" | "danger";

export interface ButtonProps extends IButtonProps {
  children: React.ReactNode;
  buttonType?: ButtonType;
  className?: any;
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    buttonType = "primary",
    isLoading = false,
    children,
    disabled,
    ...restProps
  } = props;

  return (
    <ButtonContainer
      type="button"
      {...restProps}
      buttonType={buttonType}
      disabled={isLoading || disabled}
      className={classNames(
        props.disabled || isLoading ? styles.disabledButton().toString() : "",
        props.className
      )}
    >
      {isLoading ? (
        <Loader
          size={8}
          color={
            buttonType === "primary"
              ? "#03174C"
              : buttonType === "secondary"
              ? "#03174C"
              : "#FB4E4E"
          }
        />
      ) : (
        <ButtonText buttonType={buttonType}>{children}</ButtonText>
      )}
    </ButtonContainer>
  );
}

const ButtonText = styled(Text, {
  display: "flex",
  fontWeight: "$bold",
  fontSize: "$body4",
  variants: {
    buttonType: {
      primary: {
        color: "$white0",
      },
      secondary: {
        color: "$gray1",
      },
      danger: {
        color: "$buttonWarning",
      },
    },
  },
});

const ButtonContainer = styled("button", {
  width: "fit-content",
  borderRadius: 4,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "&:disabled": {
    cursor: "not-allowed",
    boxShadow: "none !important",
  },
  border: "none",
  variants: {
    buttonType: {
      primary: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "$buttonPrimary",
        "&:hover": {
          boxShadow: "2px 2px 8px #FFB41E50",
        },
      },
      secondary: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "$buttonSecondary",
        "&:hover": {
          boxShadow: "2px 2px 8px #FFB41E50",
        },
      },
      danger: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 16,
        paddingRight: 16,
        border: "1px solid $buttonWarning",
        backgroundColor: "transparent",
        "&:hover": {
          boxShadow: "2px 2px 8px #FFB41E50",
        },
      },
    },
  },
});

const styles = {
  disabledButton: css({
    opacity: 0.5,
    cursor: "initial",
  }),
};
