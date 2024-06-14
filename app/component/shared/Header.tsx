import { Center, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({text}: IHeaderProps) => {
    return (
        <Heading>
            <Center>
                <Text fontWeight={"bold"} fontSize={"4rem"}>{text}</Text>
            </Center>
        </Heading>
    )
}

export default Header;