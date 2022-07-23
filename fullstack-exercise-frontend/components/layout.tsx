import { FunctionComponent } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { LogIn, LogOut } from "react-feather";

interface LayoutProps {
  children: React.ReactNode;
}

const loggedIn = false;

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo.png" width="39" height="44" alt="Blog logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Recent Articles</Nav.Link>
          </Nav>

          <Nav>
            {loggedIn ? (
              <Nav.Link className="text-primary" href="/admin/login">
                Login
                <LogIn size={20} />
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/admin/articles">My Articles</Nav.Link>
                <Nav.Link className="text-primary" href="/admin/article">
                  Create Article
                </Nav.Link>
                <Nav.Link href="/admin/logout">
                  Logout
                  <LogOut size={20} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
