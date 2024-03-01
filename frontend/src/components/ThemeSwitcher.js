import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {Check2, CircleHalf, MoonFill, SunFill} from "react-bootstrap-icons";

function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || 'auto');
    const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || 'auto');

    const applyTheme = (theme) => {
        document.querySelector("body").setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
        setCurrentTheme(theme);
    };

    useEffect(() => {
        if (themeMode === 'auto' && localStorage.getItem("theme") !== 'light' && localStorage.getItem("theme") !== 'dark') {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDarkMode ? 'dark' : 'light');
        } else {
            applyTheme(currentTheme);
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (themeMode === 'auto') {
                const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                applyTheme(prefersDarkMode ? 'dark' : 'light');
            }
        }
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        }
    }, [currentTheme, themeMode]);

    const toggleTheme = (eventKey) => {
        const themeValue = eventKey;
        if (themeValue === 'auto') {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDarkMode ? 'dark' : 'light');
            localStorage.setItem('themeMode', 'auto');
            setThemeMode('auto');
        } else {
            applyTheme(themeValue);
            localStorage.setItem('themeMode', 'manual');
            setThemeMode('manual');
        }
    };

    const toggleThemeIcon = () => {
        if (currentTheme === "light" && themeMode === "manual") {
            return <SunFill/>
        } else if (currentTheme === "dark" && themeMode === "manual") {
            return <MoonFill/>
        } else {
            return <CircleHalf/>
        }
    }

    const isSelected = (theme) => {
        if (theme === 'auto') {
            return themeMode === "auto";
        } else{
            return themeMode === "manual" && currentTheme === theme;
        }
    }

    return (
            <Dropdown className="position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle" onSelect={toggleTheme}>
                <Dropdown.Toggle variant="primary"
                                 className="btn btn-bd-primary py-2 d-flex align-items-center"
                                 aria-expanded="false"
                                 aria-label="Toggle theme (auto)">
                    <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                        {toggleThemeIcon()}
                    </svg>
                    <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <Dropdown.Item eventKey="light" active={isSelected('light')} className="d-flex align-items-center"
                                   aria-pressed="false">
                        <svg className="bi me-2 opacity-50" width="1em" height="1em">
                            <SunFill/>
                        </svg>
                        Light
                        <svg className="bi ms-auto" style={{ display: isSelected('light') ? 'block' : 'none' }} width="1em" height="1em">
                            <Check2/>
                        </svg>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="dark" active={isSelected('dark')} className="d-flex align-items-center"
                                   aria-pressed="false">
                        <svg className="bi me-2 opacity-50" width="1em" height="1em">
                            <MoonFill/>
                        </svg>
                        Dark
                        <svg className="bi ms-auto" style={{ display: isSelected('dark') ? 'block' : 'none' }} width="1em" height="1em">
                            <Check2/>
                        </svg>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="auto" active={isSelected('auto')}
                                   className="d-flex align-items-center"
                                   aria-pressed="true">
                        <svg className="bi me-2 opacity-50" width="1em" height="1em">
                            <CircleHalf/>
                        </svg>
                        Auto
                        <svg className="bi ms-auto" style={{ display: isSelected('auto') ? 'block' : 'none' }} width="1em" height="1em">
                            <Check2/>
                        </svg>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    );
}

export default ThemeSwitcher;

                        // {/*<Button onClick={toggleTheme} className="btn btn-link border-0" style={{backgroundColor: 'transparent'}} aria-label="Toggle theme">*/}
                        // {/*    {theme === 'light' ? (*/}
                        // {/*        <i className="bi bi-moon"/>*/}
                        // {/*    ) : (*/}
                        // {/*        <span className="bi-sun"></span>*/}
                        // {/*    )}*/}
                        // {/*</Button>*/}
                        // {/*<Button variant="info" onClick={toggleTheme}>Toggle Theme</Button>*/}