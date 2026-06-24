import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Vegetables } from "../types";

type VegetableContextType = {
  dataCardCart: Vegetables[];
  setDataCardCart: Dispatch<SetStateAction<Vegetables[]>>;
};

export const VegetableContext = createContext<VegetableContextType | null>(null);

function VegetableContextProvider({ children }: PropsWithChildren) {

  const [dataCardCart, setDataCardCart] = useState<Vegetables[]>([]);

  return (
    <VegetableContext.Provider
      value={{
        dataCardCart,
        setDataCardCart,
      }}
    >
      {children}
    </VegetableContext.Provider>
  );
}
export default VegetableContextProvider;