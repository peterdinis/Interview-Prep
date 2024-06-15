"use client"

import { FC } from 'react';
import InterviewCard from './InterviewCard';
import { SimpleGrid } from '@chakra-ui/react';

const InterviewsWrapper: FC = () => {
    return (
        <SimpleGrid minChildWidth="410px" columns={6} mt={5}>
         <InterviewCard />
         <InterviewCard />
      </SimpleGrid>
    )
};

export default InterviewsWrapper;
