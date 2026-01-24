import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Features from '../../components/Features'
import HowItWorks from '../../components/HowItWorks'
import UseCases from '../../components/UseCases'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'

function LandingPage() {
    return (
        <SmoothScroll>
            <Header />
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <UseCases />
            <CTA />
            <Footer />
        </SmoothScroll>
    )
}

export default LandingPage

