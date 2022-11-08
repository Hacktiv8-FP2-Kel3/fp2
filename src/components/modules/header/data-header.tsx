import { useSelector } from "react-redux";
import { ListReducers, useAppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/reducers/userSlice";

export const useUserGetHeaderList = () => {
  const dispatch = useAppDispatch();
  const headerLists: {
    name: string;
    link: string;
    onClick?: () => void;
  }[] = [
    {
      name: "Home",
      link: "/",
    },
    ...(localStorage.getItem("token")
      ? [
          {
            name: "Cart",
            link: "/cart",
          },
        ]
      : []),
  ];
  return { headerLists };
};
