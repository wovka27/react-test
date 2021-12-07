import { FC } from "react";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: FC = () => {

  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
