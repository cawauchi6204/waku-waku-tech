import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Products from "./components/TechStack"
import Vision from "./components/CaseStudies"
import Company from "./components/Team"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"
import MotionProvider from "./components/MotionProvider"

export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Products />
        <Services />
        <Vision />
        <Company />
        <ContactForm />
      </main>
      <Footer />
    </MotionProvider>
  )
}
