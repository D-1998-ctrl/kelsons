
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BarChart } from '@mui/x-charts/BarChart';

const TempVariation = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [data, setData] = useState([]);

    
    useEffect(() => {
        if (data.length > 0) {
            console.log('API Data:', data);
        }
    }, [data]);

    const fetchData = () => {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");
        const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
        const toDateFormatted = toDate?.format('YYYY-MM-DD');
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          }
        if (fromDateFormatted && toDateFormatted) {
            fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}`,requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setData(result);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    };

    const xAxisData = data.filter(item => item.CyclNo !== null).map(item => item.CyclNo);
    const seriesData = [
        {
            data: data.filter(item => item.Temp !== undefined).map(item => parseFloat(item.Temp)) // yAxis data (Temperature)
        }
    ];

    return (
        <Box>
            


            <Box sx={{ textAlign: 'center', }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        padding: '8px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#d4fdfb',
                    }}
                >
                     Temprature Variation
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button sx={{background:'#066e69'}} onClick={fetchData} variant="contained">Get Data</Button>
                </Box>

                {/* Bar Chart */}
                {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: xAxisData, label: 'Cycle No' }]}
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


























// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { BarChart } from '@mui/x-charts/BarChart';

// const TempVariation = () => {
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [data, setData] = useState([]);

//     const fetchData = () => {
//         const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
//         const toDateFormatted = toDate?.format('YYYY-MM-DD');

//         if (fromDateFormatted && toDateFormatted) {
//             fetch(`https://textileapp.microtechsolutions.co.in/file/kelsons/tempvargraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}`)
//                 .then((response) => response.json())
//                 .then((result) => {
//                     setData(result);
//                 })
//                 .catch((error) => console.error('Error fetching data:', error));
//         }
//     };

//     const xAxisData = data.filter(item => item.CyclNo !== null).map(item => item.CyclNo);
//     const seriesData = [
//         {
//             data: data.filter(item => item.Temp !== undefined).map(item => parseFloat(item.Temp)) // yAxis data (Temperature)
//         }
//     ];

//     return (

//         <Box> 
//         <Box sx={{ mt: 2 }}>
           
//             <Box sx={{ display: 'flex', gap: '20px' }}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                         label="From Date"
//                         value={fromDate}
//                         onChange={(newValue) => setFromDate(newValue)}
//                         renderInput={(params) => <TextField {...params} />}
//                     />
//                     <DatePicker
//                         label="To Date"
//                         value={toDate}
//                         onChange={(newValue) => setToDate(newValue)}
//                         renderInput={(params) => <TextField {...params} />}
//                     />
//                 </LocalizationProvider>
//             </Box>

            
//             <Box sx={{ mt: 2 }}>
//                 <Button onClick={fetchData} variant="contained">Get Data</Button>
//             </Box>

//             {/* Bar Chart */}
//             {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
//                 <BarChart
//                     xAxis={[{ scaleType: 'band', data: xAxisData, label: 'Cycle No' }]}
//                     yAxis={[{ label: 'Temperature (°C)' }]}
//                     series={seriesData}
//                     width={1200}
//                     height={500}
//                 />
//             )}
//         </Box>
//         </Box>
//     );
// };

// export default TempVariation;
