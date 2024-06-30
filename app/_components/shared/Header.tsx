import { Center, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({ text }) => {
    return (
        <Heading>
            <Center>
                <Text fontWeight='bold' fontSize={['2rem', '3rem', '4rem']}>
                    {text}
                </Text>
            </Center>
        </Heading>
    );
};

export default Header;
