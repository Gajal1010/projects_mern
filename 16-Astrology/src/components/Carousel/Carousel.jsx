import Carousel from 'react-bootstrap/Carousel';
import logo from '../../zodiac.png';
import './carousel.css'

export default function HomePage() {
    return (
      <>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="carousel col-md-6 order-lg-1 col-md-6 order-md-1 col-sm-12 order-sm-1 col-12 order-2">
      <Carousel>
  <Carousel.Item>
      <h3>Astrologyx</h3>
      <p>Hi there! Welcome!
        <br/>
        Astrology is the study of the movements and relative positions of celestial objects, such as stars and planets, and how they affect human life. While it is a scientific discipline, astrology has also been embraced online as a way to cope with difficult emotions and experiences. Even those who believe in the science of astrology often enjoy poking fun at their zodiac signs. Each sign is named after a constellation in the zodiac, and is said to predict an individual's personality.</p>
  </Carousel.Item>
  <Carousel.Item>


      <h3>Astrology</h3>
      <p>It's human nature to want to know more about ourselves. Many people are interested in astrology because it offers insights into their lives and personalities. The zodiac signs are associated with specific personality traits. Some people find that horoscopes accurately reflect their personalities and predict their futures. It is unclear why or how astrology can be so accurate, but many people believe in its power. Some believe in its accuracy, while others dismiss it as superstition. Regardless of personal beliefs, astrology is a significant part of popular culture and a lucrative industry worth billions of dollars.
      </p>
  </Carousel.Item>
  <Carousel.Item>


    
  <h3>Chinese Zodiac</h3>
      <p>The Chinese zodiac, or horoscope, is a system of astrology that uses the positions of the stars and planets to understand people's personalities and predict their future. In Chinese legend, the order of the animals in the zodiac was determined by a race that was held on the birthday of the Jade Emperor. The first twelve animals to reach the finish line were chosen to represent the twelve-year cycle of the Chinese New Year. The emperors relied on astrology and astronomy to maintain harmony on earth, and the zodiac animals helped them understand the stars and the cosmos.
      </p>

  </Carousel.Item>
</Carousel>
    </div>
    </>
    );
  }