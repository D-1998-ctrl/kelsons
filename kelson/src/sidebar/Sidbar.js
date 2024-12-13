
// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import "./sidbar.css";
// import { FaAngleLeft } from "react-icons/fa";
// import kelsonslogo from "../imgs/Kelsons Logo.jpg";
// import { menuItems } from "./menuItems";
// import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
// import { Box } from "@mui/material";
// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

  
//   return (
//     <div className="grid-container">
//       <section className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <div className="sidebar-content" style={{ width: "230px" }}>
//           <div className="toggle">
//             <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
//           </div>
//         </div>
//         <div className="sidebar-content-items">
//           <div
//             className="logo-container"
//             style={{
//               display: "flex",
//               gap: "20px",
//               margin: "25px 0 0 10px",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//              <div className="logo-container" style={{ display: "flex",height:'60px',  alignItems: "center",justifyContent:'center' }}>
//             <span   className="image">
//               <img src={kelsonslogo} alt="" style={{ width: "150px", height: "50px" }} />
             
//             </span>
//           </div>
//           </div>
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {menuItems.map((item, index) => (
//                     <li key={index}>
//                       <div className="menu-item">
//                         <Link to={item.path} className="menu-link">
//                           <i onClick={toggleSidebar} className="menu-icon">
//                             {item.icon}
//                           </i>
//                           <span className="hidden-text">{item.title}</span>
//                         </Link>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <main className="main" style={{ height: "93vh", overflowY: "auto", }}>
//       <Box className="DensityMediumRoundedIcon" ><DensityMediumRoundedIcon   onClick={toggleSidebar}/></Box>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default Sidebar;



import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./sidbar.css";
import { FaAngleLeft } from "react-icons/fa";
import kelsonslogo from "../imgs/Kelsons Logo.jpg";
import { menuItems } from "./menuItems";
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import { Box } from "@mui/material";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Get the current location
  const activePath = location.pathname; // Get the current active path

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="grid-container">
      <section className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content" style={{ width: "230px" }}>
          <div className="toggle">
            <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
          </div>
        </div>
        <div className="sidebar-content-items">
          <div
            className="logo-container"
            style={{
              display: "flex",
              gap: "20px",
              margin: "25px 0 0 10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="logo-container" style={{ display: "flex", height: '60px', alignItems: "center", justifyContent: 'center' }}>
              <span className="image">
                <img src={kelsonslogo} alt="" style={{ width: "150px", height: "50px" }} />
              </span>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="menu-bar">
              <div className="menus">
                <ul className="menu">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <div className={`menu-item ${activePath === item.path ? "active" : ""}`}>
                        <Link to={item.path} className="menu-link">
                          <i onClick={toggleSidebar} className="menu-icon">
                            {item.icon}
                          </i>
                          <span className="hidden-text">{item.title}</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="main" style={{ height: "93vh", overflowY: "auto", marginLeft: collapsed ? "3px" : "3px", }}>
        <Box className="DensityMediumRoundedIcon" ><DensityMediumRoundedIcon onClick={toggleSidebar} /></Box>
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
