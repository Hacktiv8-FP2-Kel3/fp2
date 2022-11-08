import * as React from "react";
import { css, theme } from "../../../styles/style";
import { Link } from "react-router-dom";
import { useUserGetHeaderList } from "./data-header";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/reducers/userSlice";
import { useAuth } from "../../../api-hooks/user/use-auth";

interface Props {
  name: string;
  link: string;
  labelStyle?: React.CSSProperties;
  onClick?: () => void;
}

function ItemComponent(props: Props) {
  const { name, labelStyle, link, onClick } = props;
  return (
    <Link to={link} style={{ textDecoration: "none" }} onClick={onClick}>
      <div className={styles.navItemStyle()} style={labelStyle}>
        {name}
      </div>
    </Link>
  );
}

export function Header() {
  const { headerLists } = useUserGetHeaderList();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleClickOnLogin = React.useCallback(() => {
    navigate("/login");
  }, [navigate]);
  const handleClickOnLogout = React.useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <div className={styles.navContainer()}>
      <div className={styles.navItemContainer()}>
        <div className={styles.boldText()}>{"Bukapedia"}</div>
        {headerLists.map((item) => (
          <ItemComponent
            name={item.name}
            link={item.link}
            key={item.name}
            onClick={item.onClick}
          />
        ))}
      </div>
      <div className={styles.flexRow()}>
        {auth?.token ? (
          <div
            className={styles.navItemStyle()}
            onClick={handleClickOnLogout}
          >{`Logout`}</div>
        ) : (
          <div
            className={styles.navItemStyle()}
            onClick={handleClickOnLogin}
          >{`Login`}</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  boldText: css({
    fontWeight: "bold",
    fontSize: "$body3",
  }),
  navContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    color: "$white0",
    backgroundColor: "$primary0",
    fontSize: "$body5",
    height: 60,
    position: "sticky",
    top: 0,
    zIndex: 1100,
  }),
  navItemContainer: css({
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  }),
  navItemStyle: css({
    color: "$white1",
    cursor: "pointer",
    marginLeft: 24,
    fontSize: "$body3",
  }),
  ml10: css({
    marginLeft: 10,
  }),
  flexRow: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  }),
};

export default Header;
