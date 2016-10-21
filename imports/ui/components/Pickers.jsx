import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'

import { insert } from '../../api/gathers/methods.js';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

import { Row, Col } from 'react-flexbox-grid';

import { red500, grey400 } from 'material-ui/styles/colors.js';


 
class Pickers extends Component {
  constructor(props) {
    super(props)
    this.state = { address: null, time: null, date: null }
    this.onChange = (address) => this.setState({ address })
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

  }
  
  handleFormSubmit(event) {
    event.preventDefault()
    const { address, time, date } = this.state

    this.saveGather()
  }

  saveGather() {
    const { address, time, date } = this.state

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) {
        console.log('Oh no!', err)
      }

      console.log(`Coordinates for ${address}`, { lat, lng })

      let dateMoment = moment(date)  
      let timeMoment = moment(time)  

      dateMoment.hour(timeMoment.hour())
      dateMoment.minute(timeMoment.minute())
      let start = dateMoment.toDate()

      console.log('Date is:', dateMoment.format("YYYY-MM-DD HH:mm Z"))
      console.log(`start is ${start}`)


      insert.call({
        name: null,
        start: start,
        duration: 1,
        type: "PUBLIC",
        place: address,
        invited: [],
        loc: { type: "Point", coordinates: [lat, lng] }
      }, (error) => {console.error(error)})

    })
  }
 
  handleTimeChange = (event, date) => {
    this.setState({time: date});
  };

  handleDateChange = (event, date) => {
    this.setState({
      date: date,
    });
  };

  render() {
    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>)
    const styles = {
      button: {
        marginTop: 12,
        marginRight: 12,
        zIndex: 0,
      }
    }

    return (
      <Row>
        <form className="add-gather" onSubmit={this.handleFormSubmit}>
      <Row>
            <Col xs={6}>
          <MuiThemeProvider>
            <DatePicker
              className="picker"
              hintText="Pick a Date"
              style={{display: "block"}}
              value={this.state.date}
              minDate={new Date()}
              onChange={this.handleDateChange}
              autoOk={true}
            />
          </MuiThemeProvider>
            </Col>
            <Col xs={6}>
          <MuiThemeProvider>
            <TimePicker
              className="picker"
              style={{display: "block"}}
              format="ampm"
              hintText="Pick a Time"
              value={this.state.time}
              onChange={this.handleTimeChange}
              autoOk={true}
            />
          </MuiThemeProvider>
            </Col >
      </Row>

          <PlacesAutocomplete
            className="place-picker"
            value={this.state.address}
            onChange={this.onChange}
            placeholder="Location"
            autocompleteItem={AutocompleteItem}
          />

          <MuiThemeProvider>
            <RaisedButton
              label="Create"
              labelPosition="before"
              primary={true}
              style={styles.button}
              type="submit"
              buttonStyle={{backgroundColor: red500}}

            />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <RaisedButton
              label="Cancel"
              labelPosition="before"
              secondary={true}
              style={styles.button}
              type="cancel"
              buttonStyle={{backgroundColor: grey400}}

            />
          </MuiThemeProvider>
        </form>
      </Row>
    )
  }
}

export default Pickers