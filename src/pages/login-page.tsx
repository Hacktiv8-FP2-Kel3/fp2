import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EyeOpenIcon, EyeNoneIcon } from "@modulz/radix-icons";
import { css, styled } from "../styles/style";
import Text from "../components/elements/text";
import TextInput from "../components/elements/text-input";
import Button from "../components/elements/button";
import { ListReducers, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { loginAPI } from "../redux/reducers/userSlice";
import { useAuth } from "../api-hooks/user/use-auth";

export const LOGIN_PAGE_ROUTE = "/login";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const userState = useSelector((state: ListReducers) => state.user);
  const [isShowPassword, setShowPassword] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handlePasswordToggle = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = React.useCallback(async () => {
    try {
      await signIn(username, password);
      navigate("/");
    } catch (rejectedValueOrSerializedError) {}
  }, [navigate, password, signIn, username]);

  return (
    <Container>
      <Content>
        <Text className={styles.title()}>Login</Text>
        <Text className={styles.desc()}>Bukapedia</Text>
        <FormContainer>
          <TextInput
            label="Email"
            value={username}
            onChange={(val) => setUsername(val)}
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
              disabled={!username || !password}
              className={styles.button()}
              onClick={handleSubmit}
              isLoading={userState.isLoginPending}
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
