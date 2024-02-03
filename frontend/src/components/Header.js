import React from "react";
import './Header.css';

import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
// import { motion } from 'framer-motion';

// import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FeedbackList from "./FeedbackList";
import FeedbackForm from "./FeedbackForm";

const Header = () => {
    return (
    //       <Navbar fluid rounded>
    //   <NavbarBrand href="https://flowbite-react.com">
    //     <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
    //   </NavbarBrand>
    //   <div className="flex md:order-2">
    //     <Button>Get started</Button>
    //     <NavbarToggle />
    //   </div>
    //   <NavbarCollapse>
    //     <NavbarLink href="#" active>
    //       Home
    //     </NavbarLink>
    //     <NavbarLink href="#">About</NavbarLink>
    //     <NavbarLink href="#">Services</NavbarLink>
    //     <NavbarLink href="#">Pricing</NavbarLink>
    //     <NavbarLink href="#">Contact</NavbarLink>
    //   </NavbarCollapse>
    // </Navbar>
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
            <Toolbar>
                <Typography variant="h6" color="white" align="left" component="div" sx={{flexGrow: 1}}>
                    YourThoughts
                </Typography>
              <Link to="/">Results</Link>
             <Link to="/survey">Survey</Link>
              <Button color="inherit">Sign up</Button>
              <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

    );
};
export default Header;

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
