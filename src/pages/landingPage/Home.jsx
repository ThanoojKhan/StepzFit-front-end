import React from "react"
import About from "../../components/landingPageComponents/organs/About"
import Calculator from "../../components/landingPageComponents/organs/Calculator"
import Contact from "../../components/landingPageComponents/organs/Contact"
import HeroSection from "../../components/landingPageComponents/organs/HeroSection"
import Membership from "../../components/landingPageComponents/organs/Membership"
import Offers from "../../components/landingPageComponents/organs/Trainers"
import Footer from "../../components/landingPageComponents/organs/Footer"
import NavBar from "../../components/landingPageComponents/organs/NavBar"
const Home = () => {
    return (
        <>
            <HeroSection />
            <NavBar />
            <About />
            <Offers />
            <Membership />
            <Calculator />
            <Contact />
            <Footer/>
        </>
    )
}

export default Home