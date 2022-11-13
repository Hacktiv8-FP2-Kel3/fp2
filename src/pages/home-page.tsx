import * as React from "react";
import { useAuth } from "../api-hooks/user/use-auth";
import Header from "../components/modules/header/header";
import HomeAdminContent from "../components/modules/home-admin/home-admin-content";
import HomeUserContent from "../components/modules/home-user/home-user-content";
import { styled } from "../styles/style";

export const HOME_PAGE_ROUTE = "/";

export function HomePage() {
  const { auth } = useAuth();
  return (
    <>
      <Header />
      <Content>
        {auth?.isAdmin ? <HomeAdminContent /> : <HomeUserContent />}
      </Content>
    </>
  );
}

const Content = styled("div", {
  padding: 20,
  display: "flex",
});
