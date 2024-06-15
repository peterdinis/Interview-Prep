'use client';

import { Box, Button, Card, CardBody, Heading} from '@chakra-ui/react';
import { FC } from 'react';

const InterviewCard: FC = () => {
    return (
        <>
            <Card maxW='sm'>
                <CardBody>
                <Box shadow={"2px"}>
                    <Heading display={"flex"} justifyContent={"center"} alignItems={"center"} mt={5}>Interview 1</Heading>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={5}>
                    <Button>Detail</Button>
                    </Box>
                </Box>
                </CardBody>
            </Card>
        </>
    );
};

export default InterviewCard;
