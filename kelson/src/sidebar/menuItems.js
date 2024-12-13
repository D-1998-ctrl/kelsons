

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
export const menuItems = [
  
  {
    title: "Home",
    path: "/home",
    icon: <HomeRoundedIcon />,
  },

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
  },

  {
    title: "History Reports",
    path: "/history",
    icon: <WorkHistoryRoundedIcon />,
  },

  {
    title: "Deviation",
    path: "/deviation",
    icon: <AssessmentRoundedIcon />,
  },

  {
    title: "Compression",
    path: "/compression",
    icon: <EqualizerIcon />,
  },

  {
    title: "Temp Variation",
    path: "/tempVariation",
    icon: <SignalCellularAltIcon />,
  },

  {
    title: "LogOut",
    path: "/",
    icon: <LoginRoundedIcon />,
  },

];
