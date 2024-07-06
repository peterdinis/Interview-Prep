"use client"

import {
    Box,
    Button,
    Flex,
    Text,
    Switch,
    VStack,
    useColorMode,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  interface Feature {
    isActive: boolean;
    label: string;
  }
  
  interface Pricing {
    planTitle: string;
    price: string;
    timeline: string;
    description: string;
    features: Feature[];
    isActive: boolean;
  }
  
  const pricingList = {
    monthlyPricings: [
      {
        planTitle: "Basic",
        price: "$9",
        timeline: "/month",
        description:
          "It’s easier to reach your savings goals when you have the right savings account.",
        features: [
          { isActive: true, label: "Build Links" },
          { isActive: true, label: "Over 66 complex" },
          { isActive: false, label: "24/7 Contact support" },
          { isActive: false, label: "Build Tools easily" },
          { isActive: false, label: "6TB storage" },
        ],
        isActive: false,
      },
      {
        planTitle: "Premium",
        price: "$29",
        timeline: "/month",
        description:
          "More off this less hello salamander lied porpoise much over tightly circa horse taped.",
        features: [
          { isActive: true, label: "Build Links" },
          { isActive: true, label: "Over 66 complex" },
          { isActive: true, label: "24/7 Contact support" },
          { isActive: true, label: "Build Tools easily" },
          { isActive: true, label: "6TB storage" },
        ],
        isActive: true,
      },
    ],
    yearlyPricings: [
      {
        planTitle: "Basic",
        price: "$99",
        timeline: "/year",
        description:
          "More off this less hello salamander lied porpoise much over tightly circa horse taped.",
        features: [
          { isActive: true, label: "Build Links" },
          { isActive: true, label: "Over 66 complex" },
          { isActive: false, label: "24/7 Contact support" },
          { isActive: false, label: "Build Tools easily" },
          { isActive: false, label: "6TB storage" },
        ],
        isActive: false,
      },
      {
        planTitle: "Premium",
        price: "$299",
        timeline: "/year",
        description:
          "It’s easier to reach your savings goals when you have the right savings account.",
        features: [
          { isActive: true, label: "Build Links" },
          { isActive: true, label: "Over 66 complex" },
          { isActive: true, label: "24/7 Contact support" },
          { isActive: true, label: "Build Tools easily" },
          { isActive: true, label: "6TB storage" },
        ],
        isActive: true,
      },
    ],
  };
  
  interface PricingItemProps {
    pricing: Pricing;
  }
  
  const PricingItem: React.FC<PricingItemProps> = ({ pricing }) => {
    const { planTitle, price, timeline, description, features, isActive } =
      pricing;
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";
  
    return (
      <Box
        bg={isActive ? "blue.600" : isDarkMode ? "gray.700" : "blue.50"}
        color={isActive ? "white" : isDarkMode ? "white" : "black"}
        borderRadius="2xl"
        shadow="md"
        p={8}
        h="full"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {planTitle}
        </Text>
        <Box mb={4}>
          <Text fontSize="3xl" fontWeight="bold">
            {price}
          </Text>
          <Text ml={2} opacity={0.7}>
            {timeline}
          </Text>
        </Box>
        <Text opacity={0.7} mb={6}>
          {description}
        </Text>
        <VStack align="start" spacing={4}>
          {features.map((item, i) => (
            <Flex align="center" key={i}>
              <Text opacity={0.7}>{item.label}</Text>
            </Flex>
          ))}
        </VStack>
        <Button
          mt={6}
          w="full"
          bg={isActive ? "white" : "blue.600"}
          color={isActive ? "black" : "white"}
          _hover={{ bg: isActive ? "gray.200" : "blue.700" }}
          borderRadius="md"
        >
          Choose plan
        </Button>
      </Box>
    );
  };
  
  const Pricing: React.FC = () => {
    const [activeTimeline, setActiveTimeline] = useState("yearly");
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";
  
    let content = null;
    if (activeTimeline === "monthly") {
      content = pricingList.monthlyPricings.map((pricing, i) => (
        <Box maxW="md" mt={6} key={i}>
          <PricingItem pricing={pricing} />
        </Box>
      ));
    }
    if (activeTimeline === "yearly") {
      content = pricingList.yearlyPricings.map((pricing, i) => (
        <Box maxW="md" mt={6} key={i}>
          <PricingItem pricing={pricing} />
        </Box>
      ));
    }
  
    return (
      <Box
        as="section"
        py={{ base: 14, md: 24 }}
        bg={isDarkMode ? "gray.800" : "white"}
        color={isDarkMode ? "white" : "black"}
        textAlign="center"
      >
        <Box px={4} mx="auto">
          <Flex justify="center" mb={12}>
            <Box maxW="xl">
              <Text fontSize={{ base: "3xl", md: "45px" }} fontWeight="bold" mb={4}>
                Flexible Plan for you
              </Text>
              <Text>Choice suitable plan for you.</Text>
            </Box>
          </Flex>
          <Flex justify="center" align="center" mb={6}>
            <Button
              variant="ghost"
              onClick={() => setActiveTimeline("yearly")}
            >
              Annual Plan
            </Button>
            <Switch
              mx={2}
              isChecked={activeTimeline === "monthly"}
              onChange={() =>
                setActiveTimeline(
                  activeTimeline === "yearly" ? "monthly" : "yearly"
                )
              }
            />
            <Button
              variant="ghost"
              onClick={() => setActiveTimeline("monthly")}
            >
              Month-to-Month
            </Button>
          </Flex>
          <Flex direction={{ base: "column", sm: "row" }} justify="center" gap={6} mt={12}>
            {content}
          </Flex>
        </Box>
      </Box>
    );
  };
  
  export default Pricing;
  