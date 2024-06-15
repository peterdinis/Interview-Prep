import { InputGroup, Input } from '@chakra-ui/react';
import { FC } from 'react';

const SearchInput: FC = () => {
    return (
        <InputGroup ml={2} mt={4} size='md'>
            <Input pr='4.5rem' type='text' placeholder='Enter password' />
        </InputGroup>
    );
};

export default SearchInput;
