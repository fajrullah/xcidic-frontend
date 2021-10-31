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
import InputLabel from '@mui/material/InputLabel';
import { searchDetails } from '../../helper/retrieveData'
const INITIAL = {
  form: {
    name: "",
    longitude: "39.807255",
    latitude: "-76.984722",
    km: "10",
    createdAt: "",
    price: ""
  },
  isLoading: true,
  index: null,
  isCreated: true,
  data:[]
} 
const Day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL
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


  searchData = async () => {
    this.setLoading()
    const {   
      name,
      longitude,
      latitude,
      km,
      createdAt,
      price
    } =  this.state.form
    const obj = {
      name,
      longitude,
      latitude,
      km,
      createdAt,
      price
    }
    // eslint-disable-next-line array-callback-return
    Object.keys(obj).map((key) => {
      if(!obj[key] || obj[key]===""){
        delete obj[key]
      }
    })
    await searchDetails({...obj}).then(result => {
      if(result.status === 200){
        this.setState({
          data: result.data.result,
          isLoading: false
        })
      }
    }).catch(err => this.setFalseLoading())
  }

  initial = async () => {
    await searchDetails({}).then(result => {
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
              <h1>Search</h1>
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
              label="Latitude From"
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
              label="Longitude From"
              type="text"
              autoComplete="current-text"
              name="longitude"
              onChange={this.onChange}
              value={item.longitude}
            />
          </TableCell></TableRow>

          <TableRow><TableCell>
           <TextField
              id="outlined-text-input"
              label="Price"
              type="number"
              autoComplete="current-text"
              name="price"
              onChange={this.onChange}
              value={item.price}
            />
          </TableCell></TableRow>

          <TableRow><TableCell>
           <TextField
              id="outlined-text-input"
              label="KM"
              type="number"
              autoComplete="current-text"
              name="km"
              onChange={this.onChange}
              value={item.km}
            />
          </TableCell></TableRow>

          <TableRow>
            <TableCell>
            <InputLabel id="demo-multiple-name-label">CreatedAt</InputLabel>
            <TextField
                id="outlined-text-input"
                type="date"
                autoComplete="current-text"
                name="createdAt"
                onChange={this.onChange}
                value={item.createdAt}
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
            <Button variant="outlined" color="secondary" onClick={() => this.searchData()}>
              Filter / Search
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
              <h1>List</h1>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Opening Hours</TableCell>
            <TableCell>longitude</TableCell>
            <TableCell>latitude</TableCell>
            <TableCell>Km</TableCell>
            <TableCell>Sessions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              data.map((key, index) => {
                const branchesTimeslots = key.branchesTimeslots
                return (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell>{key.openingHours}</TableCell>
                    <TableCell>{key.longitude}</TableCell>
                    <TableCell>{key.latitude}</TableCell>
                    <TableCell>{key.distance}</TableCell>
                    <TableCell>
                      <Table>
                          <TableHead>
                            <TableRow>
                            {
                              Day.map((keyDay,i) => {
                                return (<TableCell key={`${keyDay + i + key.id}`}>{keyDay}</TableCell>)
                              })
                            }
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                            {
                              Day.map((keyDay,i) => {
                                return (<TableCell key={`${keyDay + i + key.id}`}><Table>{
                                 
                                  // eslint-disable-next-line array-callback-return
                                  branchesTimeslots.map((keyComponents, iComponents) => {
                                    if(keyDay === keyComponents.day){
                                      let price = keyComponents.price
                                      let isOnDemand = ''
                                      const ondemands = keyComponents.ondemands
                                      if(ondemands){
                                        price = ondemands.price
                                        isOnDemand = 'HERE ON DEMAND'
                                      }
                                      return (
                                      <TableRow>
                                        <TableCell key={`${keyDay + i + key.id + keyComponents.id + iComponents}`}>
                                        Start: {keyComponents.startTime} <br />
                                        End: {keyComponents.endTime} <br />
                                        Meal Plan Name: {keyComponents.mealPlanName} <br />
                                        Price: {price} <strong>{ isOnDemand }</strong>
                                        </TableCell>
                                      </TableRow>)
                                    }
                                  })

                                }</Table></TableCell>)
                              })
                            }
                            </TableRow>
                          </TableBody>
                      </Table>
                    </TableCell>
                        
                        
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

export default Search