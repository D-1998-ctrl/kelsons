
// import  { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LineChart } from '@mui/x-charts/LineChart';

// const TempVariation = () => {
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         if (data.length > 0) {
//             console.log('API Data:', data);
//         }
//     }, [data]);

//     const fetchData = () => {
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
//             fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}`, requestOptions)
//                 .then((response) => response.json())
//                 .then((result) => {
//                     console.log("result",result)
//                     setData(result);
//                 })
//                 .catch((error) => console.error('Error fetching data:', error));
//         }
//     };

//     // Align xAxisData and seriesData
//     const alignedData = data.filter(
//         (item) => item.CyclNo !== null && item.Temp !== undefined
//     );
//     const xAxisData = alignedData.map((item) => item.CyclNo);
//     const seriesData = [
//         {
//             data: alignedData.map((item) => parseFloat(item.Temp)),
//             label: 'Temperature',
//             color: '#02b2af',
//             markers: false,
//         }
//     ];

//     return (
//         <Box>

//             <Box sx={{
//                 textAlign: 'center', display: "flex",
//                 alignItems: 'center',
//                 justifyContent: 'center', backgroundColor: '#B6B6B4', flex: 1, height: "45px",

//             }}>
//                 <Typography
//                     variant="h3"
//                     sx={{
//                         fontWeight: 'bold',
//                         fontSize: '20px',
//                         textTransform: 'uppercase',
//                         letterSpacing: '2px',
//                         padding: '8px',
//                         borderRadius: '8px',                    }}
//                 >
//                     Temperature Variation
//                 </Typography>
//             </Box>

//             <Box sx={{ mt: 4 }}>
//                 <Box sx={{ display: 'flex', gap: '20px' }}>
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
//                 </Box>

//                 <Box sx={{ mt: 2 }}>
//                     <Button
//                         sx={{ background: '#066e69' }}
//                         onClick={fetchData}
//                         variant="contained"
//                     >
//                         Get Data
//                     </Button>
//                 </Box>

//                 {/* Line Chart */}
//                 {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
//                     <LineChart
//                         xAxis={[
//                             { scaleType: 'band', data: xAxisData, label: 'Cycle No' },
//                         ]}
//                         yAxis={[{ label: 'Temperature (°C)' }]}
//                         // yAxis={[{ label: 'Temperature (°C)',min:50 }]}
//                         series={seriesData}
//                         width={1200}
//                         height={500}
//                     />
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default TempVariation;



import { useState,useEffect  } from 'react';
import {
    Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LineChart } from '@mui/x-charts/LineChart';

const TempVariation = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [data, setData] = useState([]);
    const [cycleList, setCycleList] = useState([]);

    const [cycleFrom, setCycleFrom] = useState('');
    const [cycleTo, setCycleTo] = useState('');

    

const fetchData=()=>{
const myHeaders = new Headers();
myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

  if (!cycleFrom || !cycleTo) {
    alert("Please select both Cycle From and Cycle To values.");
    return;
  }


const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
const toDateFormatted = toDate?.format('YYYY-MM-DD');

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://weaveitapp.microtechsolutions.net.in/api/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}&CycleFrom=${cycleFrom}&CycleTo=${cycleTo}`, requestOptions)
  .then((response) => response.json())
    .then((result) => {
        // console.log("result", result)
        setData(result);
    })

  .catch((error) => console.error(error));
}

const fetchCycleData = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
    const toDateFormatted = toDate?.format('YYYY-MM-DD');

    if (fromDateFormatted && toDateFormatted) {
        const url = `https://weaveitapp.microtechsolutions.net.in/api/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}`;
        fetch(url, { method: "GET", headers: myHeaders })
            .then((res) => res.json())
            .then((result) => {
                const uniqueCycles = [];
                const seen = new Set();
                for (let item of result) {
                    const key = `${item.CycleFrom}-${item.CycleTo}`;
                    if (item.CycleFrom && item.CycleTo && !seen.has(key)) {
                        seen.add(key);
                        uniqueCycles.push({ from: item.CycleFrom, to: item.CycleTo });
                    }
                }
                setCycleList(uniqueCycles);
            })
            .catch((err) => console.error('Error fetching cycles:', err));
    }
};

// Add useEffect to trigger cycle loading when dates change
useEffect(() => {
    if (fromDate && toDate) {
        fetchCycleData();
    }
}, [fromDate, toDate]);
    // const fetchCycleData = () => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    //     const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
    //     const toDateFormatted = toDate?.format('YYYY-MM-DD');

    //     if (fromDateFormatted && toDateFormatted) {
    //         const url = `https://weaveitapp.microtechsolutions.net.in/api/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}`;
    //         fetch(url, { method: "GET", headers: myHeaders })
    //             .then((res) => res.json())
    //             .then((result) => {
    //                 const uniqueCycles = [];
    //                 const seen = new Set();
    //                 for (let item of result) {
    //                     const key = `${item.CycleFrom}-${item.CycleTo}`;
    //                     if (item.CycleFrom && item.CycleTo && !seen.has(key)) {
    //                         seen.add(key);
    //                         uniqueCycles.push({ from: item.CycleFrom, to: item.CycleTo });
    //                     }
    //                 }
    //                 setCycleList(uniqueCycles);
    //             })
    //             .catch((err) => console.error('Error fetching cycles:', err));
    //     }
    // };

    const alignedData = data.filter(
        (item) => item.Cycle !== null && item.Temp !== undefined
    );
    const xAxisData = alignedData.map((item) => item.Cycle);
    const seriesData = [
        {
            data: alignedData.map((item) => parseFloat(item.Temp)),
            label: 'Temperature',
            color: '#02b2af',
             showMark: false,
            // markers: true,
        }
    ];

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    textAlign: 'center', display: "flex", alignItems: 'center',
                    justifyContent: 'center', backgroundColor: '#B6B6B4',
                    flex: 1, height: "45px",
                }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold', fontSize: '20px', textTransform: 'uppercase',
                        letterSpacing: '2px', padding: '8px', borderRadius: '8px',
                    }}>
                    Temperature Variation
                </Typography>
            </Box>

            {/* Date Pickers */}
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </LocalizationProvider>

            
                </Box>

                {/* Cycle Dropdown */}
                {fromDate && toDate && cycleList.length > 0 && (

                    <FormControl sx={{ minWidth: 200, mt: 2 }} size="small">
                        <InputLabel>Cycle Range</InputLabel>
                        <Select
                            value={`${cycleFrom}-${cycleTo}`}
                            label="Cycle Range"
                            onChange={(e) => {
                                const [from, to] = e.target.value.split('-');
                                setCycleFrom(from.trim());
                                setCycleTo(to.trim());
                            }}
                        >
                            {cycleList.map((cycle, index) => (
                                <MenuItem key={index} value={`${cycle.from}-${cycle.to}`}>
                                    {`${cycle.from} - ${cycle.to}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                )}

                {/* Get Data Button */}
                <Box sx={{ mt: 2 }}>
                    <Button
                        sx={{ background: '#066e69' }}
                        onClick={fetchData}
                        variant="contained"
                    >
                        Get Data
                    </Button>
                </Box>

                {/* Line Chart */}
                {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
                    <LineChart
                        xAxis={[
                            { scaleType: 'band', data: xAxisData, label: 'Cycle No' },
                        ]}
                        yAxis={[{ label: 'Temperature (°C)' }]}
                        series={seriesData}
                        width={1200}
                        height={500}
                    />
                )}
            </Box>
        </Box>
    );
};

export default TempVariation;



















