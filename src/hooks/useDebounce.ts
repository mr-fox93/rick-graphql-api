// callback, który powinien być wywołany z opóźnieniem
// delay, które będzie stanowić czas, po którym ma nastąpić wywołanie funkcji debounce.
// dependencyList, tablica ze zmiennemi, której zmiana ma wywoływać callback

import { useEffect, useState } from "react";

// import { useEffect, useState } from "react";

// const useDebounce = <T>(
//   callback: () => void,
//   delay: number,
//   dependencyList: T[]
// ) => {
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       callback();
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [callback, delay, dependencyList]);
// };

// export default useDebounce;

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};
