'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import { Blob } from '../shared/Blob'

const LandingWrapper: FC = () => {
  return (
    <Container maxW={'6xl'} mt={14}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              Interview
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              Prep
            </Text>
          </Heading>
          <Text color={'white.500'} fontSize={"1.2rem"} letterSpacing={"-1%"} fontWeight={"bold"}>
          Are you ready to ace your next job interview? Look no further than InterviewPrep, the ultimate platform designed to help you master the art of interviewing. Whether you're a recent graduate, a seasoned professional, or someone looking to make a career change, our app offers tailored mock interviews to prepare you for every question and scenario.
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}>
              <Link href="/register">
              Get started
              </Link>
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}>
              About Interview Prep
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={useColorModeValue('red.50', 'red.400')}
          />
          
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            width={'full'}
            overflow={'hidden'}>
            <IconButton
              aria-label={'Play Button'}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              size={'lg'}
              color={'white'}
              position={'absolute'}
              left={'50%'}
              top={'50%'}
              transform={'translateX(-50%) translateY(-50%)'}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}

export default LandingWrapper;