import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button";
import NotFoundComponent from "../components/elements/not-found";
import Text from "../components/elements/text";
import { css } from "../styles/style";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
        }}
      >
        <Text className={styles.title()}>{"Page not found"}</Text>
        <NotFoundComponent />
        <Text className={styles.description()}>
          {`Uh oh, we cant't seem to find the page you're looking for. Try going back to the homepage`}
        </Text>
        <Button onClick={() => navigate("/")}>{"Homepage"}</Button>
      </div>
    </div>
  );
}

const styles = {
  title: css({
    fontSize: 30,
    fontWeight: "$semiBold",
  }),
  description: css({
    fontSize: "$body2",
    fontWeight: "$regular",
    marginBottom: 40,
  }),
};
