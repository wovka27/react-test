import React from "react";
import Content from "../pages/Content";
import Login from "../pages/Login";
import RecoveryPass from "../pages/RecoveryPass";
import Registraion from "../pages/Registration";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact: boolean;
}

export enum RouteNames {
  REG = "/registration",
  LOGIN = "/authorization",
  RECOVERY_START = "/forgot-start",
  RECOVERY_END = "/forgot-end",
  CONTENT = "/",
}

export const privateRoutes: IRoute[] = [
  { path: RouteNames.CONTENT, component: Content, exact: true },
];

export const publicRoutes: IRoute[] = [
  { path: RouteNames.REG, component: Registraion, exact: true },
  { path: RouteNames.LOGIN, component: Login, exact: true },
  { path: RouteNames.RECOVERY_START, component: RecoveryPass, exact: true },
  { path: RouteNames.RECOVERY_END, component: RecoveryPass, exact: true },
];
