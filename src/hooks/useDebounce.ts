// callback, który powinien być wywołany z opóźnieniem
// delay, które będzie stanowić czas, po którym ma nastąpić wywołanie funkcji debounce.
// dependencyList, tablica ze zmiennemi, której zmiana ma wywoływać callback
// (Dodatkowe zadanie)Hook useDebounce powinien zwracać dwa elementy:
// funkcję isReady, która będzie zwracała false, jeżeli delay jeszcze nie minął oraz true jeżeli callback zostanie uruchomiony
// funkcję cancel, która ma przerwać odliczanie do wykonania callbacka

//good
// import { useEffect } from "react";

// export const useDebounce = <T>(
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

// export const useDebounce = <T>(value: T, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debouncedValue;
// };

// import { useState, useEffect, useCallback, useRef } from "react";

// export const useDebounce = (
//   callback: () => void,
//   delay: number
// ): { triggerDebounce: () => void; isReady: boolean } => {
//   const [isReady, setIsReady] = useState<boolean>(true);
//   const timerRef = useRef<NodeJS.Timeout | null>(null); // Dla Node.js lub zmień na number dla przeglądarki

//   // Handler to execute the callback function
//   const handler = useCallback(() => {
//     callback();
//     setIsReady(true); // Set isReady to true after the callback is executed
//   }, [callback]);

//   // Function to initiate the debounce logic
//   const triggerDebounce = useCallback(() => {
//     if (isReady) {
//       setIsReady(false); // Set isReady to false when debounce starts
//       if (timerRef.current !== null) {
//         clearTimeout(timerRef.current); // Clear existing timer if any
//       }
//       timerRef.current = setTimeout(handler, delay); // Set a new timer
//     }
//   }, [handler, delay, isReady]);

//   // Clean up on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current !== null) {
//         clearTimeout(timerRef.current); // Clear the timer
//       }
//     };
//   }, []);

//   return { triggerDebounce, isReady };
// };

// import { useState, useEffect, useCallback } from "react";

// export const useDebounce = <T>(
//   callback: () => void,
//   delay: number,
//   dependencies: T[]
// ): { triggerDebounce: () => void; isReady: boolean } => {
//   const [isReady, setIsReady] = useState<boolean>(true);
//   const [timer, setTimer] = useState<number | null>(null);

//   const triggerDebounce = useCallback(() => {
//     if (isReady) {
//       setIsReady(false);
//       if (timer) clearTimeout(timer);
//       setTimer(
//         window.setTimeout(() => {
//           callback();
//           setIsReady(true);
//         }, delay)
//       );
//     }
//   }, [callback, delay, isReady, timer]);

//   useEffect(() => {
//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [timer, ...dependencies]);

//   return { triggerDebounce, isReady };
// };

//on top working my, bellow chat gpt

// import { useEffect, useRef, useState } from "react";

// interface UseDebounceReturn {
//   isReady: boolean;
//   cancel: () => void;
// }

// function useDebounce<T>(
//   callback: () => void,
//   delay: number,
//   dependencyList: T[]
// ): UseDebounceReturn {
//   const [isReady, setIsReady] = useState<boolean>(true);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const cancel = (): void => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//       setIsReady(true);
//     }
//   };

//   useEffect(() => {
//     setIsReady(false);
//     cancel();

//     timeoutRef.current = setTimeout(() => {
//       callback();
//       setIsReady(true);
//     }, delay);

//     return () => cancel();
//   }, dependencyList);

//   return { isReady, cancel };
// }

// export default useDebounce;

//

import { useEffect, useRef, useState } from "react";

interface UseDebounceReturn {
  isReady: boolean;
  cancel: () => void;
}

function useDebounce<T>(
  callback: () => void,
  delay: number,
  dependencies: T[]
): UseDebounceReturn {
  const [isReady, setIsReady] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsReady(true);
    }
  };

  useEffect(() => {
    setIsReady(false);
    cancel();

    timeoutRef.current = setTimeout(() => {
      callback();
      setIsReady(true);
    }, delay);

    return () => cancel();
  }, dependencies);

  return { isReady, cancel };
}

export default useDebounce;
