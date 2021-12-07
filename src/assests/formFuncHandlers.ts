
export const showPassword = (): void => {
  const btn = document.querySelector<HTMLSpanElement>("#btn");
  const input = document.querySelector<HTMLInputElement>(
    'input[name="password"]'
  );

  btn?.classList.toggle("_is-active");

  btn?.classList.contains("_is-active")
    ? input?.setAttribute("type", "text")
    : input?.setAttribute("type", "password");
};
