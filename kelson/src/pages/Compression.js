
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Select, MenuItem, TextField, Button } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { BarChart } from '@mui/x-charts/BarChart';

// const Compression = () => {
//     const [criteria, setCriteria] = useState('');
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [shift, setShift] = useState('');
//     const [data, setData] = useState([]);
//     const [totalbatches, setTotalbatches] = useState(0);

//     const valueFormatter = (value) => `${value}%`;

//     useEffect(() => {
//         // Log the data to ensure it is correctly received
//         // console.log("Data: ", data);
//     }, [data]);

//     const daycategory = () => {
//         const myHeaders = new Headers();
//         myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

//         const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
//         const toDateFormatted = toDate?.format('YYYY-MM-DD');
//         const requestOptions = {
//             method: "GET",
//             headers: myHeaders,
//             redirect: "follow"
//         };
    
//         if (fromDateFormatted && toDateFormatted) {
//             fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}&Day=1`,requestOptions)
//                 .then((response) => response.json())
//                 .then((result) => {
//                     setData(result);
//                     setTotalbatches(result[6]?.Totalbatches || 0);
//                 })
//                 .catch((error) => console.error('Error fetching data:', error));
//         }
//     };

//     const shiftCategory = () => {
//         const myHeaders = new Headers();
//         myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j")

//         const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
//         const requestOptions = {
//             method: "GET",
//             headers: myHeaders,
//             redirect: "follow"
//         };
        
//         if (fromDateFormatted && shift) {
//             fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Shift=${shift}`,requestOptions)
//                 .then((response) => response.json())
//                 .then((result) => {
//                    // console.log(result)
//                     setData(result);
//                     setTotalbatches(result[6]?.Totalbatches || 0);
//                 })
//                 .catch((error) => console.error('Error fetching data:', error));
//         }
//     };

//     // Ensure the data is in the correct format for the BarChart
//     const xAxisData = data.filter(item => item.MeasureCompressionStrength !== undefined).map(item => item.MeasureCompressionStrength);
//     const seriesData = [
//         {
//             data: data.filter(item => item.PerOfCycle !== undefined).map(item => parseFloat(item.PerOfCycle)) // yAxis data (Percentage of Cycle)
//         }
//     ];

//     return (
//         <Box >


//           <Box sx={{ textAlign: 'center',display:"flex",
//                                   alignItems:'center',
//                                   justifyContent:'center', backgroundColor: '#B6B6B4',flex:1 ,height:"45px",}}>
//                           <Typography
//                               variant="h3"
//                               sx={{
//                                   fontWeight: 'bold',
//                                   fontSize: '20px',
//                                   textTransform: 'uppercase',
//                                   letterSpacing: '2px',
//                                   padding: '8px',
//                                   borderRadius: '8px',
                                  
//                                 }}
//                           >
//                             Compression Graph
//                           </Typography>
//                       </Box>
           
//             <Typography sx={{mt:3,}}>Criteria Selection</Typography>
//             <Select
//             size='small'
//                 value={criteria}
//                 onChange={(e) => setCriteria(e.target.value)}
//                 displayEmpty
//                 sx={{ width: 300, mt: 2}}
//             >
//                 <MenuItem value="Day">Day</MenuItem>
//                 <MenuItem value="Shift">Shift</MenuItem>
//             </Select>

            
//             <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
//                 {criteria === 'Day' && (
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker
//                             label="From Date"
//                             value={fromDate}
//                             onChange={(newValue) => setFromDate(newValue)}
//                                slotProps={{
//                     textField: { size: "small", },
//                   }}
//                             renderInput={(params) => <TextField {...params} />}
//                         />
//                         <DatePicker
//                             label="To Date"
//                             value={toDate}
//                             onChange={(newValue) => setToDate(newValue)}
//                                slotProps={{
//                     textField: { size: "small", },
//                   }}
//                             renderInput={(params) => <TextField {...params} />}
//                         />
//                     </LocalizationProvider>
//                 )}
//                 {criteria === 'Shift' && (
//                     <Box sx={{ display: 'flex', gap: '20px' }}>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 label="From Date"
//                                 value={fromDate}
//                                 onChange={(newValue) => setFromDate(newValue)}
//                                    slotProps={{
//                     textField: { size: "small", },
//                   }}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                         <Select
//                         size='small'
//                             value={shift}
//                             onChange={(e) => setShift(e.target.value)}
//                             displayEmpty
//                             sx={{ width: 300 }}
//                         >
//                             <MenuItem value="1">Shift 1</MenuItem>
//                             <MenuItem value="2">Shift 2</MenuItem>
//                             <MenuItem value="3">Shift 3</MenuItem>
//                             <MenuItem value="4">All</MenuItem>
//                         </Select>
//                     </Box>
//                 )}
//             </Box>

//             {/* Fetch Data Button */}
//             <Box sx={{ mt: 2 }}>
//                 {criteria === 'Day' && (
//                     <Button sx={{background:'#066e69'}} onClick={daycategory} variant="contained">Get Data</Button>
//                 )}
//                 {criteria === 'Shift' && (
//                     <Button sx={{background:'#066e69'}}  onClick={shiftCategory} variant="contained">Get Shift Data</Button>
//                 )}
//             </Box>

//             {/* Display Total Batches */}
//             <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
//                 <Typography>Total Batches:</Typography>
//                 <Typography>{totalbatches}</Typography>
//             </Box>

//             {/* Bar Chart */}
//             {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
//                 <BarChart
//                     xAxis={[{ scaleType: 'band', data: xAxisData, label: 'Compression Strength' }]}
//                     yAxis={[{ label: '% Of Cycle' }]}
//                     series={seriesData}
//                     width={1200}
//                     height={500}
//                     barLabel={({ value }) => valueFormatter(value)}
//                 />
//             )}
//         </Box>
//     );
// };

// export default Compression;


import { useState } from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button, } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';

const criteriaOptions = [
    { value: 'Day', label: 'Day' },
    { value: 'Shift', label: 'Shift' },
    // { value: 'period', label: 'period' }
    
];

const shiftOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: 'all' }
];

const valueFormatter = (value) => `${value}`;

const Compression = () => {

    const [criteria, setCriteria] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [day, setDay] = useState('');
    const [shift, setShift] = useState('');
    const [data, setData] = useState([]);
    const [totalbatches, setTotalbatches] = useState(0);

    const handleCriteriaChange = (event) => {
        setCriteria(event.target.value);
        clearFields();
    };

    const handleShiftChange = (event) => {
        setShift(event.target.value);
    };

    // const formatDate = (date) => {
    //     const d = new Date(date);
    //     return d.toISOString().split('T')[0];
    // };

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

    const fetchData1 = () => {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const fromDateFormatted = formatDate(fromDate);
        const toDateFormatted = formatDate(toDate);

        fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}&Day=1&Shift`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                setTotalbatches(result[6]?.Totalbatches || 0);
                clearFields();
            })
            .catch((error) => console.error('Error fetching data:', error));
    };




    const shiftCategory = () => {

        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const fromDateFormatted = formatDate(fromDate);
        // shift= shift.value;
        

        fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Todt=&Day=&Shift=${shift}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('result',result)
                setData(result);
                setTotalbatches(result[6]?.Totalbatches || 0);
                clearFields();
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const clearFields = () => {
        setFromDate(null);
        setToDate(null);
        setDay('');
        setShift('');
    };

    const xAxisData = data.map(item => item.MeasureCompressionStrength); // xAxis data
    const seriesData = [
        {
            data: data.map(item => item.PerOfCycle) // yAxis data
        }
    ];

    return (
        <>
            <Box sx={{ textAlign: 'center',display:"flex",
                        alignItems:'center',
                        justifyContent:'center', backgroundColor: '#B6B6B4',flex:1, height:"45px", }}>
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
                    Compression Graph
                </Typography>
            </Box>


            {/* <Box className='deviation-criteria' sx={{ mt: 2 ,display:'flex',alignItems:"center",gap:3}}>
                <Typography>Criteria Selection</Typography>
                <Select
                size='small'
                    id="criteria-selection"
                    value={criteria}
                    onChange={handleCriteriaChange}
                    displayEmpty
                    renderValue={(value) => value || <em>Select Criteria</em>}
                    sx={{ width: 300, mt: 2 }}
                >
                    {criteriaOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    {criteria === 'Day' && (
                        <Box sx={{ mt: 2, display: 'flex', gap: '20px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(newValue) => setFromDate(newValue)}
                                    slotProps={{
                                        textField: { size: "small", },
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DatePicker
                                    label="To Date"
                                    value={toDate}
                                    onChange={(newValue) => setToDate(newValue)}
                                    slotProps={{
                                        textField: { size: "small", },
                  }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    )}
                    {criteria === 'Shift' && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ mt: 2, display: 'flex', gap: '20px' }}>
                                <Box sx={{ mt: 2 }}>
                                    <DatePicker
                                        label="From Date"
                                        value={fromDate}
                                        onChange={(newValue) => setFromDate(newValue)}
                                        renderInput={(params) => <TextField {...params} sx={{ width: 250, mb: 2 }} />}
                                    />
                                </Box>
                                <Box >
                                    <Select
                                        id="shift-selection"
                                        value={shift}
                                        onChange={handleShiftChange}
                                        displayEmpty
                                        renderValue={(value) => value || <em>Select Shift</em>}
                                        sx={{ width: 300, mt: 2 }}
                                    >
                                        {shiftOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                        </LocalizationProvider>
                    )}
                    {criteria && (
                        <Box sx={{ mt: 2, display: 'flex', gap: '20px' }}>
                            {criteria === 'Day' && (
                                <Button sx={{ background: "#066e69" }} onClick={fetchData1} variant="contained">Get Data</Button>
                            )}
                            {criteria === 'Shift' && (
                                <Button sx={{ background: "#066e69" }} onClick={shiftCategory} variant="contained">Get Shift Data</Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box> */}

            <Box className='deviation-criteria' sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
  {/* First line: Criteria selection */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    <Typography>Criteria Selection</Typography>
    <Select
      size='small'
      id="criteria-selection"
      value={criteria}
      onChange={handleCriteriaChange}
      displayEmpty
      renderValue={(value) => value || <em>Select Criteria</em>}
      sx={{ width: 300 }}
    >
      {criteriaOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Box>

  {/* Second line: Other inputs and buttons */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    {criteria === 'Day' && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <Button sx={{ background: "#066e69" }} onClick={fetchData1} variant="contained">Get Data</Button>
        </Box>
      </LocalizationProvider>
    )}

    {criteria === 'Shift' && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <Select
          size='small'
            id="shift-selection"
            value={shift}
            onChange={handleShiftChange}
            displayEmpty
            renderValue={(value) => value || <em>Select Shift</em>}
            sx={{ width: 200 }}
          >
            {shiftOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Button sx={{ background: "#066e69" }} onClick={shiftCategory} variant="contained">Get Shift Data</Button>
        </Box>
      </LocalizationProvider>
    )}
  </Box>
</Box>

            <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                <Typography variant='h5' gutterBottom>Total Batches:</Typography>
                <Typography sx={{ fontWeight: 800 }} variant='h5' gutterBottom>{totalbatches}</Typography>
            </Box>
            <Box className='bar-chart' >
                <BarChart
                    xAxis={[{ scaleType: 'band', data: xAxisData, label: 'MeasureCompressionStrength' }]}
                    yAxis={[
                        {
                            label: '% Of Cycle ',
                        },
                    ]}
                    series={seriesData}

                    width={1200}
                    height={500}
                    barLabel={({ value }) => valueFormatter(value)}
                />

            </Box>
        </>
    );
};

export default Compression;
