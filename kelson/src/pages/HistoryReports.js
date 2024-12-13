
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
    { label: 'All', value: 4 }
  ], []);



  const recipeOptions = useMemo(() => [
    { label: '1' },
    { label: '2' }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const columns = [
   
    {
      accessorKey: 'Date.date',
      header: 'Date',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: 'Time',
      header: 'Time ',
    },
    {
      accessorKey: 'CycleNo',
      header: 'Cycle No',
    },
    {
      accessorKey: 'CompPreset',
      header: 'Comp Preset %',
    },
    {
      accessorKey: 'SandTemp',
      header: 'Sand Temp °C',
    },
    {
      accessorKey: 'CorrectedPreset',
      header: 'Corrected Preset %',
    },
    {
      accessorKey: 'ReadjustedWater',
      header: 'Readjusted Water ltr',
    },
    {
      accessorKey: 'CompMeas1',
      header: 'Comp Meas 1 %',
    },
    {
      accessorKey: 'CorrectedwaterMeas1',
      header: 'Corrected Water Meas 1 ltr',
    },
    {
      accessorKey: 'CompMeas2',
      header: 'Comp Meas 2 %',
    },
    {
      accessorKey: 'CorrectedwaterMeas2',
      header: 'Corrected Water Meas 2 ltr',
    },
    {
      accessorKey: 'CompMeas3',
      header: 'Comp Meas 3 ltr',
    },
    {
      accessorKey: 'CorrectedwaterMeas3',
      header: 'Corrected Water Meas 3 ltr',
    },
    {
      accessorKey: 'Totalwater',
      header: 'Total Water ltr',
    },
    {
      accessorKey: 'Deviation',
      header: 'Deviation %',
    },
    {
      accessorKey: 'FinalMeasComp',
      header: 'Final Meas Comp %',
    },
    {
      accessorKey: 'CycleTime',
      header: 'Cycle Time sec',
    },
    {
      accessorKey: 'PresetCompressionStrength',
      header: 'Preset Compression Strength gm/cm²',
    },
    {
      accessorKey: 'MeasureCompressionStrength',
      header: 'Measure Compression Strength gm/cm²',
    },
    {
      accessorKey: 'Additive1Weight',
      header: 'Additive 1 Weight Bentonite Kg',
    },
    {
      accessorKey: 'Additive2Weight',
      header: 'Additive 2 Weight Cold Dust Kg',
    },
    {
      accessorKey: 'Additive3weight',
      header: 'Additive 3 Weight Kg',
    },
    {
      accessorKey: 'NewSandWeight',
      header: 'New Sand Weight Kg',
    },
    {
      accessorKey: 'ReturnSand',
      header: 'Return Sand Kg',
    },
    {
      accessorKey: 'MachineFirstCycle',
      header: 'Machine First Cycle ',
    },
    {
      accessorKey: 'OutputSandTemp',
      header: 'Output Sand Temp °C',
    },
    {
      accessorKey: 'MXCTotalCycleTime',
      header: 'MXC Total Cycle Time Sec',
    },
    {
      accessorKey: 'mc_code',
      header: 'MC Code',
    },
    {
      accessorKey: 'BadBatch',
      header: 'Bad Batch',
    },
    {
      accessorKey: 'RecipeId',
      header: 'Recipe ID',
    },
    {
      accessorKey: 'Shift',
      header: 'Shift',
    },
    {
      accessorKey: 'Time24',
      header: 'Time (24H)',
    },
    {
      accessorKey: 'ReceipNo',
      header: 'Receipt No',
    },
    {
      accessorKey: 'RecName',
      header: 'Recipe Name',
    },
  ];



  const table = useMaterialReactTable({
    columns,
    data,
  
  });

  const daycategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    const day = fromDate ? fromDate.format('YYYY-MM-DD') : '';
    const recipeId = receipyId ? receipyId : '';

    fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/gethistory.php?Day=${day}&ReceipeID=${recipeId}`, requestOptions)
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

    const recipeIdInt = selectedRecipe ? parseInt(selectedRecipe.label, 10) : '';

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders
    };

    fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/gethistory.php?Fromdt=${formattedFromDate}&Todt=${formattedToDate}&ReceipeID=${recipeIdInt}&Period=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  const shiftCategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const formattedFromDate = fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '';
    const recipeIdInt = selectedRecipe ? parseInt(selectedRecipe.label, 10) : '';
    const shiftInt = shift.value;


    fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/gethistory.php?Fromdt=${formattedFromDate}&ReceipeID=${recipeIdInt}&Shift=${shiftInt}`, requestOptions)
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
  <Box sx={{ textAlign: 'center',}}> 
  <Typography 
    variant="h3" 
    sx={{
      fontWeight: 'bold',
      fontSize:'20px',   
      textTransform: 'uppercase',
      letterSpacing: '2px',
      padding: '8px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor:'#d4fdfb',
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
                  renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />}
                />
                {selectedCriteria.label === 'Period' && (
                  <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />}
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
          <Button sx={{background:"#066e69"}}
            onClick={selectedCriteria.label === 'Day' ? daycategory : selectedCriteria.label === 'Period' ? periodCategory : shiftCategory}
            variant="contained"
          >
            {/* {selectedCriteria.label} */}
            Get data
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4,height:'80vh',overflowY:'auto', }} className='tables'>
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  );
};

export default HistoryReports;






















































































































































