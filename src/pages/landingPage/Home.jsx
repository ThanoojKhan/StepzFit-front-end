import React from "react"
import About from "../../components/landingPageComponents/organs/About"
import Calculator from "../../components/landingPageComponents/organs/Calculator"
import Footer from "../../components/landingPageComponents/organs/Footer"
import HeroSection from "../../components/landingPageComponents/organs/HeroSection"
import Membership from "../../components/landingPageComponents/organs/Membership"
import NavBar from "../../components/landingPageComponents/organs/NavBar"
import Offers from "../../components/landingPageComponents/organs/Trainers"

const Home = () => {
    return (
        <div className="scroll-smooth delay-100">
            <HeroSection />
            <NavBar />
            <About />
            <Offers />
            <Membership />
            <Calculator />
            <Footer />
        </div>
    )
}

export default Home