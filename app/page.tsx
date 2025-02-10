import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import TechStack from "./components/TechStack"
import CaseStudies from "./components/CaseStudies"
import Team from "./components/Team"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <CaseStudies />
        <Team />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

