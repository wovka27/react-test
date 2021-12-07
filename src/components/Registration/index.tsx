import { FC, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "../Button";
import FormContainer from "../Form";
import Input from "../Input";

const Registration: FC = () => {
  const [regName, setRegName] = useState<string>("");
  const [regFName, setRegFName] = useState<string>("");
  const [regTel, setRegTel] = useState<string>("");
  const [regPass, setRegPass] = useState<string>("");
  const { fetchAuth } = useActions();
  const { error } = useTypedSelector((state) => state.auth);
  const patternValue = `7[\\(]\\d{3}[\\)][\\-]\\d{3}[\\-]\\d{4}`;

  const submit = async (e: SubmitEvent) => {
    e.preventDefault();

    const API_URI =
      "https://backend-front-test.dev.echo-company.ru/api/user/registration";

    const body = {
      phone: regTel.replace(/[^0-9,]/g, ""),
      first_name: regName,
      last_name: regFName,
      password: regPass,
    };
    try {
      fetchAuth(API_URI, body);
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <FormContainer
      formName={"form"}
      title={"Регистрация"}
      btnText={"Зарегистрироваться"}
      submit={submit}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Input
        className={"form__input"}
        type={"text"}
        text={"Имя"}
        value={regName}
        required
        name={"first_name"}
        onChange={(e: { target: { value: string } }) => {
          setRegName(e.target.value);
        }}
      />
      <Input
        className={"form__input"}
        type={"text"}
        text={"Фамилия"}
        value={regFName}
        name={"last_name"}
        required
        onChange={(e: { target: { value: string } }) => {
          setRegFName(e.target.value);
        }}
      />

      <Input
        className={"form__input"}
        type={"tel"}
        text={"Телефон"}
        value={regTel}
        pattern={patternValue}
        required
        mask
        name={"phone"}
        onChange={(e: { target: { value: string } }) => {
          setRegTel(e.target.value.trim());
          console.log(e.target.value);
        }}
      />
      <Input
        className={"form__input"}
        type={"password"}
        text={"Пароль"}
        name={"password"}
        value={regPass}
        btn
        required
        onChange={(e: { target: { value: string } }) => {
          setRegPass(e.target.value);
        }}
      />
      <Button>{"Зарегистрироваться"}</Button>
    </FormContainer>
  );
};

export default Registration;
