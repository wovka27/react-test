import { FC } from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../router";
import "./form.scss";
import { FormProps } from "./types";

const FormContainer: FC<FormProps> = ({
  title,
  children,
  submit,
  formName,
}) => {
  const pathName = window.location.pathname;
  const { REG, LOGIN, RECOVERY_START: rStart } = RouteNames;

  const text = {
    textReg: "Регистрация",
    pass: "Вспомнил пароль!",
    textAuth: "Авторизация",
    restore: "Восстановить",
  };
  const { textReg, pass, restore, textAuth } = text;

  const form = {
    _: "form",
    row: "form__row",
    link: "form__link",
  };
  const { _, row, link } = form;

  const titleAttrText = {
    reg: "На страницу регистрации.",
    auth: "На страницу авторизации.",
    recovery: "На страницу восстановления.",
  };
  const { reg, auth, recovery } = titleAttrText;

  return (
    <form name={formName} onSubmit={submit} className={_}>
      <div className={form.row}>
        <h2>{title}</h2>
      </div>
      <div className={form.row}>{children}</div>
      {pathName === REG && (
        <div className={row}>
          <span>Уже есть уч. запись?</span>
          <Link title={auth} to={LOGIN} className={link}>
            {textAuth}
          </Link>
        </div>
      )}
      {pathName === rStart && (
        <div className={form.row}>
          <Link title={auth} to={LOGIN} className={link}>
            {pass}
          </Link>

          <Link title={reg} to={REG} className={link}>
            {textReg}
          </Link>
        </div>
      )}
      {pathName === LOGIN && (
        <div className={`${row} links`}>
          <p>Забыли пароль?</p>
          <Link title={recovery} to={rStart} className={link}>
            {restore}
          </Link>

          <p>Нет уч. записи?</p>

          <Link title={reg} to={REG} className={link}>
            {textReg}
          </Link>
        </div>
      )}
    </form>
  );
};

export default FormContainer;
