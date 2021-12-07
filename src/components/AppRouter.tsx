import { FC, ReactNode, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { storage } from "../assests/other";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IRoute, privateRoutes, publicRoutes, RouteNames } from "../router";

const AppRouter: FC = () => {
  const { isAuth, isLoading } = useTypedSelector((state) => state.auth);
  const { CONTENT, LOGIN } = RouteNames;
  const { setIsAuth } = useActions();

  const auth = storage.getItem("auth") === "true";

  const routeNode = (routes: IRoute[], routeName: string): ReactNode => {
    return (
      <Switch>
        {routes.map((route) => (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          />
        ))}
        {<Redirect to={routeName} />}
      </Switch>
    );
  };

  useEffect(() => {
    auth && setIsAuth(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {isAuth && !isLoading
        ? routeNode(privateRoutes, CONTENT)
        : routeNode(publicRoutes, LOGIN)}
    </div>
  );
};

export default AppRouter;
