import Header from "./components/Header"
import Loader from "./components/Loader"
import Motion from "./components/Motion"
import SpaceJourney from "./components/SpaceJourney"
import Cupola from "./components/Cupola"
import Cursor from "./components/Cursor"
import Hud from "./components/Hud"
import Hero from "./components/Hero"
import Statement from "./components/Statement"
import Values from "./components/Values"
import Manifesto from "./components/Manifesto"
import Closing from "./components/Closing"
import Company from "./components/Company"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Loader />
      <SpaceJourney />
      <Cupola />
      <Motion />
      <Cursor />
      <Hud />
      <div className="grain" aria-hidden="true" />
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Statement />
        <Values />
        <Manifesto />
        <Closing />
        <Company />
      </main>
      <Footer />
    </>
  )
}
