
import React, { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from 'react-select';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';


const HistoryReports = () => {
  const [data, setData] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [shift, setShift] = useState('');
  const [receipyId, setreceipyId] = useState(); // Ensure this is included

  const criteriaSelection = useMemo(() => [
    { label: 'Day' },
    { label: 'Period' },
    { label: 'Shift' }
  ], []);

  const shiftOptions = useMemo(() => [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: 'All', value: 4 },
    
  ], []);



  const recipeOptions = useMemo(() => [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    // 
    { label: '15', value: 15 },
    { label: '16', value: 16 },

    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 },
    { label: '24', value: 24 },
    { label: '25', value: 25 },
    { label: 'All', value: 26 },

  ], []);

  const handleRecipeChange = (newValue) => {
    setSelectedRecipe(newValue);
    setreceipyId(newValue ? newValue.label : ''); // Update receipyId based on selectedRecipe
  };

  const handleCriteriaChange = (option) => {
    setSelectedCriteria(option);
    clearInputs();
  };

  const handleShiftchange = (shiftOptions) => {
    setShift(shiftOptions);

  }


  const clearInputs = () => {
    setFromDate(null);
    setToDate(null);
    setSelectedRecipe(null);
    setShift('');
    setreceipyId(''); // Clear receipyId
    setData([]);
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toISOString().split('T')[0];
  // };
  const formatDate = (dateStr) => {
    if (!dateStr || isNaN(new Date(dateStr))) return '';
    return dayjs(dateStr).format('DD-MM-YYYY');
  };


  const columns = [

    {
      accessorKey: 'Det.date',
      header: 'Date',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: 'Time',
      header: 'Time ',
    },
    {
      accessorKey: 'C01',
      header: 'Cycle No',
    },
    {
      accessorKey: 'C02',
      header: 'Comp Preset',
    },
    {
      accessorKey: 'C03',
      header: 'Sand Temp',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C04',
      header: 'Corrected Preset',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C05',
      header: 'Readjusted Water ',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C06',
      header: 'Comp Meas1',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C07',
      header: 'Corrected water Meas1',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C08',
      header: 'Comp Meas2',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C09',
      header: 'Corrected water Meas2',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C10',
      header: 'Comp Meas3',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C11',
      header: 'Corrected water Meas3',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C12',
      header: 'Total water',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C13',
      header: 'Deviation',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C14',
      header: 'Final Meas Comp',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C15',
      header: 'Cycle time',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C16',
      header: 'Preset Compression Strength',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C17',
      header: 'Measure Compression Strength',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C18',
      header: 'Bentonite',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C19',
      header: 'Coal Dust',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value).toFixed(3)
          : '';
      },
    },
    {
      accessorKey: 'C20',
      header: 'Additive-3  weight',
    },
    {
      accessorKey: 'C21',
      header: 'New Sand Weight ',
    },
    {
      accessorKey: 'C22',
      header: 'Return Sand',
    },
    {
      accessorKey: 'C23',
      header: 'M/C First Cycle',
    },
    {
      accessorKey: 'C24',
      header: 'Output Sand Temp',
    },
    {
      accessorKey: 'C25',
      header: 'Mixer total cycle time',
    },
    {
      accessorKey: 'mc_code',
      header: 'MC Code',
    },
    {
      accessorKey: 'C31',
      header: 'Bad Batch',
    },
    {
      accessorKey: 'RecipeId',
      header: 'Recipe ID',
    },
    // {
    //   accessorKey: 'Shift',
    //   header: 'Shift',
    // },
    // {
    //   accessorKey: 'Time',
    //   header: 'Time (24H)',
    // },

  
  ];



  const table = useMaterialReactTable({
    columns,
    data,

  });

  // const daycategory = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: myHeaders,
  //   };
  //   const day = fromDate ? fromDate.format('YYYY-MM-DD') : '';
  //   const recipeId = receipyId ? receipyId : '';

  //   fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/gethistory.php?Day=${day}&ReceipeID=${recipeId}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setData(result);
  //     })
  //     .catch((error) => console.error(error));
  // };
  const daycategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    const day = fromDate ? fromDate.format('YYYY-MM-DD') : '';
    const recipeId = selectedRecipe?.label === 'All' ? 26 : selectedRecipe?.value || '';
    

    fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/gethistory.php?Day=${day}&ReceipeID=${recipeId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.error(error));
  };


  const periodCategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    const formattedFromDate = fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '';
    const formattedToDate = toDate ? dayjs(toDate).format('YYYY-MM-DD') : '';

    // const recipeIdInt = selectedRecipe ? parseInt(selectedRecipe.label, 10) : '';
    const recipeIdInt = selectedRecipe?.label === 'All' ? 26 : selectedRecipe?.value || '';
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders
    };

    fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/gethistory.php?Fromdt=${formattedFromDate}&Todt=${formattedToDate}&ReceipeID=${recipeIdInt}&Period=1&Day&Shift`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.error(error));
  };

// const periodCategory = () => {
//   const myHeaders = new Headers();
//   myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
//   const formattedFromDate = fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '';
//   const formattedToDate = toDate ? dayjs(toDate).format('YYYY-MM-DD') : '';

//   // Check if "All" is selected
//   const isAllSelected = selectedRecipe?.label === 'All';
  
//   // Create an array of recipe IDs to fetch
//   const recipeIds = isAllSelected 
//     ? Array.from({length: 25}, (_, i) => i + 1) // [1, 2, 3, ..., 25]
//     : [selectedRecipe?.value].filter(Boolean);  // [selected value] if exists

//   // If no recipe is selected, return early
//   if (recipeIds.length === 0) {
//     console.log("No recipe selected");
//     return;
//   }

//   // Fetch data for all recipes
//   const fetchPromises = recipeIds.map(recipeId => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//       headers: myHeaders
//     };

//     return fetch(
//       `https://weaveitapp.microtechsolutions.net.in/api/kelsons/gethistory.php?Fromdt=${formattedFromDate}&Todt=${formattedToDate}&ReceipeID=${recipeId}&Period=1`, 
//       requestOptions
//     ).then(response => response.json());
//   });

//   // Combine all responses
//   Promise.all(fetchPromises)
//     .then(results => {
//       // Combine all results into a single array
//       const combinedData = results.flat();
//       console.log(combinedData);
//       setData(combinedData);
//     })
//     .catch(error => console.error(error));
// };



  const shiftCategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const formattedFromDate = fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '';
    // const recipeIdInt = selectedRecipe ? parseInt(selectedRecipe.label, 10) : '';
    const recipeIdInt = selectedRecipe?.label === 'All' ? 26 : selectedRecipe?.value || '';
 
    const shiftInt = shift?.label === "All" ? 4  : shift.value||"";

console.log('shiftInt',shiftInt)
    fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/gethistory.php?Fromdt=${formattedFromDate}&Todt=&ReceipeID=${recipeIdInt}&Shift=${shiftInt}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box className='historycontainer'>
      {/* <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant='h5'>History Reports</Typography>
      </Box> */}
      <Box sx={{
        textAlign: 'center', display: "flex",
        alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#B6B6B4', flex: 1, height: "45px",
      }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '8px',
            borderRadius: '8px',

          }}
        >
          History Reports
        </Typography>
      </Box>

      <Box className="Criteria" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Typography>Criteria Selection</Typography>
        <Select
          id="criteria-selection"
          options={criteriaSelection}
          onChange={handleCriteriaChange}
          placeholder="Select Criteria"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          sx={{ width: 300, mt: 2 }}
        />
      </Box>

      {selectedCriteria && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '40px' }}>
          {['Day', 'Period', 'Shift'].includes(selectedCriteria.label) && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) => setFromDate(newValue)}
                  slotProps={{
                    textField: { size: "small", },
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />}
                />
                {selectedCriteria.label === 'Period' && (
                  <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />}
                       slotProps={{
                    textField: { size: "small", },
                  }}
                  />
                )}
              </LocalizationProvider>
            </>
          )}
          {['Day', 'Period', 'Shift'].includes(selectedCriteria.label) && (
            <>
              <Typography>Receipe ID</Typography>
              <Select
                id="recipe-selection"
                options={recipeOptions}
                onChange={handleRecipeChange}
                placeholder="Select Recipe"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                sx={{ width: 300, mt: 2 }}
              />
            </>
          )}

          {selectedCriteria.label === 'Shift' && (
            <>



              <Typography>Shift</Typography>
              <Select
                id="shift-selection"
                options={shiftOptions}
                value={shift}
                onChange={handleShiftchange}
                sx={{ mt: 2 }}
                placeholder="Shift"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </>
          )}
          <Button sx={{ background: "#066e69" }}
            onClick={selectedCriteria.label === 'Day' ? daycategory : selectedCriteria.label === 'Period' ? periodCategory : shiftCategory}
            variant="contained"
          >
            {/* {selectedCriteria.label} */}
            Get data
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4, height: '80vh', overflowY: 'auto', }} className='tables'>
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  );
};

export default HistoryReports;






















































































































































