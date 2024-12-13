
import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import { PieChart, } from '@mui/x-charts/PieChart';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import kelsonslogo from '../imgs/Kelsons Logo.jpg';
import './dashboard.css';
import { useState, useEffect } from 'react';


const Dashboard = () => {
  //for pie chart
  //for todays data 
  const [todayTotalBatch, setTtodayTotalBatch] = useState(0);
  const [todayGoodBatch, setTtodayGoodBatch] = useState(0);
  const [todayBadBatch, setTtodayBadBatch] = useState(0);

  //for week
  const [weektotalbatch, setweektotalbatch] = useState(0);
  const [weekbadbatch, setweekbadbatch] = useState(0);
  const [weekGoodBatch, setweekGoodBatch] = useState(0);

  //for month
  const [monthtotalbatch, setmonthtotalbatch] = useState(0);
  const [monthbadbatch, setmonthbadbatch] = useState(0);
  const [monthGoodBatch, setmonthGoodBatch] = useState(0);

  const [cycleNo, setCycleNo] = useState(0);
  const [time, setTime] = useState(0)
  //for datepickerInput  2017-05-25
  const [selectedDate, setSelectedDate] = useState(dayjs());



  const handleDateChange = (newDate) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    setSelectedDate(newDate);
    console.log("selected date:", newDate);

    if (newDate) {
      const formattedDate = newDate.format('YYYY-MM-DD');
      fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/batchdata.php?date=${formattedDate}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Handle the data as needed
          datamap(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const [currentstatus, setCurrentStatus] = useState([]);
  const [actualcomp, setActualComp] = useState(0);
  const [targetcomp, setTargetcomp] = useState('0');
  const [compensatecomp, setCompensatecomp] = useState('0');
  const [santemp, setSandtemp] = useState('0');
  const [totalwater, setTotalwater] = useState('0');
  const [cycletime, setCycletemp] = useState('0');
  const [gcstarget, setGcstarget] = useState('0');
  const [gcsactual, setGcsactual] = useState('0');
  const [weekStart, setWeekStart] = useState('0');
  const [weekEnd, setWeekEnd] = useState('0');
  const [avgBatchTime, setAvgBatchTime] = useState('0');
  const [avgWater, setAvgWater] = useState(0);
  const [sandmaxtemp, setSandmaxTeamp] = useState(0);
  const [sandmintemp, setSandminTemp] = useState(0);

  const [weekavgbatchtime, setWeekavgbatchtime] = useState(0);
  const [weekavgWater, setWeekAvgWater] = useState(0);
  const [weeksandmaxtemp, setweekSandmaxTeamp] = useState(0);
  const [weeksandmintemp, setWeekSandminTemp] = useState(0);


  const [monthavgbatchtime, setMonthavgbatchtime] = useState(0);
  const [monthavgWater, setMonthAvgWater] = useState(0);
  const [monthsandmaxtemp, setMonthSandmaxTeamp] = useState(0);
  const [monthsandmintemp, setMonthSandminTemp] = useState(0);

  const handleStatusChange = async (date) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      const url = `https://weaveitapp.microtechsolutions.co.in/api/kelsons/currentstatus.php?todaydt=${formattedDate}`;

      const requestOptions = {
        method: 'GET',
        headers: {
          'x-api-key': '9a8b7c6d5e4f3g2h1i0j'
        }
      };

      try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const statusData = await response.json();
        // console.log(statusData, "statusData");
        setCurrentStatus(statusData);
        statusmap(statusData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


  useEffect(() => {
    // Check if selectedDate is not set or is today's date, then call handleStatusChange
    if (!selectedDate || selectedDate.isSame(dayjs(), 'day')) {
      handleStatusChange(dayjs());
    } else {
      handleStatusChange(selectedDate);
    }
    avgbatchdata1();
  }, [selectedDate]);


  const datamap = (data) => {
    // console.log('other function :', data);
    setTtodayTotalBatch(data[0].Total_Batch)
    setTtodayGoodBatch(data[0].Total_Batch - data[1].Bad_Batch)
    setTtodayBadBatch(data[1].Bad_Batch)
    setweektotalbatch(data[2].wk_ttl)
    setweekGoodBatch(data[2].wk_ttl - data[3].wk_bad)
    setweekbadbatch(data[3].wk_bad)
    setmonthtotalbatch(data[4].Mt_ttl)
    setmonthGoodBatch(data[4].Mt_ttl - data[5].Mt_bad)
    setmonthbadbatch(data[5].Mt_bad)
    setCycleNo(data[6].Cycle_no)
    setTime(data[6].Time)
    const weekStartDate = dayjs(data[2].WeekStart.date).format('DD-MM-YYYY');
    const weekEndDate = dayjs(data[2].WeekEnd.date).format('DD-MM-YYYY');
    setWeekStart(weekStartDate);
    setWeekEnd(weekEndDate);
  }
  const statusmap = (statusData) => {
    // console.log('status function:', statusData)
    setActualComp(statusData[0].C02)
    setTargetcomp(statusData[0].C03)
    setCompensatecomp(statusData[0].C04)
    setSandtemp(statusData[0].C12)
    setTotalwater(statusData[0].C14)

    setCycletemp(statusData[0].C15)
    setGcstarget(statusData[0].C16)
    setGcsactual(statusData[0].C17)

  }
  const todaydata = [
    { id: 0, value: todayGoodBatch },
    { id: 1, value: todayBadBatch },
  ];

  const dataWithPercentage = todaydata.map((item, index) => ({
    ...item,
    // label: `${((item.value / totalValue) * 100).toFixed(2)}%`,
    color: index === 0 ? '#18a298' : '#A70D2A'
  }));

  const weekdata = [

    { id: 0, value: weekGoodBatch },
    { id: 1, value: weekbadbatch },
  ];

  const weekdataWithPercentage = weekdata.map((item, index) => ({
    ...item,
    // label: `${((item.value / weektotalValue) * 100).toFixed(2)}%`,
    color: index === 0 ? '#18a298' : '#A70D2A'
  }));

  const monthdata = [

    { id: 0, value: monthGoodBatch },
    { id: 1, value: monthbadbatch },
  ];

  const monthdataWithPercentage = monthdata.map((item, index) => ({
    ...item,
    // label: `${((item.value / monthtotalValue) * 100).toFixed(2)}%`,
    color: index === 0 ? '#18a298' : '#A70D2A'
  }));


  const formattedDate = selectedDate.format('YYYY-MM-DD');
  const formattedMonth = selectedDate.format('MMMM YYYY');


  const avgbatchdata1 = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/batchavgdata.php?date=${formattedDate}`, requestOptions)
      .then((response) => response.json())
      .then((result) => avgbatchdatamap(result))
      .catch((error) => console.error(error));
  }

  const avgbatchdatamap = (data) => {
    // console.log("avgbatchdatamap called ", data)
    setAvgBatchTime(data[0].avg_batch_time)
    setAvgWater(data[1].avg_water)
    setSandminTemp(data[2].sand_min_temp)
    setSandmaxTeamp(data[2].sand_max_temp)

    setWeekavgbatchtime(data[3].wk_avg_batch_time)
    setWeekAvgWater(data[4].wk_avg_water)
    setweekSandmaxTeamp(data[5].wk_sand_max_temp)
    setWeekSandminTemp(data[5].wk_sand_min_temp)

    setMonthavgbatchtime(data[6].mt_avg_batch_time)
    setMonthAvgWater(data[7].mt_avg_water)
    setMonthSandmaxTeamp(data[8].mt_sand_max_temp)
    setMonthSandminTemp(data[8].mt_sand_min_temp)

  }


  return (
    <Box className='dashboardcontainer'>
      <Box className='maindash'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
          <Box sx={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{
            display: 'flex',

            alignItems: 'center',

            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <Typography variant='h5' gutterBottom>Cycle No :</Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant='h5' gutterBottom>{cycleNo}</Typography>

            <Typography variant='h5' gutterBottom>Time :</Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant='h5' gutterBottom>{time}</Typography>

          </Box>

          <Box>
            <img src={kelsonslogo} alt="" style={{ width: "250px", height: "50px", }} />

          </Box>
        </Box>
        <Divider sx={{ mt: 3 }} />

        

        <Box sx={{display:'flex'}}>
          <Box sx={{ textAlign: 'center',borderLeft:'1px solid #D4D4D4', borderRight: '1px solid  #D4D4D4',border:"1 px solid #D4D4D4 " ,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding:'15px', width:'35%'}}>
            <Box sx={{ margin: '10px', }}>
              <Typography sx={{ fontWeight: '600' }} variant='h6'>Today
                <Box>
                  <Typography variant='h6'> {formattedDate}</Typography>
                </Box>
              </Typography>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

              <PieChart
                series={[
                  {
                    data: dataWithPercentage,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    label: { visible: true, content: item => item.data.label }
                  },
                ]}
                height={250}
                width={250}

              />

              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Box><Typography variant='h8'>Avg Batch Time</Typography></Box>
                <Box><Typography variant='h8'><strong>{avgBatchTime}</strong></Typography></Box>
                <Box><Typography variant='h8'>Avg Water: </Typography></Box>
                <Box><Typography variant='h8'><strong>{(avgWater ?? 0).toFixed(1)}</strong></Typography></Box>
                <Box><Typography variant='h8'>Sand Temp</Typography></Box>
                <Box><Typography variant='h8'>Min :<strong>{(sandmintemp ?? 0).toFixed(1)}</strong> </Typography></Box>
                <Box> <Typography variant='h8'>Max :<strong>{(sandmaxtemp ?? 0).toFixed(1)} </strong> </Typography></Box>

              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%',  margin: '10px',  boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;' }} className='status'>
              <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%' }}>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Total batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{todayTotalBatch}</Typography>

                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Good batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{todayGoodBatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Bad batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{todayBadBatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Good batch %: </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="h6">
                    {todayTotalBatch > 0 ? ((todayGoodBatch / todayTotalBatch) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* week piechart */}
          <Box sx={{ textAlign: 'center', borderRight: '1px solid  #D4D4D4', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding:'15px', width:'35%'}}>
          <Box sx={{ margin: '10px' }}>
                <Typography sx={{ fontWeight: '600' }} variant='h6'>This Week </Typography>

                <Box><Typography variant='h6'>{weekStart} - {weekEnd} </Typography></Box>
              </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

              <PieChart
                series={[
                  {
                    data: weekdataWithPercentage,

                    highlightScope: { faded: 'series', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    label: { visible: true, content: item => item.data.label }
                  },
                ]}
                height={250}
                width={250}

              />

              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
              <Box><Typography variant='h8'>Avg Batch Time:</Typography></Box>
                  <Box><Typography variant='h8'><strong>{weekavgbatchtime} </strong> </Typography></Box>
                  <Box><Typography variant='h8'>Avg Water</Typography></Box>
                  <Box><Typography variant='h8'><strong>{(weekavgWater ?? 0).toFixed(1)}</strong></Typography></Box>
                  <Box><Typography variant='h8'>Sand Temp</Typography></Box>
                  <Box><Typography variant='h8'>Min : <strong>{(weeksandmintemp ?? 0).toFixed(1)}</strong></Typography></Box>
                  <Box> <Typography variant='h8'>Max :<strong>{(weeksandmaxtemp ?? 0).toFixed(1)}</strong> </Typography></Box>

              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%',  margin: '10px',  boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;' }} className='status'>
              <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%' }}>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Total batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{weektotalbatch}</Typography>

                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Good batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{weekGoodBatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Bad batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{weekbadbatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                    <Typography>Good batch %: </Typography>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      {weektotalbatch > 0 ? ((weekGoodBatch / weektotalbatch) * 100).toFixed(1) : 0}%
                    </Typography>
                  </Box>
              </Box>
            </Box>
          </Box>
          {/* Month piechart */}
          <Box sx={{ textAlign: 'center', borderRight: '1px solid  #D4D4D4', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',padding:'15px', width:'35%'}}>
            <Box sx={{ margin: '10px', }}>
              <Typography sx={{ fontWeight: '600' }} variant='h6'>This Month
                <Box>
                  <Typography variant='h6'> {formattedMonth}</Typography>
                </Box>
              </Typography>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

              <PieChart
                series={[
                  {
                    data: monthdataWithPercentage,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      label: { visible: true, content: item => item.data.label }
                  },
                ]}
                height={250}
                width={250}

              />

              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
              <Box><Typography variant='h8'>Avg Batch Time</Typography></Box>
                  <Box><Typography variant='h8'><strong>{monthavgbatchtime}</strong></Typography></Box>
                  <Box><Typography variant='h8'>Avg Water</Typography></Box>
                  <Box><Typography variant='h8'><strong>{(monthavgWater ?? 0).toFixed(1)}</strong></Typography></Box>
                  <Box><Typography variant='h8'>Sand temp</Typography></Box>
                  <Box> <Typography variant='h8'>Max:<strong>{(monthsandmaxtemp ?? 0).toFixed(1)}</strong></Typography></Box>
                  <Box><Typography variant='h8'>Min:<strong>{(monthsandmintemp ?? 0).toFixed(1)}</strong> </Typography></Box>

              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%',  margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;' }} className='status'>
              <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%' }}>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Total batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{monthtotalbatch}</Typography>

                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Good batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{monthGoodBatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Bad batch: </Typography>
                  <Typography sx={{ fontWeight: 600, }} variant='h6'>{monthbadbatch}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography>Good batch %: </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="h6">
                      {monthtotalbatch > 0 ? ((monthGoodBatch / monthtotalbatch) * 100).toFixed(1) : 0}%
                    </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
        </Box>


        <Divider />
        <Box>
          <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant='h6' > Current Status</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%", ml: 2, margin: '10px', mr: 4, boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;', background: '#e0f0f1' }} className='cards'>
          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3, mb: 3 }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
                Actual Compact
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 2 }} variant='h6'>
                <strong>{actualcomp}</strong>  %
              </Typography>
            </CardContent>
          </Card>


          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
              <Typography variant="h7" fontWeight={'bold'} color="text.secondary">
                Target Compact
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 2 }} variant='h6'>
                <strong>{parseFloat(targetcomp).toFixed(2)}</strong> %
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
                Compenset Compact
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 2 }} variant='h6'>
                <strong>{parseFloat(compensatecomp).toFixed(2)}</strong> %


              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
                Sand Temp
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 5 }} variant='h6'>

                <strong>{parseFloat(santemp).toFixed(2)}</strong>   °C

              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
            <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
               Total water
              </Typography>
              <Typography sx={{ fontWeight: 500, mt:5}} variant='h6'>
                <strong>{parseFloat(totalwater).toFixed(2)}</strong> ltr

              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
                Cycle Time
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 5 }} variant='h6'>
                <strong>{cycletime}</strong> sec
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3 }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary">
                GCS Target
              </Typography>
              <Typography sx={{ fontWeight: 500, mt: 5 }} variant='h6'>
                <strong>{gcstarget}</strong> gm/cm²

              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ml: 2, margin: '10px', width: '150px', height: '130px', mt: 3, }}>
            <CardContent>
              <Typography variant='h7' fontWeight={'bold'} color="text.secondary" >
                GCS Actual
              </Typography>

              <Typography sx={{ fontWeight: 500, mt: 5 }} variant='h6' >
                <strong>{gcsactual}</strong> gm/cm²

              </Typography>

            </CardContent>
          </Card>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;


