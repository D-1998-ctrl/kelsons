
import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BarChart } from '@mui/x-charts/BarChart';

const Compression = () => {
    const [criteria, setCriteria] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [shift, setShift] = useState('');
    const [data, setData] = useState([]);
    const [totalbatches, setTotalbatches] = useState(0);

    const valueFormatter = (value) => `${value}%`;

    useEffect(() => {
        // Log the data to ensure it is correctly received
        // console.log("Data: ", data);
    }, [data]);

    const daycategory = () => {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

        const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
        const toDateFormatted = toDate?.format('YYYY-MM-DD');
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
    
        if (fromDateFormatted && toDateFormatted) {
            fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Todt=${toDateFormatted}&Day=1`,requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setData(result);
                    setTotalbatches(result[6]?.Totalbatches || 0);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    };

    const shiftCategory = () => {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j")

        const fromDateFormatted = fromDate?.format('YYYY-MM-DD');
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        
        if (fromDateFormatted && shift) {
            fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/deviationgraph.php?Fromdt=${fromDateFormatted}&Shift=${shift}`,requestOptions)
                .then((response) => response.json())
                .then((result) => {
                   // console.log(result)
                    setData(result);
                    setTotalbatches(result[6]?.Totalbatches || 0);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    };

    // Ensure the data is in the correct format for the BarChart
    const xAxisData = data.filter(item => item.MeasureCompressionStrength !== undefined).map(item => item.MeasureCompressionStrength);
    const seriesData = [
        {
            data: data.filter(item => item.PerOfCycle !== undefined).map(item => parseFloat(item.PerOfCycle)) // yAxis data (Percentage of Cycle)
        }
    ];

    return (
        <Box >


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
                    Compression Graph
                </Typography>
            </Box>
           
            <Typography sx={{mt:3}}>Criteria Selection</Typography>
            <Select
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                displayEmpty
                sx={{ width: 300, mt: 2}}
            >
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Shift">Shift</MenuItem>
            </Select>

            
            <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                {criteria === 'Day' && (
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
                )}
                {criteria === 'Shift' && (
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Select
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                            displayEmpty
                            sx={{ width: 300 }}
                        >
                            <MenuItem value="1">Shift 1</MenuItem>
                            <MenuItem value="2">Shift 2</MenuItem>
                            <MenuItem value="3">Shift 3</MenuItem>
                            <MenuItem value="4">All</MenuItem>
                        </Select>
                    </Box>
                )}
            </Box>

            {/* Fetch Data Button */}
            <Box sx={{ mt: 2 }}>
                {criteria === 'Day' && (
                    <Button sx={{background:'#066e69'}} onClick={daycategory} variant="contained">Get Data</Button>
                )}
                {criteria === 'Shift' && (
                    <Button sx={{background:'#066e69'}}  onClick={shiftCategory} variant="contained">Get Shift Data</Button>
                )}
            </Box>

            {/* Display Total Batches */}
            <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                <Typography>Total Batches:</Typography>
                <Typography>{totalbatches}</Typography>
            </Box>

            {/* Bar Chart */}
            {xAxisData.length > 0 && seriesData[0].data.length > 0 && (
                <BarChart
                    xAxis={[{ scaleType: 'band', data: xAxisData, label: 'Compression Strength' }]}
                    yAxis={[{ label: '% Of Cycle' }]}
                    series={seriesData}
                    width={1200}
                    height={500}
                    barLabel={({ value }) => valueFormatter(value)}
                />
            )}
        </Box>
    );
};

export default Compression;
