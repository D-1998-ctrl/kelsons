

// import React, { useState, useEffect } from "react";
// import "./home.css";
// import user from '../imgs/user.jpg';
// import img1 from '../imgs/img1.png';

// function Home() {
//   const [machineNo, setMachineNo] = useState("");
//   const [customer, setCustomer] = useState("");
//   const [supplyDate, setSupplyDate] = useState("");
//   const [profilePic, setProfilePic] = useState();
//   const [Colvalue, setColvalue] = useState(1)
//   const homedetails = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow"
//     };

//     fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/getbyid.php?Table=tblCompanyInfo&Colname=CompanyId&Colvalue=${Colvalue}`, requestOptions)

//       .then((response) => response.json())
//       .then((result) => {
//          console.log("homedetails Data:", result);
//         if (result && result.length > 0) {
//           const data = result[0];
//           setCustomer(data.CompanyName);
//           setMachineNo(data.MachineNo);
//           setSupplyDate(new Date(data.SupplyDate.date).toLocaleDateString());
//           setProfilePic(data.Profilepic);
//         }
//       })
//       .catch((error) => console.error(error));

//   };

//   useEffect(() => {
//     homedetails();
//   }, []);

//   return (
//     <div>
//       <div className="Home_container">
//         <div className="background-image-container">
//           <img className="background-image" src={img1} alt="Background" />
//         </div>
//       </div>

//       <div className="profileUser-card">
//         <img src={profilePic} alt="" className="profile-image" />
//         <div className="profile-content">
//           <div className="profile-details">
//             <h2>Customer: {customer}</h2>
//             <h3>Machine No: {machineNo}</h3>
//             <h3>Supply Date: {supplyDate}</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;



import { useState, useEffect } from "react";
import "./home.css";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import img1 from '../imgs/img1.png';
import { RadioGroup, Radio, FormControlLabel, Box, Typography, Select, MenuItem, TextField, Button, Paper, Drawer, useMediaQuery } from '@mui/material';
import logo from '../imgs/Kelsons Logo.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useTheme } from "@mui/material/styles";
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    resetForm();
    setIsEditing(false);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    resetForm();
  };



  const [Machineinfo, setMachineInfo] = useState();

  //get data 
  const getdata = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://weaveitapp.microtechsolutions.net.in/api/kelsons/gettable.php?table=Machineinfo ", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMachineInfo(result)
        // console.log('result', result)
      }
      )
      .catch((error) => console.error(error));
  }

  const [userName, setUserName] = useState();
  const [KOCType, setKOCType] = useState();
  const [machineNo, setMachineNo] = useState();
  const [supplyDate, setSupplyDate] = useState();
  const [validFrom, setValidFrom] = useState();
  const [validTo, setValidTo] = useState();
  const [status, setStatus] = useState('true');

  //post  data

  const createMachineinfo = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const formattedSupplyDate = moment(supplyDate).format("YYYY-MM-DD");
    const formattedvalidFrom = moment(validFrom).format("YYYY-MM-DD");
    const formattedvalidTo = moment(validTo).format("YYYY-MM-DD");

    const urlencoded = new URLSearchParams();
    urlencoded.append("UserName", userName);
    urlencoded.append("KOCType", KOCType);
    urlencoded.append("MachineNo", machineNo);
    urlencoded.append("SupplyDate", formattedSupplyDate);
    urlencoded.append("ValidFrom", formattedvalidFrom);
    urlencoded.append("ValidTo", formattedvalidTo);
    urlencoded.append("Status", status);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://weaveitapp.microtechsolutions.net.in/api/kelsons/postmachineinfo.php", requestOptions);
      const result = await response.text();
      // console.log(result);

      if (result.toLowerCase().includes("success")) {
        toast.success("Machine info created successfully!");
        getdata()
        handleDrawerClose()
      } else {
        toast.error("Failed to create machine info!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while creating machine info!");
    }
  };


  //update  data

  const updateMachineinfo = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const formattedSupplyDate = moment(supplyDate).format("YYYY-MM-DD");
    const formattedvalidFrom = moment(validFrom).format("YYYY-MM-DD");
    const formattedvalidTo = moment(validTo).format("YYYY-MM-DD");

    const urlencoded = new URLSearchParams();
    urlencoded.append("UserName", userName);
    urlencoded.append("KOCType", KOCType);
    urlencoded.append("MachineNo", machineNo);
    urlencoded.append("SupplyDate", formattedSupplyDate);
    urlencoded.append("ValidFrom", formattedvalidFrom);
    urlencoded.append("ValidTo", formattedvalidTo);
    urlencoded.append("Status", status);
    urlencoded.append("Id", idwiseData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://weaveitapp.microtechsolutions.net.in/api/kelsons/updatemachineinfo.php", requestOptions);
      const result = await response.json();
      // console.log("API Response:", result);

      if (result.message && result.message.toLowerCase().includes("success")) {
        toast.success("Machine info Updated successfully!");
        getdata();
        handleDrawerClose();
      } else {
        toast.error("Failed to Update machine info!");
      }

    } catch (error) {
      console.error(error);
      toast.error("Error while Updated machine info!");
    }
  };








  //reset form 
  const resetForm = () => {
    setUserName("")
    setKOCType('')
    setMachineNo("")
    setSupplyDate("")
    setValidFrom("")
    setValidTo("")
    setStatus("")

  }

  useEffect(() => {
    getdata()
    getcurrentStatus()
  }, []);

  const [currentStatus, setCurrentStatus] = useState(null);


  const getcurrentStatus = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://weaveitapp.microtechsolutions.net.in/api/kelsons/lastupload.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCurrentStatus(result)
        // console.log('currentstatusresult', result)
      })
      .catch((error) => console.error(error));
  }

  //table
  const formatDate = (dateStr) => {
    if (!dateStr || isNaN(new Date(dateStr))) return '';
    return dayjs(dateStr).format('DD-MM-YYYY');
  };

  const columns = [

    {
      accessorKey: 'SupplyDate.date',
      header: 'SupplyDate',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: 'UserName',
      header: 'UserName ',
    },
    {
      accessorKey: 'KOCType',
      header: 'KOCType',
    },
    {
      accessorKey: 'MachineNo',
      header: 'MachineNo',
    },

    {
      accessorKey: 'ValidFrom.date',
      header: 'ValidFrom',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },

    {
      accessorKey: 'ValidTo.date',
      header: 'ValidTo',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },



    {
      header: 'Actions',
      size: 200,
      Cell: ({ row }) => (
        <Box >
          <Button

            variant="contained"
            size="small"
            onClick={() => {
              // setCurrentRow(row);
              handleEdit(row.original);
            }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: Machineinfo || [], // safe fallback
  });

  const [idwiseData, setIdwiseData] = useState('')

  const handleEdit = (rowData) => {
    // console.log("This row has been clicked:", rowData);
    // console.log("rowData.Id:", rowData.Id);
    setIsEditing(!!rowData.Id);
    setIdwiseData(rowData.Id);
    setIsDrawerOpen(true);
    setUserName(rowData.UserName);
    setKOCType(rowData.KOCType);
    setMachineNo(rowData.MachineNo);
    setSupplyDate(rowData.SupplyDate?.date.split(" ")[0]);
    setValidFrom(rowData.ValidFrom?.date.split(" ")[0]);
    setValidTo(rowData.ValidTo?.date.split(" ")[0]);
    setStatus(rowData.Status)

  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Box>
          <img src={logo} alt=""
            style={{
              width: '150px',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#B6B6B4', height: "45px", ml: 5, borderRadius: '8px',
        }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Admin Page
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
         
          justifyContent: 'space-between',
          alignItems: 'center',
          
        }}
      >
        <img
          src={img1}
          alt=""
          style={{
            width: '550px',
            height: 'auto',
            borderRadius: '8px',
          }}
        />

        <Box>
          <Typography><b>Current Status</b></Typography>
          {currentStatus ? (
            <>
              <Typography><b>Last Uploaded Date:</b> {currentStatus.last_uploaded_date}</Typography>
              {/* <Typography><b>Time:</b> {currentStatus.last_uploaded_time}</Typography> */}
              <Typography><b>Days Pending:</b> {currentStatus.days_pending}</Typography>
              {/* <Typography><b>Status:</b> {currentStatus.status}</Typography> */}
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Box>
      <Box
      // sx={{ float: 'right', marginBottom: 2 }}
      >
        <Button variant="contained" onClick={handleDrawerOpen}>
          Create
        </Button>

      </Box>

      {/* table  */}
 
      <Box
        sx={{ mt: 2, }} className='tables'
      >
        <MaterialReactTable table={table} />
      </Box>


      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
            width: isSmallScreen ? "100%" : "650px",
            zIndex: 1000,
          },
        }}
      >

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#c7eaee' }}>

            <Typography m={2} fontWeight="bold" variant="h6">
              {isEditing ? "Update Machine Info" : "Create Machine Info"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
      

          <Box m={2}>
            <Box>

              <Box flex={1}>
                <Typography variant="body2">UserName</Typography>
                <TextField
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  size="small"
                  placeholder='User Name'
                  fullWidth />
              </Box>

              <Box flex={1}>
                <Typography variant="body2">KOCType</Typography>
                <TextField

                  value={KOCType}

                  onChange={(e) => setKOCType(e.target.value)}
                  size="small"
                  placeholder='KOCType'
                  fullWidth />
              </Box>

              <Box flex={1}>
                <Typography variant="body2">MachineNo</Typography>
                <TextField



                  value={machineNo}

                  onChange={(e) => setMachineNo(e.target.value)}
                  size="small"
                  placeholder='MachineNo'
                  fullWidth />
              </Box>


              <Box>
                <Typography variant="body2">Supply Date</Typography>

                <DatePicker
                  value={supplyDate ? new Date(supplyDate) : null}
                  format="dd-MM-yyyy"
                  onChange={(newValue) => { setSupplyDate(newValue); }}
                  slotProps={{
                    textField: { size: "small", fullWidth: true, },
                  }}
                  renderInput={(params) => <TextField />}
                />
              </Box>

              <Box>
                <Typography variant="body2">Valid From</Typography>

                <DatePicker
                  value={validFrom ? new Date(validFrom) : null}
                  format="dd-MM-yyyy"
                  onChange={(newValue) => { setValidFrom(newValue); }}
                  slotProps={{
                    textField: { size: "small", fullWidth: true, },
                  }}
                  renderInput={(params) => <TextField />}
                />
              </Box>

              <Box>
                <Typography variant="body2">Valid Todt</Typography>

                <DatePicker
                  value={validTo ? new Date(validTo) : null}
                  format="dd-MM-yyyy"
                  onChange={(newValue) => { setValidTo(newValue); }}
                  slotProps={{
                    textField: { size: "small", fullWidth: true, },
                  }}
                  renderInput={(params) => <TextField />}
                />
              </Box>



              <Box flex={1}>
                <Typography variant="body2">Status</Typography>
                <RadioGroup
                  row
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Active" />
                  <FormControlLabel value="0" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </Box>


            </Box>


          </Box>




          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5}>
            <Box>
              <Button
                sx={{
                  background: '#36959e',
                }}

                onClick={isEditing ? updateMachineinfo : createMachineinfo}
                variant="contained"
              >
                {isEditing ? "Update" : "Save"}
              </Button>
              {/* <Button onClick={createMachineinfo} variant="contained">
                Save
              </Button> */}
            </Box>

            <Box>
              <Button
                onClick={handleDrawerClose} variant='outlined'>Cancel </Button>
            </Box>


          </Box>
        </LocalizationProvider>
      </Drawer>

    </Box>
  );
}

export default Home;

