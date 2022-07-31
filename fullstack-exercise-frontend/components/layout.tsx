import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { LogIn, LogOut } from "react-feather";
import Image from "next/image";
import Notifications from "../features/notifications/notifications";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRouter } from "next/router";
import { logout as logoutAction } from "../features/auth/authSlice";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const [renderNavbar, setRenderNavbar] = useState(false);

  useEffect(() => {
    setRenderNavbar(true);
  }, []);

  let navbar = null;
  if (renderNavbar) {
    navbar = (
      <Navbar bg="light" expand="lg" className="mb-4 py-1">
        <Container>
          <Navbar.Brand href="/">
            <Image src="/logo.png" width="39" height="44" alt="Blog logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Recent Articles</Nav.Link>
          </Nav>

          <Nav>
            {!loggedIn ? (
              <Nav.Link className="text-primary" href="/admin/login">
                Login
                <LogIn className="ms-1" size={20} />
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/admin/articles">My Articles</Nav.Link>
                <Nav.Link className="text-primary" href="/admin/article">
                  Create Article
                </Nav.Link>
                <Navbar.Text className="ms-1" onClick={logout} style={{ cursor: "pointer" }}>
                  Logout
                  <LogOut className="ms-1" size={20} />
                </Navbar.Text>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  }

  async function logout() {
    await dispatch(logoutAction());
    if (router.pathname !== "/articles" && loggedIn === false) {
      router.push("/articles");
    }
  }

  return (
    <>
      <Notifications />
      {navbar}
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
