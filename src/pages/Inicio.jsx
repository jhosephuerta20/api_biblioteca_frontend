import NavBar from "../components/NavbarFooter/NavBar";
import HeroSection from "../components/SectionsInicio/HeroSection";
import ArtsPopulares from "../components/SectionsInicio/ArtsPopulares"; // Importa ArtsPopulares
import PorqueMultiServi from "../components/SectionsInicio/PorqueMultiServi";
import ListoComenzar from "../components/SectionsInicio/ListoComenzar";
import Footer from "../components/NavbarFooter/Footer";
import ComoFunciona from "../components/SectionsInicio/ComoFunciona";
import MiniCategorias from "../pages/MiniCategorias";
import { useUser } from "../hooks/useUser";

const Inicio = () => {
  const { getCurrentUser } = useUser();
  const user = getCurrentUser();
  return (
    <>
      <NavBar />
      <HeroSection></HeroSection>
      <MiniCategorias />
      <ArtsPopulares />
      <ComoFunciona></ComoFunciona>
      <PorqueMultiServi></PorqueMultiServi>
      <ListoComenzar></ListoComenzar>
      <Footer></Footer>
    </>
  );
};

export default Inicio;
