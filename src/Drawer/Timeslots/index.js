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
import { getBranches, getTimeslots, createTimeslots, updateTimeslots, deleteTimeslots, searchTimeslots } from '../../helper/retrieveData'
const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const INITIAL = {
  form: {
    id: null,
    branchID: 0,
    mealPlanName: "string",
    capacity: 15,
    day: "Monday",
    price: 0,
    startTime: "00:00:00",
    endTime: "00:00:00"
  },
  isLoading: true,
  index: null,
  isCreated: true,
  branches:[],
  data:[]
} 
class Timeslots extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL
  }

  onCreateData = async () => {
    this.setLoading()
    const { id, ...rest } =  this.state.form
    await createTimeslots({
      ...rest
    }).then(result => {
      if(result.status === 201){
        const { data } = this.state
        const response = result.data.result
        data.unshift({ ...response })
        this.setState({
          data,
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

  selectItem = (data, index) => {
    this.setLoading()
    this.setState({
      form: {
        ...data
      },
      index,
      isCreated: false,
      isLoading: false
    })
  }

  updateData = async () => {
    this.setLoading()
    await updateTimeslots({
      ...this.state.form
    }).then(result => {
      if(result.status === 200){
        const { data } = this.state
        const [,response] = result.data.result
        data[this.state.index] = response
        this.setState({
          data,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())
  }

  deleteData = async () => {
    this.setLoading()
    await deleteTimeslots({
      ...this.state.form,
      isSafeDelete: true
    }).then(result => {
      if(result.status === 200){
        const { data } = this.state
        data.splice(this.state.index, 1);
        this.setState({
          data,
          isCreated: true,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())
  }

  searchData = async () => {
    this.setLoading()
    const {   
      mealPlanName,
      price,
      startTime,
      endTime
    } =  this.state.form
    const obj = {
      mealPlanName,
      price,
      startTime,
      endTime
    }
    // eslint-disable-next-line array-callback-return
    Object.keys(obj).map((key) => {
      if(!obj[key] || obj[key]===""){
        delete obj[key]
      }
    })
    await searchTimeslots({...obj}).then(result => {
      if(result.status === 200){
        this.setState({
          data: result.data.result,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())
  }

  initial = async () => {
    await getBranches().then(result => {
      if(result.status === 200){
        this.setState({
          branches: result.data.result,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())

    await getTimeslots().then(result => {
      if(result.status === 200){
        this.setState({
          data: result.data.result,
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
    const data = this.state.data
    const branches = this.state.branches
    return(
      <div>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>
              <h1>Timeslots</h1>
              </TableCell>
            </TableRow>
        </TableHead>
         <TableBody>

         <TableRow>
            <TableCell>
              <InputLabel id="demo-multiple-name-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={item.branchID}
                  label="Branch"
                  name="branchID"
                  onChange={this.onChange}
                > 
                  {
                    branches.map(key => {
                      return (
                        <MenuItem key={key.id} value={key.id}>{key.name} {key.openingHours}</MenuItem>
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
                label="Meal Plan Name"
                type="text"
                autoComplete="current-text"
                name="mealPlanName"
                onChange={this.onChange}
                value={item.mealPlanName}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <TextField
                id="outlined-text-input"
                label="Capacity"
                type="number"
                autoComplete="current-text"
                name="capacity"
                onChange={this.onChange}
                value={item.capacity}
              />
            </TableCell>
          </TableRow>


          <TableRow>
            <TableCell>
              <Select
                name="day"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={item.day}
                onChange={this.onChange}
              >
                {day.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <TextField
                  id="outlined-text-input"
                  label="Price"
                  type="number"
                  autoComplete="current-text"
                  name="price"
                  onChange={this.onChange}
                  value={item.price}
                />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <InputLabel id="demo-multiple-name-label">Start Time</InputLabel>
              <TextField
                id="outlined-text-input"
                type="time"
                autoComplete="current-text"
                name="startTime"
                onChange={this.onChange}
                value={item.startTime}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <InputLabel id="demo-multiple-name-label">End Time</InputLabel>
              <TextField
                id="outlined-text-input"
                type="time"
                autoComplete="current-text"
                name="endTime"
                onChange={this.onChange}
                value={item.endTime}
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
            <Button variant="contained" color="warning" disabled={this.state.isCreated} onClick={() => this.updateData()}>
              Update
            </Button>
            <Button variant="contained" color="error" disabled={this.state.isCreated} onClick={() => this.deleteData()}>
              Delete
            </Button>
            <Button onClick={() => this.searchData()}>
              Filter
            </Button>
            <Button variant="outlined" color="primary" onClick={() => this.setCancel()}>
              Clear
            </Button>
          </Stack>
          </TableCell></TableRow>
        </TableFooter>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h1>List Timeslots</h1>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Meal Plan Name</TableCell>
            <TableCell>BranchID</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              data.map((key, index) => {
                return (
                  <TableRow key={key.id}>
                    <TableCell>{key.mealPlanName}</TableCell>
                    <TableCell>{key.branchID}</TableCell>
                    <TableCell>{key.capacity}</TableCell>
                    <TableCell>{key.day}</TableCell>
                    <TableCell>{key.price}</TableCell>
                    <TableCell>{key.startTime}</TableCell>
                    <TableCell>{key.endTime}</TableCell>
                    <TableCell><Button onClick={() => this.selectItem(key, index)}> SELECT </Button></TableCell>
                  </TableRow>
                )
              })
            }
          
        </TableBody>
      </Table>
    </div>
    )
  }
}

export default Timeslots