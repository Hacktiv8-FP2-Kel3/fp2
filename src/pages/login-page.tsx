import * as React from "react";
import { useNavigate } from "react-router-dom";
import { css } from "../styles/style";

export const LOGIN_PAGE_ROUTE = "/login";

export default function LoginPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
}

const styles = {
  test: css({}),
};
