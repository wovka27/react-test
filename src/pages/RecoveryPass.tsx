import { FC, useState } from "react";
import axios, { AxiosError } from "axios";
import { sleep } from "../assests/other";
import { storage } from "../assests/other";
import Button from "../components/Button";
import FormContainer from "../components/Form";
import Input from "../components/Input";

const RecoveryPass: FC = () => {
  const [readOnly, setreadOnly] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [passValue, setPassValue] = useState<string>("");
  const [telValue, setTelValue] = useState<string>("");
  const [smsValue, setSMSValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const { getItem, setItem } = storage;

  const patternValue = `7[\\(]\\d{3}[\\)][\\-]\\d{3}[\\-]\\d{4}`;

  

  const submitForgot = async (e: Event) => {
    e.preventDefault();
    const messageText = "Код подтверждения отправлен";
    const elementReplace = (el:string)=>el.replace(/[^0-9,]/g, "")
    const uriCondition = () => {
      return (
        (!message && "forgot-start") ||
        (message && message.match(messageText) && "forgot-end") ||
        "forgot-start"
      );
    };
    const phoneForgot = getItem("phone_forgot");

    const api = `https://backend-front-test.dev.echo-company.ru/api/user/${uriCondition()}`;

    setItem("phone_forgot", elementReplace(telValue));
    const data =
      (!message && { phone: elementReplace(telValue) }) ||
      (message &&
        message.match(messageText) && {
          phone: phoneForgot,
          code: smsValue,
          password: passValue,
        });
    setLoad(true);

    try {
      const response = await axios.post(api, data);

      await sleep(1000);
      setMessage(response.data.message || "");
      setSuccess(true);
      setLoad(false);

      setPassValue("");
      setSMSValue("");
      uriCondition() ? setreadOnly(true) : setreadOnly(false);
    } catch (error: unknown | AxiosError) {
      if(axios.isAxiosError(error)){
			setSuccess(false)
			setMessage(error.response?.data.message)
			setLoad(false);
		} else {
			console.log(error); 
		}
    }
  };

  return (
    <FormContainer
      title={"Восстановление пароля"}
      btnText={"Отправить"}
      submit={submitForgot}
    >
      <>
        {message && (
          <i style={{ color: `${success ? "green" : "red"}` }}>{message}</i>
        )}
        {readOnly ? (
          <Input
            className={"form__input"}
            type={"tel"}
            text={"Телефон"}
            name={"phone"}
            value={getItem("phone_forgot") || telValue}
            readOnly={readOnly ? true : false}
            onChange={(e: { target: { value: string } }) =>
              setTelValue(e.target.value)
            }
            required
          />
        ) : (
          <Input
            className={"form__input"}
            type={"tel"}
            text={"Телефон"}
            mask
            pattern={patternValue}
            name={"phone"}
            value={telValue}
            onChange={(e: { target: { value: string } }) => {
              setTelValue(e.target.value);
              
              
            }}
            required
          />
        )}
        {success && (
          <>
            <Input
              className={"form__input"}
              type={"text"}
              text={"Код из СМС"}
              pattern={'\\d{4}'}
              name={"code"}
              value={smsValue}
              onChange={(e: { target: { value: string } }) =>
                setSMSValue(e.target.value)
              }
              required
            />
            <Input
              className={"form__input"}
              type={"password"}
              text={"Пароль"}
              name={"password"}
              value={passValue}
              onChange={(e: { target: { value: string } }) =>
                setPassValue(e.target.value)
              }
              btn
              required
            />
            <div className="form__row form__row-countdown">
              <label>
                <Input type={"hidden"} />
                <span>Отправить повторно</span>
                <span> 20s</span>
              </label>
            </div>
          </>
        )}
      </>
      <Button disabled={load && true}>
        {load ? "Обработка" : "Отправить"}
      </Button>
    </FormContainer>
  );
};

export default RecoveryPass;
