import '@mantine/core/styles.css';
import Catalog from "./modules/catalog/Catalog.tsx";
import { MantineProvider } from '@mantine/core';
import Header from "./modules/Header/Header.tsx";
import VegetableContextProvider from "./contexts/VegetableContext.tsx";

function App() {

  return (
      <MantineProvider>
        {
          <>
            <VegetableContextProvider>
              <Header/>
              <Catalog/>
            </VegetableContextProvider>
          </>
        }
      </MantineProvider>
  )}

export default App
