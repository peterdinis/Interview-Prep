"use client"

import { FC } from 'react';
import { SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Heading, Button } from '@chakra-ui/react';

const InterviewsWrapper: FC = () => {
    return (
        <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    );
};

export default InterviewsWrapper;