import { Container, Box } from '@chakra-ui/react'
import { GridItemStyle } from '../components/grid-item'
import HeaderSection from '../components/index/HeaderSection'
import AboutParaSection from '../components/index/AboutParaSection'
import { ExperienceSection } from '../components/index/ExperienceSection'
import FeaturedProjectSection from '../components/index/FeaturedProjectsSection'
import ContactSection from '../components/index/ContactSection'

const Page = () => {
  return (
    <Container>
      <HeaderSection />
      <AboutParaSection />
      <GridItemStyle />
      <ExperienceSection />
      <FeaturedProjectSection />
      <ContactSection />
      <Box></Box>
    </Container>
  )
}

export default Page
