
/**
 * Обьект с методами от LocalStorage
 */
export const storage = {
  getItem: (name: string) => localStorage.getItem(name),
  setItem: (name: string, value: string) =>
    window.localStorage && localStorage.setItem(name, value),
};

/**
 * Функция задержки. Имитация долгой обработки запроса с сервера
 * @param time Время в миллисекундах
 * @returns Промис
 */
export const sleep = (time:number)  => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time);
  })
}