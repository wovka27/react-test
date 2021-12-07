import React, { FC, useState } from "react";
import { saveInputValueHandler, storage } from "../../assests/other";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "../Button";
import FormContainer from "../Form";
import Input from "../Input";

const Authorization: FC = () => {
  const { fetchAuth } = useActions();
  const { error, isLoading, flag } = useTypedSelector(
    (state) => state.auth
  );
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const patternValue = `7[\\(]\\d{3}[\\)][\\-]\\d{3}[\\-]\\d{4}`;
  const { setItem } = storage;

  const API_URI =
    "https://backend-front-test.dev.echo-company.ru/api/auth/login";

  const submit = () => {
    const data = {
      phone: phoneValue.replace(/[^0-9,]/g, ""),
      password: passwordValue,
    };
    fetchAuth(API_URI, data);
    setItem("authValue", JSON.stringify(data));
  };

  return (
    <FormContainer submit={submit} title={"Авторизация"} btnText={"Войти"}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Input
        className={"form__input"}
        type={"tel"}
        mask
        pattern={patternValue}
        text={"Телефон"}
        value={phoneValue}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
          setPhoneValue(e.target.value);
          saveInputValueHandler(e.target.value);
        }}
        required
        name={"tel"}
      />

      <Input
        className={"form__input"}
        type={"password"}
        text={"Пароль"}
        name={"password"}
        value={passwordValue}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
          setPasswordValue(e.target.value);
          saveInputValueHandler(e.target.value);
        }}
        btn
        required
      />

      <Input
        className={"checkbox"}
        name={"check"}
        type={"checkbox"}
        text={"Запомнить меня"}
      >
        <span id="fake_checkbox"></span>
      </Input>
      <Button disabled={!flag && true}>
        {isLoading ? "Обработка..." : "Войти"}
      </Button>
    </FormContainer>
  );
};

export default Authorization;
