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
import { getBranches, createBranches, updateBranches, deleteBranches, searchBranches } from '../../helper/retrieveData'
const INITIAL = {
  form: {
    id: null,
    name: "",
    longitude: "",
    latitude: "",
    openingHours: ""
  },
  isLoading: true,
  index: null,
  isCreated: true,
  data:[]
} 
class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL
  }

  onCreateData = async () => {
    this.setLoading()
    const { id, ...rest } =  this.state.form
    await createBranches({
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
    await updateBranches({
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
    await deleteBranches({
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
      name,
      longitude,
      latitude,
      openingHours 
    } =  this.state.form
    const obj = {
      name,
      longitude,
      latitude,
      openingHours 
    }
    // eslint-disable-next-line array-callback-return
    Object.keys(obj).map((key) => {
      if(!obj[key] || obj[key]===""){
        delete obj[key]
      }
    })
    await searchBranches({...obj}).then(result => {
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
    return(
      <div>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>
              <h1>Branches</h1>
              </TableCell>
            </TableRow>
        </TableHead>
         <TableBody>

          <TableRow><TableCell>
            <TextField
              id="outlined-text-input"
              label="Name"
              type="text"
              autoComplete="current-text"
              name="name"
              onChange={this.onChange}
              value={item.name}
            />
          </TableCell></TableRow>

          <TableRow><TableCell>
           <TextField
              id="outlined-text-input"
              label="Latitude"
              type="text"
              autoComplete="current-text"
              name="latitude"
              onChange={this.onChange}
              value={item.latitude}
            />
          </TableCell></TableRow>

          <TableRow><TableCell>
           <TextField
              id="outlined-text-input"
              label="Longitude"
              type="text"
              autoComplete="current-text"
              name="longitude"
              onChange={this.onChange}
              value={item.longitude}
            />
          </TableCell></TableRow>

          <TableRow>
          <TableCell>
           <TextField
              id="outlined-text-input"
              type="time"
              autoComplete="current-text"
              name="openingHours"
              onChange={this.onChange}
              value={item.openingHours}
            />
          </TableCell></TableRow>

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
              Search
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
              <h1>List Branches</h1>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>longitude</TableCell>
            <TableCell>latitude</TableCell>
            <TableCell>openingHours</TableCell>
            <TableCell>Coordinate</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              data.map((key, index) => {
                return (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell>{key.longitude}</TableCell>
                    <TableCell>{key.latitude}</TableCell>
                    <TableCell>{key.openingHours}</TableCell>
                    <TableCell>{JSON.stringify(key.coordinate)}</TableCell>
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

export default Branches