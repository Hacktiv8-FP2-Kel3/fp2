import { Item } from "../../../api-hooks/item/item.model";
import * as React from "react";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import Button from "../../elements/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../api-hooks/user/use-auth";
import { useAppDispatch } from "../../../redux/store";
import { addCarts } from "../../../redux/reducers/cartSlice";

interface Props {
  item: Item;
}

export function CardProduct(props: Props) {
  const { item } = props;
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHandleClickCart = React.useCallback(() => {
    if (!auth?.token) {
      navigate("/login");
    } else {
      dispatch(addCarts(item));
    }
  }, [auth?.token, dispatch, item, navigate]);
  const onHandleClickDetail = React.useCallback(() => {
    navigate(`/product/${item.id}`);
  }, [item.id, navigate]);
  return (
    <div className={styles.cardContainer()}>
      <img src={item.image} className={styles.imageStyle()} alt="product" />
      <div className={styles.textTitleContainer()}>
        <Text className={styles.titleStyle()}>{item.title}</Text>
      </div>
      <div className={styles.tagStyle()}>
        <Text className={styles.tagTextStyle()}>{item.category}</Text>
      </div>
      <div className={styles.descStyle()}>{item.description}</div>
      <div className={styles.priceStyle()}>{`$ ${item.price}`}</div>
      <div className={styles.buttonContainer()}>
        <Button className={styles.buttonStyle()} onClick={onHandleClickDetail}>
          {"Detail"}
        </Button>
        <Button
          className={styles.buttonStyle()}
          onClick={onHandleClickCart}
          buttonType="danger"
        >
          {"Add To Cart"}
        </Button>
      </div>
    </div>
  );
}

const styles = {
  imageStyle: css({
    width: "100%",
    height: 300,
    borderRadius: 8,
    borderWidth: "1px solid black",
  }),
  cardContainer: css({
    padding: "12px 12px 20px 12px",
    alignItems: "center",
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    borderRadius: 8,
  }),
  titleStyle: css({
    color: "$gray1",
    fontSize: "$body4",
    fontWeight: "$semiBold",
  }),
  textTitleContainer: css({
    flex: 1,
    textAlign: "justify",
    marginTop: 20,
  }),
  tagStyle: css({
    marginTop: 12,
    backgroundColor: "$gray1",
    padding: 8,
    borderRadius: 12,
  }),
  tagTextStyle: css({
    textTransform: "capitalize",
    color: "$white0",
  }),
  descStyle: css({
    marginTop: 12,
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    color: "$gray1",
    fontSize: "$body4",
    fontWeight: "$regular",
    textTransform: "capitalize",
  }),
  buttonContainer: css({
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    width: "100%",
  }),
  buttonStyle: css({
    // width: "48%",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  priceStyle: css({
    marginTop: 12,
    marginBottom: 12,
    fontSize: "$body2",
    fontWeight: "$bold",
  }),
};
