import { NextPage } from 'next';
import LandingInfo from './_components/home/LandingInfo';
import LandingWrapper from './_components/home/LandingWrapper';
import Footer from './_components/shared/Footer';
import LandingPricing from './_components/home/LandingPricing';

const Homepage: NextPage = () => {
    return (
        <>
            <LandingWrapper />
            <LandingInfo />
            <LandingPricing />
            <Footer />
        </>
    );
};

export default Homepage;
