import { NextPage } from 'next';
import LandingInfo from './_components/home/LandingInfo';
import LandingWrapper from './_components/home/LandingWrapper';
import Footer from './_components/shared/Footer';
const Homepage: NextPage = () => {
    return (
        <>
            <LandingWrapper />
            <LandingInfo />
            <Footer />
        </>
    );
};

export default Homepage;
