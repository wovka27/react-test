import { FC } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RouteNames } from "../../router";

const Header: FC = () => {
  const brand = `ECHO-TEST`;
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { CONTENT, REG } = RouteNames;
  return (
    <header className="header">
      <h1>
        <span>{"<"}</span>
        <Link to={isAuth ? CONTENT : REG} />
        {brand}
        <span>{">"}</span>
      </h1>
    </header>
  );
};

export default Header;
