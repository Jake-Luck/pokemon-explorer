import './landing-page.scss';
import Hero from './hero/hero';
import Body from './body/body';
import Footer from './footer/footer'

function LandingPage() {
    return (
        <div className='landing-page'>
            <Hero></Hero>
            <hr data-testid='header-separator'></hr>
            <Body></Body>
            <hr data-testid='footer-separator'></hr>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage