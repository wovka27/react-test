import { FC, useState } from "react";
import ReactInputMask, {
  BeforeMaskedStateChangeStates,
  InputState,
} from "react-input-mask";
import { InputProps } from "./types";

const Input: FC<InputProps> = ({
  required,
  text,
  type,
  name,
  btn,
  className,
  children,
  value,
  onChange,
  mask,
  readOnly,
  checked,
  pattern
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const btnClassName = `form__input-pass-btn ${showPass && "_is-active"}`;
  const svgHref = "svg-sprite.svg#pass_btn";

  const showPassHandler = (): void =>
    !showPass ? setShowPass(true) : setShowPass(false);


  const beforeMaskedStateChange = ({
    nextState,
  }: BeforeMaskedStateChangeStates): InputState => {
    const { value } = nextState;

    return { ...nextState, value };
  };

  return (
    <label className={className}>
      <p>{text}</p>
      {mask ? (
        <ReactInputMask
          mask={"7(999)-999-9999"}
          maskPlaceholder={null}
          beforeMaskedStateChange={beforeMaskedStateChange}
          onChange={onChange}
        >
          <input type={"tel"} pattern={pattern} name={"phone"} required />
        </ReactInputMask>
      ) : (
        <input
          onChange={onChange}
          value={value}
          type={!showPass ? type : "text"}
          name={name}
          required={required}
          readOnly={readOnly}
          checked={checked}
          pattern={pattern}
        />
      )}

      {children}
      {btn && (
        <span onClick={showPassHandler} className={btnClassName}>
          <svg width="20" height="20">
            <use xlinkHref={svgHref} />
          </svg>
        </span>
      )}
    </label>
  );
};

export default Input;
