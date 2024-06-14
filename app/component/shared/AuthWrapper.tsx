"use client"

import { Center } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IAuthWrapperProps {
    children?: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({children}: IAuthWrapperProps) => {
    return (
        <Center mt={7}>
            {children}
        </Center>
    )
}

export default AuthWrapper