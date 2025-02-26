import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Products from "./components/TechStack"
import Vision from "./components/CaseStudies"
import Company from "./components/Team"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <Vision />
        <Company />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

