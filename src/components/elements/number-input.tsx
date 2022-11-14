import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { css } from "../../styles/style";

interface Props {
  max?: number;
  setNumber: React.Dispatch<SetStateAction<number>>;
  number: number;
}

export default function NumberInput(props: Props) {
  const { setNumber, max, number } = props;
  return (
    <input
      type="number"
      min={0}
      max={max}
      value={number}
      onChange={(e) => {
        setNumber(parseInt(e.target.value));
      }}
      onClick={() => {
        if (number === max) {
          toast.error("Stok tidak mencukupi");
        }
      }}
    />
  );
}

const style = {
  inputStyle: css({
    borderRadius: 8,
  }),
};
