import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EyeOpenIcon, EyeNoneIcon } from "@modulz/radix-icons";
import { css, styled } from "../styles/style";
import Text from "../components/elements/text";
import TextInput from "../components/elements/text-input";
import Button from "../components/elements/button";

export const LOGIN_PAGE_ROUTE = "/login";

export default function LoginPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isShowPassword, setShowPassword] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handlePasswordToggle = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <Container>
      <Content>
        <Text className={styles.title()}>Login</Text>
        <Text className={styles.desc()}>Aibo Commerce</Text>
        <FormContainer>
          <TextInput
            label="Email"
            value={email}
            onChange={(val) => setEmail(val)}
          />
          <TextInput
            label="Password"
            value={password}
            onChange={(val) => setPassword(val)}
            type={isShowPassword ? "text" : "password"}
            rightIconComponent={(size: number) => {
              return isShowPassword ? (
                <EyeOpenIcon width={size} height={size} />
              ) : (
                <EyeNoneIcon width={size} height={size} />
              );
            }}
            rightIconPress={handlePasswordToggle}
          />
          <ButtonContainer>
            <Button
              className={styles.button()}
              // onClick={handleLogin}
              // isLoading={isLoginLoading}
            >
              Login
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Content>
    </Container>
  );
}

const Container = styled("div", {
  backgroundImage: "url(/assets/images/background.jpg)",
  backgroundSize: "cover",
  position: "absolute",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Content = styled("div", {
  backgroundColor: "$white0",
  padding: 40,
  borderRadius: 8,
  minWidth: 500,
  display: "flex",
  flexDirection: "column",
});

const FormContainer = styled("div", {});

const ButtonContainer = styled("div", {
  marginTop: 20,
  display: "flex",
  justifyContent: "space-between",
});

const styles = {
  title: css({
    fontSize: 28,
    fontWeight: "$bold",
  }),
  desc: css({
    marginTop: 8,
    fontSize: 16,
  }),
  button: css({
    minWidth: 100,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
  }),
};
