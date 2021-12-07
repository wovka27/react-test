export const storage = {
  getItem: (name: string) => localStorage.getItem(name),
  setItem: (name: string, value: string) =>
    window.localStorage && localStorage.setItem(name, value),
};
