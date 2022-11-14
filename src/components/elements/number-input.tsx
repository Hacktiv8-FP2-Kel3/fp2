import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { css } from "../../styles/style";

interface Props {
  max?: number;
  setNumber: React.Dispatch<SetStateAction<number>>;
  number: number;
  min?: number;
}

export default function NumberInput(props: Props) {
  const { setNumber, max, number, min = 0 } = props;
  return (
    <input
      type="number"
      min={min}
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
