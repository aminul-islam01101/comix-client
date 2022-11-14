import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import star from '../../assets/images/neitery.jpg';
import './Banner.css';
import Slider from './Slider';

export default function Banner() {
    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
          
                    backgroundImage: `url(${star})`,
                    // overflow: 'hidden',
                }}
            >
                <Parallax pages={2} className="hide-scroll">
                    <ParallaxLayer offset={0}>
                        <div className="container grid md:grid-cols-2 place-items-center h-screen">
                            <Slider />
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={0} style={{ backgroundColor: '#fff000' }} />
                </Parallax>
            </div>
            <footer style={{ height: '1000px', marginTop: '20%' }}>
                <span>Made with</span>
                <a target="_blank" rel="noreferrer" href="https://react-spring.io">
                    &nbsp;React-Spring
                </a>
                <div>
                    Cloud Image from
                    <a target="_blank" rel="noreferrer" href="https://freepngimg.com/">
                        &nbsp;FreePNGimg
                    </a>
                </div>
            </footer>
        </>
    );
}
