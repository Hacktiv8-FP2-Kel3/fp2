import { Item } from "../../../api-hooks/item/item.model";
import { useAuth } from "../../../api-hooks/user/use-auth";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../elements/button";
import Text from "../../elements/text";
import { css } from "../../../styles/style";
import { AiFillStar } from "react-icons/ai";
import NumberInput from "../../elements/number-input";
import { useSelector } from "react-redux";
import { ListReducers, useAppDispatch } from "../../../redux/store";
import { adjQtyCarts } from "../../../redux/reducers/cartSlice";
import { toast } from "react-toastify";

interface Props {
  item: Item;
}

export default function ProductDetail(props: Props) {
  const { item } = props;
  const { auth } = useAuth();

  const dispatch = useAppDispatch();
  const [number, setNumber] = React.useState<number>(0);
  const navigate = useNavigate();
  const onHandleClickCart = React.useCallback(() => {
    if (!auth?.token) {
      navigate("/login");
    } else {
      dispatch(
        adjQtyCarts({
          ...item,
          quantity: number,
        })
      );
      setNumber(0);
      toast.success("Add to cart successfull");
    }
  }, [auth?.token, dispatch, item, navigate, number]);

  const { carts } = useSelector((state: ListReducers) => state.cart);
  const findUsernameIndex = carts.findIndex(
    (item) => item.username === auth?.username
  );
  const data = carts[findUsernameIndex].carts.find(
    (cart) => cart.id === item.id
  );

  let stock = item.stock;
  if (data) {
    stock -= data.quantity;
  }

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
      <div className={styles.ratingContainer()}>
        <AiFillStar className={styles.starStyle()} size={24} />
        <div
          className={styles.priceStyle()}
        >{`${item.rating.rate} (${item.rating.count})`}</div>
        <div
          className={styles.priceStyle()}
          style={{ marginLeft: 20 }}
        >{`Stok : ${item.stock}`}</div>
      </div>

      <div className={styles.buttonContainer()}>
        <NumberInput max={stock} number={number} setNumber={setNumber} />
        <div style={{ marginRight: 8 }} />
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
    height: 350,
    width: "20%",
    borderRadius: 8,
    borderWidth: "1px solid black",
  }),
  cardContainer: css({
    marginTop: 12,
    padding: "12px 12px 20px 12px",
    alignItems: "center",
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
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
    color: "$gray1",
    fontSize: "$body4",
    fontWeight: "$regular",
    textTransform: "capitalize",
    textAlign: "center",
    lineHeight: 1.5,
  }),
  buttonContainer: css({
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
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
  ratingContainer: css({
    flexDirection: "row",
    display: "flex",
  }),
  starStyle: css({
    alignSelf: "center",
    marginRight: 8,
    color: "#FFC303",
  }),
};
