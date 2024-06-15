import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchInput: FC = () => {
    return (
        <InputGroup ml={2} mt={4} size='md'>
            <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input pr='4.5rem' type='text' placeholder='Search...' />
        </InputGroup>
    );
};

export default SearchInput;
