import * as userService from '../../utilities/users-service';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
    <Navbar className="color-nav" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Astrologyx</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/profile/${user._id}`}>Welcome, {user.name}!</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/daily_horoscope">Daily Horoscope</Nav.Link>
            <Nav.Link href="/chinese_zodiac">Chinese Zodiac</Nav.Link>
          </Nav>



          <Nav>
            <Nav.Link eventKey={2} href="" onClick={handleLogOut}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}