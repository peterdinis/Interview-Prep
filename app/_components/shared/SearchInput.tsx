'use client';

import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
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
        <InputGroup ml={[1, 2, 4]} mt={[2, 3, 4]} size='md'>
            <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
                pr='4.5rem'
                type='text'
                placeholder='Search...'
                onChange={handleInputChange}
                fontSize={['sm', 'md', 'lg']}
                w={['100%', '75%', '50%']}
            />
        </InputGroup>
    );
};

export default SearchInput;