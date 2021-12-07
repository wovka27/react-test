// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { FC, ReactNode, useEffect, useState } from "react";
import UserService from "../assests/api/user-service";
import { storage } from "../assests/other";
import Loader from "../components/Loader";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./content.scss";

const Content: FC = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const { logout, setUser } = useActions();
  const [contentError, setContentError] = useState<string>("");
  const token = storage.getItem('token')
  const { first_name: fName, last_name: lName } = user;

  const titleText = `Добро пожаловать, ${fName} ${lName}`;
	
  const getUserData = async () => {
    if(!token) return

    try {
      const response = await UserService.getUser(storage.getItem('token') || '');
      const result = response.data;

      setUser(result);
    } catch (error: unknown | AxiosError) {
		if(typeof error === 'string'){
			setContentError(error.toUpperCase())
		} else if(error instanceof Error) {
			setContentError(error.message)
		}
    }

  };

  const showContent = (): ReactNode => {
    contentError && <h1>{contentError}</h1>;

    return fName && lName ? (
      <>
        <h1>{titleText}</h1>
        <button className={'content__btn'} onClick={logout}>Выйти</button>
      </>
    ) : (
      <h1>
        <Loader />
      </h1>
    );
  };

  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <section className="content container">{showContent()}</section>;
};

export default Content;
