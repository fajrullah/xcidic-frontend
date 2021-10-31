import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { getTimeslots, createReservations } from '../../helper/retrieveData'
const INITIAL = {
  form: {
    id: null,
    "timeslotID": null,
    "name": "string"
  },
  isLoading: true,
  index: null,
  isCreated: true,
  slots: []
} 
class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL
  }

  onCreateData = async () => {
    this.setLoading()
    const { id, ...rest } =  this.state.form
    await createReservations({
      ...rest
    }).then(result => {
      if(result.status === 201){
        this.setState({
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())
  }

  setLoading = () => this.setState({ isLoading: true })
  setFalseLoading = () => this.setState({ isLoading: false })

  onChange = (e) => {
    const data = this.state.form
    const name = e.target.name
    const value = e.target.value
    data[name] = value
    this.setState({
     form: {
       ...data
     }
    })
  }


  initial = async () => {

    await getTimeslots().then(result => {
      if(result.status === 200){
        this.setState({
          slots: result.data.result,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())

  }

  async componentDidMount(){
    this.initial()
  }

  setCancel = () => {
    this.initial()
    this.setState({
      isCreated: true,
      isLoading: false,
      form: {
        ...INITIAL.form
      }
    })
  }

  render(){
    const item = this.state.form
    const slots = this.state.slots
    return(
      <div>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>
              <h1>Reservations</h1>
              </TableCell>
            </TableRow>
        </TableHead>
         <TableBody>

          <TableRow>
            <TableCell>
              <InputLabel id="demo-multiple-name-label">Slots</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={item.timeslotID}
                  label="Slots"
                  name="timeslotID"
                  onChange={this.onChange}
                > 
                  {
                    slots.map(key => {
                      return (
                        <MenuItem key={key.id} value={key.id}>{key.mealPlanName} Price : {key.price}</MenuItem>
                      )
                    })
                  }
                  
                </Select>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <TextField
                  id="outlined-text-input"
                  label="Name"
                  type="text"
                  autoComplete="current-text"
                  name="name"
                  onChange={this.onChange}
                />
            </TableCell>
          </TableRow>

        </TableBody>
        <TableFooter>
          <TableRow>
          <TableCell>
            <h1>{ this.state.isLoading && 'Loading...' }</h1>
          <br></br>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="info" onClick={() => this.onCreateData()}>
              Create
            </Button>
          </Stack>
          </TableCell></TableRow>
        </TableFooter>
      </Table>
    </div>
    )
  }
}

export default Reservations