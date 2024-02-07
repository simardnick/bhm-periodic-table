import React, { useState } from "react";
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { PeriodicTable, Legend, AboutBadge } from "./components";
import { ICategory } from "./types";
import { useWindowSize } from "./hooks/useWindowSize";
import { useDeviceTypes } from "./hooks/useDeviceTypes";
import { CategoryTable } from "./components/category-table";
import { AboutPage, DonatePage, DownloadPage } from "./pages";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";

const setViewWidthAndHeight = (width: string, height: string) => {
  document.body.style.setProperty(`--vw`, width);
  document.body.style.setProperty(`--vh`, height);
};

function App() {
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & Element) | null
  >(null);
  const togglePopover = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const detectBrowserLanguage = require("detect-browser-language");
  const [isFrench, setIsFrench] = useState(
    detectBrowserLanguage().includes("fr") ||
      window.location.href.includes("fr")
  );
  const [showTableView, setShowTableView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const windowSize = useWindowSize();
  const { matchesDesktop } = useDeviceTypes();

  // Add a variable for vh to use for specifying full-screen height
  // 100vh does not work properly on iOS. https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  setViewWidthAndHeight(
    `${windowSize.width * 0.01}px`,
    `${windowSize.height * 0.01}px`
  );
  const containerClass = matchesDesktop ? "desktop" : "mobile";

  return (
    <div className="app-container">
      <Router>
        <div className={clsx(containerClass, "language-toggle")}>
          <div onClick={() => setIsFrench(!isFrench)}>
            {isFrench ? "English" : "Français"}
          </div>
        </div>
        <IconButton
          aria-label="menu"
          className={clsx(containerClass, "menu-button")}
          onClick={(event) => togglePopover(event)}
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/about" className="menu-link">
            <MenuItem onClick={() => handleClose()}>
              {isFrench ? "À propos de" : "About"}
            </MenuItem>
          </Link>
          <Link to="/table" className="menu-link">
            <MenuItem onClick={() => handleClose()}>
              {isFrench ? "Tableau" : "Table"}
            </MenuItem>
          </Link>
          <Link to="/download" className="menu-link">
            <MenuItem onClick={() => handleClose()}>
              {isFrench ? "Télécharge" : "Download"}
            </MenuItem>
          </Link>
          <Link to="/donate" className="menu-link">
            <MenuItem onClick={() => handleClose()}>
              {isFrench ? "Donné" : "Donate"}
            </MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              handleClose();
              window.open("https://www.parentsfordiversity.com/", "_blank");
            }}
          >
            Parents For Diversity
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              window.open("https://cwhtable.com/", "_blank");
            }}
          >
            CWH Table
          </MenuItem>
        </Menu>
        <Switch>
          <Route
            path="/about"
            render={(browserRouterProps: RouteComponentProps) => (
              <div className={clsx("about-page-container", containerClass)}>
                <AboutPage
                  isFrench={isFrench}
                  {...browserRouterProps}
                ></AboutPage>
              </div>
            )}
          ></Route>
          <Route
            path="/download"
            render={(browserRouterProps: RouteComponentProps) => (
              <div className={clsx("download-page-container", containerClass)}>
                <DownloadPage
                  isFrench={isFrench}
                  {...browserRouterProps}
                ></DownloadPage>
              </div>
            )}
          ></Route>
          <Route
            path="/donate"
            render={(browserRouterProps: RouteComponentProps) => (
              <div className={clsx("donate-page-container", containerClass)}>
                <DonatePage
                  isFrench={isFrench}
                  {...browserRouterProps}
                ></DonatePage>
              </div>
            )}
          ></Route>
          <Route path="/">
            <div className={clsx("bhm-periodic-table-app", containerClass)}>
              <h1 className="bhm-title">
                {isFrench
                  ? "Tableau périodique de l'histoire des Noirs au Canada"
                  : "Periodic Table of Canadian Black History"}
              </h1>
              {showTableView ? (
                <div className="bhm-periodic-table-container">
                  <PeriodicTable
                    isFrench={isFrench}
                    showListView={() => setShowTableView(false)}
                    onCategoryHovered={(category) =>
                      setSelectedCategory(category)
                    }
                  ></PeriodicTable>
                  <div className="legend-container">
                    <Legend
                      isFrench={isFrench}
                      selectedCategory={selectedCategory}
                      onCategorySelected={(category: ICategory) =>
                        setSelectedCategory(category.id)
                      }
                    />
                  </div>
                </div>
              ) : (
                <CategoryTable
                  isFrench={isFrench}
                  showTableView={() => setShowTableView(true)}
                ></CategoryTable>
              )}
              <img
                onClick={() => {
                  handleClose();
                  window.open("https://www.parentsfordiversity.com/", "_blank");
                }}
                className="p4d-logo"
                alt="Parents for Diversity Logo"
                src="/assets/p4d_logo.png"
              ></img>
              <AboutBadge className={containerClass}></AboutBadge>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
