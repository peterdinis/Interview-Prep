import { NextPage } from 'next';
import LandingInfo from './_components/home/LandingInfo';
import LandingWrapper from './_components/home/LandingWrapper';
import Footer from './_components/shared/Footer';
import LandingPages from './_components/home/LandingPages';
const Homepage: NextPage = () => {
    return (
        <>
            <LandingWrapper />
            <LandingInfo />
            <LandingPages />
            <Footer />
        </>
    );
};

export default Homepage;
