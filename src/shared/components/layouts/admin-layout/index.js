import React, { useContext, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Copyright } from "shared/components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./style";
import { InputBase, Tooltip, Button } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTranslation } from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import { AppContext } from "shared/contexts";
import { getTokenData } from "utils";
import config from 'config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import "../../../Shared.css";

import { useIdleTimer } from 'react-idle-timer';
const Logout = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { showLoader } = useContext(AppContext);
  const [probeRememberMe, setProbeRememberMe] = useState(localStorage.getItem("probeRememberMe") == "true")
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * getTokenData().maintainLoginTime,
    debounce: 500,
    onIdle: () => {
      window.location = "/login";
    },
  })

  return (
    <IconButton className={clsx('p-0 ml-2', classes.showLogOutOnlYMobile)}>
      <ExitToAppIcon
        onClick={() => {
          if (window.gapi) {
            try {
              const auth2 = window.gapi.auth2.getAuthInstance();
              auth2.signOut().then(() => auth2.disconnect());
            } catch (err) {
              console.log(err, 'Google logout error');
            }
          }
          if (window.Kakao?.Auth && window.Kakao.Auth.getAccessToken()) {
            window.Kakao.Auth.logout()
          }
          window.location = "/login";
        }}
      />
    </IconButton>
  );
};

const defaultState = {
  open: true,
  searchValue: "",
  fisrtTime: false,
};

const AdminLayout = ({
  open = true,
  children = <></>,
  headerElements = <></>,
  sidebarElements = [],
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  const { avatar } = useContext(AppContext);
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = React.useState({
    ...defaultState,
    open: !matches ? true : open,
  });
  const [showAdminCollapse, setShowAdminCollapse] = useState(false)
  const [showConsumableCollapse, setShowConsumableCollapse] = useState(false)
  const [showReportCollapse, setShowReportCollapse] = useState(false)
  const [upAdmindown, setUpAdminDown] = useState(false)
  const [consumableUpDown, setConsumableUpDown] = useState(false)
  const [reportUpDown, setReportUpDown] = useState(false)
  const [currentPath, setCurrentPath] = useState('/summary');

  const setAdminDropDown = (path) => {
    setCurrentPath(path);
    setUpAdminDown(!upAdmindown);
    setShowAdminCollapse(!showAdminCollapse);
    setShowConsumableCollapse(false);
    setShowReportCollapse(false);
    setConsumableUpDown(false);
    setReportUpDown(false);
  };

  const setConsumableDropDown = (path) => {
    setCurrentPath(path);
    setConsumableUpDown(!consumableUpDown);
    setShowConsumableCollapse(!showConsumableCollapse);
    setShowAdminCollapse(false);
    setShowReportCollapse(false);
    setUpAdminDown(false);
    setReportUpDown(false);
  };

  const setReportDropDown = (path) => {
    setCurrentPath(path);
    setShowReportCollapse(!showReportCollapse);
    setReportUpDown(!reportUpDown);
    setShowConsumableCollapse(false);
    setShowAdminCollapse(false);
    setUpAdminDown(false);
    setConsumableUpDown(false);
  };

  const handleDrawer = (open) => {
    setState((prevState) => ({
      ...prevState, open,
      fisrtTime: open
    }));
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.open,
          [classes.appBarClosed]: !state.open,
        })}
        onClick={() => {
          (matches && state.open) && handleDrawer(false)
        }}
      >
        <Toolbar className={classes.toolbar}>
          <div className="header w-100">
            <div className="d-flex f-align-center">
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleDrawer(!state.open)}
                className={clsx(classes.menuButton)}
              >
                <MenuIcon className="color-link" />
              </IconButton>
              <Typography
                variant="body1"
                noWrap
                className={clsx("color-link c-pointer", classes.title)}
                onClick={() => window.location.replace("/")}
              >
                {t("navigationHome")}
              </Typography>
              <div
                className="ml-6 d-flex f-align-center pl-2 pr-2"
                style={{ background: "#f2f4f6" }}
              >
                <InputBase
                  size="small"
                  placeholder={t("naviationSearchPlaceholder")}
                  value={state.searchValue}
                  onChange={(e) => {
                    const { value } = e.target
                    setState((prevState) => ({
                      ...prevState,
                      searchValue: value,
                    }));
                  }}
                />
                <IconButton className="p-0 ml-2">
                  <SearchIcon
                    onClick={() => {
                      if (state.searchValue.length) {
                        setState(prevState => ({
                          ...prevState,
                          searchValue: defaultState.searchValue,
                        }));
                        history.push(`/printers/search/${state.searchValue}`);
                      }
                    }}
                  />
                </IconButton>
              </div>
              <Logout />
            </div>
            {headerElements}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        elevation={20}
        variant="permanent"
        classes={{
          paper: clsx("pl-2 pr-2", state.fisrtTime ? classes.testmySelf : classes.testmySelf1, classes.drawerPaper, {
            [classes.drawerPaperClose]: !state.open,
          }),
        }}
        open={state.open}
      >
        <List
          onClick={() => {
            matches && handleDrawer(state.close)
          }}
        >
          <ListItem button>
            <ListItemIcon>
              <AcUnitIcon className="color-white" />
            </ListItemIcon>
            {state.open && (
              <ListItemText>
                <Typography variant="h5" className="color-white">
                  {getTokenData().partnerName}
                </Typography>
              </ListItemText>
            )}
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem
            className="pl-2"
            button
            onClick={() => {
              history.push(`/profile`);
            }}
          >
            <Avatar
              className={classes.avtarImage}
              src={avatar || `${config.frontendUrl}/${getTokenData().avatar}`}
            />
            {state.open && (
              <ListItemText className="pl-6">
                <Tooltip
                  title={localStorage.getItem("probe-email")}
                  placement="top-start"
                >
                  <Typography variant="body1" className="color-white" noWrap>
                    {localStorage.getItem("probe-name")}
                  </Typography>
                </Tooltip>
              </ListItemText>
            )}
          </ListItem>
          <Divider className={classes.divider} />
          {sidebarElements.map((item) => (
            <>
              <ListItem
                onClick={() => {
                  if (item.to === '/administrators') {
                    setAdminDropDown(item.to);
                  }
                  if (item.to === '/consumables') {
                    setConsumableDropDown(item.to);
                  }
                  if (item.to === '/reports') {
                    setReportDropDown(item.to);
                  } else {
                    setCurrentPath(item.to);
                  }
                }}
                component={NavLink}
                className={`${currentPath === item.to ? 'leftMenuColor' : ''}` || `${currentPath === item.to ? 'leftMenuColor' : ''}` || `${currentPath === item.to ? 'leftMenuColor' : ''}`}
                activeClassName={item.to === '/administrators' || item.to === '/consumables' || item.to === '/reports' ? '' : 'leftMenuColor'}
                to={item.to === '/administrators' ? '/printer-search' : (item.to === '/consumables' ? 'remaining-tonerink-consumables' : (item.to === '/reports' ? '/monthly-device-billing-report' : item.to))}
                key={item.lable}
              >
                {!state.open ? (
                  <Badge
                    badgeContent={item.count}
                    color={"secondary"}
                    className="mb-1"
                  >
                    <ListItemIcon className={classes.listIcon}  >
                      {item.icon}
                    </ListItemIcon>
                  </Badge>
                ) : (
                  <ListItemIcon style={{ color: `${currentPath === item.to ? '#68b9c2' : '#fff'}` || `${currentPath === item.to ? '#68b9c2' : '#fff'}` || `${currentPath === item.to ? '#68b9c2' : '#fff'}` }}>{item.icon}</ListItemIcon>
                )}
                {state.open && (
                  <ListItemText>
                    <div className="d-flex f-justify-between f-align-center">
                      <Typography variant="body1" className="color-white">
                        {item.label}
                      </Typography>
                      {parseInt(item?.count) > 0 && (
                        <Badge
                          badgeContent={item.count}
                          color={"secondary"}
                          className="mb-1"
                        />
                      )}
                    </div>
                  </ListItemText>
                )}
                {item.to === '/administrators' ?
                  <div style={{ width: '100%', height: '23px', color: 'white', paddingTop: '1px', marginLeft: '120px' }}
                    onClick={() => {
                      setAdminDropDown();
                    }}>
                    {upAdmindown ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                  </div> : item.to === '/consumables' ?
                    <div style={{ width: '100%', height: '23px', color: 'white', paddingTop: '1px', marginLeft: '120px' }}
                      onClick={() => {
                        setConsumableDropDown();
                      }}>
                      {consumableUpDown ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                    </div>
                    : item.to === '/reports' ? <div style={{ width: '100%', height: '23px', color: 'white', paddingTop: '1px', marginLeft: '120px' }}
                      onClick={() => {
                        setReportDropDown();
                      }}>
                      {reportUpDown ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                    </div>
                      : ''}
              </ListItem>
              {item.to === '/administrators' ?
                <Collapse
                  style={{ backgroundColor: '#4b4f52', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                  in={showAdminCollapse} timeout="auto" unmountOnExit>
                  {item.administratorSubArray.map((items) => {
                    return (
                      <>
                        <ListItem
                          component={NavLink}
                          activeClassName={`${classes.activeListItem} leftMenuColor`}
                          to={items.to}
                          key={items.lable}
                        >
                          {!state.open ? (
                            <Badge
                              badgeContent={items.count}
                              color={"secondary"}
                              className="mb-1"
                            >
                              <ListItemIcon className={classes.listIcon}>
                                {items.icon}
                              </ListItemIcon>
                            </Badge>
                          ) : (
                            <ListItemIcon>{items.icon}</ListItemIcon>
                          )}
                          {state.open && (
                            <ListItemText>
                              <div className="d-flex f-justify-between f-align-center">
                                <Typography variant="body1" className="color-white">
                                  {items.label}
                                </Typography>
                                {parseInt(item?.count) > 0 && (
                                  <Badge
                                    badgeContent={items.count}
                                    color={"secondary"}
                                    className="mb-1"
                                  />
                                )}
                              </div>
                            </ListItemText>
                          )}
                        </ListItem>
                      </>
                    )
                  })}
                </Collapse>
                :
                item.to === '/consumables' ?
                  <Collapse
                    style={{ backgroundColor: '#4b4f52', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                    in={showConsumableCollapse} timeout="auto" unmountOnExit>
                    {item.consumableSubArray.map((items) => {
                      return (
                        <>
                          <ListItem
                            component={NavLink}
                            activeClassName={`${classes.activeListItem} leftMenuColor`}
                            to={items.to}
                            key={items.lable}
                          >
                            {!state.open ? (
                              <Badge
                                badgeContent={items.count}
                                color={"secondary"}
                                className="mb-1"
                              >
                                <ListItemIcon className={classes.listIcon}>
                                  {items.icon}
                                </ListItemIcon>
                              </Badge>
                            ) : (
                              <ListItemIcon>{items.icon}</ListItemIcon>
                            )}
                            {state.open && (
                              <ListItemText>
                                <div className="d-flex f-justify-between f-align-center">
                                  <Typography variant="body1" className="color-white">
                                    {items.label}
                                  </Typography>
                                  {parseInt(item?.count) > 0 && (
                                    <Badge
                                      badgeContent={items.count}
                                      color={"secondary"}
                                      className="mb-1"
                                    />
                                  )}
                                </div>
                              </ListItemText>
                            )}
                          </ListItem>
                        </>
                      )
                    })}
                  </Collapse>
                  :
                  item.to === '/reports' ?
                    <Collapse
                      style={{ backgroundColor: '#4b4f52', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                      in={showReportCollapse} timeout="auto" unmountOnExit>
                      {item.reportSubArray.map((items) => {
                        return (
                          <>
                            <ListItem
                              component={NavLink}
                              activeClassName={`${classes.activeListItem} leftMenuColor`}
                              to={items.to}
                              key={items.lable}
                            >
                              {!state.open ? (
                                <Badge
                                  badgeContent={items.count}
                                  color={"secondary"}
                                  className="mb-1"
                                >
                                  <ListItemIcon className={classes.listIcon}>
                                    {items.icon}
                                  </ListItemIcon>
                                </Badge>
                              ) : (
                                <ListItemIcon>{items.icon}</ListItemIcon>
                              )}
                              {state.open && (
                                <ListItemText>
                                  <div className="d-flex f-justify-between f-align-center">
                                    <Typography variant="body1" className="color-white">
                                      {items.label}
                                    </Typography>
                                    {parseInt(item?.count) > 0 && (
                                      <Badge
                                        badgeContent={items.count}
                                        color={"secondary"}
                                        className="mb-1"
                                      />
                                    )}
                                  </div>
                                </ListItemText>
                              )}
                            </ListItem>
                          </>
                        )
                      })}
                    </Collapse>
                    : ''
              }
            </>
          ))}
          <ListItem
            button
            onClick={() => {
              window.open("https://pf.kakao.com/_xmExnIC", "_blank");
            }}
          >
            <ListItemIcon>
              <ContactSupportIcon className="color-white" />
            </ListItemIcon>
            {state.open && (
              <ListItemText>
                <Typography variant="body1" className="color-white">
                  {t("sidebarContact")}
                </Typography>
              </ListItemText>
            )}
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content} onClick={() => (matches && state.open) && handleDrawer(false)}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="false" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div >
  );
};

export default AdminLayout;
