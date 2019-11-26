import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ScrollableTabsButtonForce from './ScrollableTabsButtonForce';
import TabPanel from './TabPanel';
import StickyHeadTable from './StickyHeadTable';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  panel: {
    padding: 5,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="排行" {...a11yProps(0)} />
          <Tab label="球員榜" {...a11yProps(1)} />
          {/* <Tab label="球隊榜" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <StickyHeadTable region='WESTERN'/>
          <StickyHeadTable region='EASTERN'/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ScrollableTabsButtonForce/>
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          <ScrollableTabsButtonForce/>
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}