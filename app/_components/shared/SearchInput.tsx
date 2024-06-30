'use client';

import { Box, InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { FC, ChangeEvent } from 'react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchInputProps {
    setSearchQuery: (query: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ setSearchQuery }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="center" w="100%" p={[2, 4, 6]}>
            <InputGroup w={['100%', '75%', '50%']} size='md'>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Search...'
                    onChange={handleInputChange}
                    fontSize={['sm', 'md', 'lg']}
                />
            </InputGroup>
        </Box>
    );
};

export default SearchInput;