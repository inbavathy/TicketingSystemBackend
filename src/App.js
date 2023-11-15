import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navBar.js";
import SideBar from "./sideBar.js";
import Tickets from "./tickets.js";
import Ticket from "./ticket.js";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    padding: theme.spacing(10)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const tickets = localStorage.getItem("tickets");
    if (!tickets) localStorage.setItem("tickets", JSON.stringify([]));
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/" exact>
              Main
            </Route>
            <Route path="/tickets">
              <Tickets />
            </Route>
            <Route path="/ticket/:id">
              <Ticket />
            </Route>
            <Route path="/erstellen">Hier kannst du ein Ticket erstellen</Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
