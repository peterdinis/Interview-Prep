import { FC } from 'react';
import Header from '../shared/Header';
import InterviewsWrapper from '../interviews/InterviewsWrapper';

const DashboardContent: FC = () => {
    return (
        <>
            <Header text='My interviews' />
            <InterviewsWrapper />
        </>
    );
};

export default DashboardContent;
