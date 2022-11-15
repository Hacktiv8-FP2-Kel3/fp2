import { useAuth } from "../../../api-hooks/user/use-auth";

export const useUserGetHeaderList = () => {
  const { auth } = useAuth();
  const headerAdmin = [
    {
      name: "Rekap Penjualan",
      link: "/sales",
    },
  ];
  const headerUser = [
    {
      name: "Cart",
      link: "/cart",
    },
  ];
  const headerLists: {
    name: string;
    link: string;
    onClick?: () => void;
  }[] = [
    {
      name: "Home",
      link: "/",
    },
    ...(auth?.token ? (auth?.isAdmin ? headerAdmin : headerUser) : []),
  ];
  return { headerLists };
};
