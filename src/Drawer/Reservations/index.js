import * as React from 'react';
import TextField from '@mui/material/TextField';
export default function Branches() {

  return (
    <div>
      <table>
        <tbody>
          <tr>
           <TextField
              id="outlined-text-input"
              label="Name"
              type="text"
              autoComplete="current-text"
            />
          </tr>
          <tr>
           <TextField
              id="outlined-text-input"
              label="Latitude"
              type="text"
              autoComplete="current-text"
            />
          </tr>
          <tr>
           <TextField
              id="outlined-text-input"
              label="Longitude"
              type="text"
              autoComplete="current-text"
            />
          </tr>
          <tr>
           <TextField
              id="outlined-text-input"
              label="Opening Hours"
              type="text"
              autoComplete="current-text"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}