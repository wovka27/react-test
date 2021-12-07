import axios, { AxiosError} from "axios";
import { AppDispatch } from "../..";
import { sleep, storage } from "../../../assests/other";
import { IUser } from "../../../models/IUser";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  fetchAuth: (url: string, data: {}) => async (dispatch: AppDispatch) => {
    const { setError, setIsAuth, setIsLoading, setUser} =
      AuthActionCreators;
    const { setItem } = storage;

    try {
      dispatch(setIsLoading(true));
      const response = await axios.post<IUser>(url, data);

      if (response.status === 200) {
        const result = response.data;
        await sleep(500);
        setItem("token", result.token || "");
        setItem("auth", "true");

        dispatch(setUser(result));
      }
      dispatch(setIsLoading(false));
      dispatch(setIsAuth(true));
    } catch (error: unknown | AxiosError) {
      await sleep(1000);
      if (axios.isAxiosError(error)) {
        console.log(error);
        dispatch(setError(error.response?.data.message));
      } else {
        console.log(error);
      }
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
    storage.setItem("auth", "false");
    storage.setItem("token", "");
  },
};
