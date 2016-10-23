import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'

import { insert } from '../../api/gathers/methods.js';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

import { Row, Col } from 'react-flexbox-grid';

import { red500, grey400 } from 'material-ui/styles/colors.js';


 
class Pickers extends Component {
  constructor(props) {
    super(props)
    this.state = { address: "", time: null, date: null, open: false, formReady: false }
    // this.onChange = (address) => 
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }
  
  handleFormSubmit(event) {
    event.preventDefault()
    const { formReady } = this.state

    if (formReady){
      this.saveGather()
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTimeChange = (event, time) => {
    const { address, date } = this.state
    this.setState({
      time: time,
      formReady: (address && time && date)
    });
  };

  handleDateChange = (event, date) => {
    const { address, time } = this.state
    this.setState({
      date: date,
      formReady: (address && time && date)
    });
  };

  handlePlaceChange = (address) => {
    const { time, date } = this.state
    this.setState({ 
      address,
      formReady: (address && time && date) 
    })
  }

  saveGather() {
    const { address, time, date } = this.state

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) {
        console.log('Oh no!', err)
        this.handleClose
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
      }, (error) => {
        if (error) {
          console.error(error)
          this.handleClose()
        }

      })

        this.handleClose()

    })
  }

  render() {
    const styles = {
      button: {
        marginTop: 12,
        marginRight: 12,
        zIndex: 0,
      },
      fab: {
        position: "fixed",
        bottom: "45px",
        right: "24px",
        zIndex: 15,
      }
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Create"
        labelPosition="before"
        primary={true}
        keyboardFocused={true}
        disabled={!(this.state.formReady)}
        style={styles.button}
        onTouchTap={this.handleFormSubmit}
        buttonStyle={{backgroundColor: red500}}
      />,
      ];

    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>)
    

    return (
        <div>
          <FloatingActionButton 
            style={styles.fab}
            onTouchTap={this.handleOpen}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            title="New Gather"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <form className="add-gather" onSubmit={this.handleFormSubmit}>
              <MuiThemeProvider>
                <DatePicker
                  className="picker"
                  hintText="Pick a Date"
                  style={{display: "block"}}
                  firstDayOfWeek={0}
                  fullWidth={true}
                  value={this.state.date}
                  minDate={new Date()}
                  onChange={this.handleDateChange}
                  autoOk={true}
                />
              </MuiThemeProvider>
              <MuiThemeProvider>
                <TimePicker
                  className="picker"
                  style={{display: "block"}}
                  fullWidth={true}
                  format="ampm"
                  hintText="Pick a Time"
                  value={this.state.time}
                  onChange={this.handleTimeChange}
                  autoOk={true}
                />
              </MuiThemeProvider>

              <PlacesAutocomplete
                className="place-picker"
                value={this.state.address}
                onChange={this.handlePlaceChange}
                placeholder="Location"
                autocompleteItem={AutocompleteItem}
              />

            </form>
          </Dialog>
        </div>
    )
  }
}

export default Pickers