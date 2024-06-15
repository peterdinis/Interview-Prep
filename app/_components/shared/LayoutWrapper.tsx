"use client"

import { Box } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

interface ILayoutProps {
    children?: ReactNode;
}

const LayoutWrapper: FC<ILayoutProps> = ({ children }: ILayoutProps) => {
	return (
		<Box
			px={{ base: "6", md: "6", lg: "20", sm: "10", xl: "28" }}
			pb="0"
			mx="auto"
			pt={{ base: "8", sm: "16", md: "20" }}
		>
			{children}
		</Box>
	);
};

export default LayoutWrapper;