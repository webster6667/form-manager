import { MainPage, HooksFormPage } from "@pages";

export const routes = [
  {
    path: "/",
    element: MainPage
  },
  {
    path: "/hooks-form",
    element: HooksFormPage,
    execute: true
  }
];
