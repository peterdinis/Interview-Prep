import { NextPage } from "next";
import LandingWrapper from "./component/home/LandingWrapper";
import LandingInfo from "./component/home/LandingInfo";
import Footer from "./component/shared/Footer";

const Homepage: NextPage = () => {
  return (
    <>
      <LandingWrapper />
      
      <Footer />
    </>
  )
}

export default Homepage;