/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/extensions */
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
import { ScrollToTopEmoji } from "../ScrollToTop";
import GridBackdrop from "../GridBackdrop";

function Main({ children, router }) {
  return (
    <Box
      width="100%"
      transition="all 250ms ease-in-out"
      _dark={{ bg: "#121212" }}
    >
      {router.asPath !== "/" && <GridBackdrop />}
      <Navbar path={router.asPath} />
      <Container
        as="main"
        pt={router.asPath === "/" ? "0" : 14}
        maxW="container.xl"
        position="relative"
        minHeight="100vh"
      >
        {children}
        <ScrollToTopEmoji />
      </Container>
    </Box>
  );
}

export default Main;
