import React, {useContext, useState} from "react";
import './Header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";

function Header() {
    let {user, logoutUser} = useContext(AuthContext)
    const loggedIn = localStorage.getItem('loggedIn');
    const initialLoggedIn = loggedIn === 'true';
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">YourThoughts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href='/'>Results</Nav.Link>
                        {initialLoggedIn && <Nav.Link href="/feedback">Feedback</Nav.Link>}
                        {user ? (
                            <Button onClick={logoutUser}>Logout</Button>
                        ) : (
                            <Button variant="info" href="/login">Log in</Button>
                        )}
                        {user && <Navbar.Text >Hello {user.username}!</Navbar.Text>}
                        {/*<Button variant="info" href="/log-in">Log in</Button>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

// const Header = () => {
//     return (
//     //       <Navbar fluid rounded>
//     //   <NavbarBrand href="https://flowbite-react.com">
//     //     <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
//     //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
//     //   </NavbarBrand>
//     //   <div className="flex md:order-2">
//     //     <Button>Get started</Button>
//     //     <NavbarToggle />
//     //   </div>
//     //   <NavbarCollapse>
//     //     <NavbarLink href="#" active>
//     //       Home
//     //     </NavbarLink>
//     //     <NavbarLink href="#">About</NavbarLink>
//     //     <NavbarLink href="#">Services</NavbarLink>
//     //     <NavbarLink href="#">Pricing</NavbarLink>
//     //     <NavbarLink href="#">Contact</NavbarLink>
//     //   </NavbarCollapse>
//     // </Navbar>
//         <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
//             <Toolbar>
//                 <Typography variant="h6" color="white" align="left" component="div" sx={{flexGrow: 1}}>
//                     YourThoughts
//                 </Typography>
//               <Link to="/">Results</Link>
//              <Link to="/survey">Survey</Link>
//               <Button color="inherit">Sign up</Button>
//               <Button color="inherit">Login</Button>
//             </Toolbar>
//         </AppBar>
//
//     );
// };
// export default Header;

// const Header = () => {
//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<FeedbackList />} />
//     //     <Route path="/feedback" element={<FeedbackForm />} />
//     //     {/*<Route path="/result" element={<FeedbackList />} />*/}
//     //   </Routes>
//     // </Router>
//     // <motion.div
//     //   // className="sidebar"
//     //   // initial={{x: '-100%'}}
//     //   // animate={{x: 0}}
//     //   // transition={{type: 'spring', stiffness: 120}}
//     // >
//     // <div>
//     //   <ul>
//     //     <li><Link to="/">YourThoughts</Link></li>
//     //     {/*<li><Link to="/about">About</Link></li>*/}
//     //     {/*<li><Link to="/contact">Contact</Link></li>*/}
//     //   </ul>
//     // </div>
//   );
//   // return (
//   //   <div className="header">
//   //     <h1>YourThoughts</h1>
//   //     <ul>
//   //       <li>Results</li>
//   //       <li>Settings</li>
//   //     </ul>
//   //     <button>Log out</button>
//   //   </div>
//   // );
// };
//
// export default Header;
// //
// export default function Header() {
//     return (
//         <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
//             <Toolbar>
//                 {/*Inside the IconButton, we
//            can render various icons*/}
//              {/*   <IconButton*/}
//              {/*       size="large"*/}
//              {/*       edge="start"*/}
//              {/*       color="inherit"*/}
//              {/*       aria-label="menu"*/}
//              {/*       sx={{mr: 2}}*/}
//              {/*   >*/}
//              {/*       /!*This is a simple Menu*/}
//              {/*Icon wrapped in Icon *!/*/}
//              {/*       <MenuIcon/>*/}
//              {/*   </IconButton>*/}
//                 {/* The Typography component applies
//            default font weights and sizes */}
//
//                 <Typography variant="h6" color="white" align="left" component="div" sx={{flexGrow: 1}}>
//                     YourThoughts
//                 </Typography>
//                 {/*<Button color="inherit">Login</Button> */}
//             </Toolbar>
//         </AppBar>
//     );
// }
