import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SignOptions({ setSunSign }) {


  const handleChange = (event) => {
    setSunSign(event.target.value);
  };

  
  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 100 }} size="small" >
        <InputLabel id="demo-simple-select-autowidth-label" color='primary' >Sign</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Sign"
          onChange={handleChange}
          autoWidth
          defaultValue=""
        >
          <MenuItem value='Capricorn'>Capricorn</MenuItem>
          <MenuItem value='Aquarius'>Aquarius</MenuItem>
          <MenuItem value='Pisces'>Pisces</MenuItem>
          <MenuItem value='Aries'>Aries</MenuItem>
          <MenuItem value='Taurus'>Taurus</MenuItem>
          <MenuItem value='Gemini'>Gemini</MenuItem>
          <MenuItem value='Cancer'>Cancer</MenuItem>
          <MenuItem value='Leo'>Leo</MenuItem>
          <MenuItem value='Virgo'>Virgo</MenuItem>
          <MenuItem value='Libra'>Libra</MenuItem>
          <MenuItem value='Scorpio'>Scorpio</MenuItem>
          <MenuItem value='Sagittarius'>Sagittarius</MenuItem>
        </Select>
      </FormControl>
   </div>
  );
}