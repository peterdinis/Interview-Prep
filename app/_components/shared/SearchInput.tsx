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
        <InputGroup ml={2} mt={4} size='md'>
            <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input pr='4.5rem' type='text' placeholder='Search...' onChange={handleInputChange} />
        </InputGroup>
    );
};

export default SearchInput;