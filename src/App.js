import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import data from './utils/data'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function App() {
  const [displayData, setDisplayData] = React.useState([]);
  const [squareMeters, setSquareMeters] = React.useState();
  const [result, setResult] = React.useState(0);


  const handleChangeDisplay = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setDisplayData(
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleChangeMeters = (event) => {
    const {target: {value} } = event;
    setSquareMeters(value);
  }

  const handleCount = () => {
    setResult(displayData.length ? displayData.map(item => item.value).reduce((item, accum) => item + accum) * squareMeters : 0) 
  }

  return (
    <div className="App">
      <header className="App-header">
      <Item sx = {{width: '60%'}}>
         <Grid container spacing={2}>
          <FormControl sx={{ m: 3, width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">
             Характеристика
            </InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={displayData}
            onChange={handleChangeDisplay}
            input={<OutlinedInput label="Характеристика" />}
            renderValue={(selected) => selected.map(item => item.name).join(', ')}
            MenuProps={MenuProps}
            >
            {data.map((item) => (
              <MenuItem key={item.id} value={item}>
                <Checkbox checked={displayData.indexOf(item) > -1} />
                <ListItemText primary={item.name} secondary={item.subname} />
              </MenuItem>
            ))} 
            </Select>
          </FormControl>
          <Grid item xs={5} alignSelf=''>
            <TextField
            id="outlined-number"
            label="Метры кв."
            type="number"
            onChange={(event) => handleChangeMeters(event)}
            value={squareMeters}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{width: '100%', m:1}}
            />
          </ Grid>
          <Grid item xs={4} alignSelf='center'>
            <Button
            variant='outlined'
            onClick={() => console.log(handleCount())}
            sx={{width: '80%', height: '56px'}}
            >
            Посчитать сумму
            </Button>
          </ Grid>  
          <Grid item xs={2} alignSelf='center'>
          result: {result}
          </Grid>
        </Grid>
      </Item>
          
      </header>
    </div>
  );
}

export default App;
