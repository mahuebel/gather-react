import React, { Component } from 'react'
import ReactDOM from 'react-dom';
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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import moment from 'moment';

import { Row, Col } from 'react-flexbox-grid';

import { red500, grey400, lightBlueA400 } from 'material-ui/styles/colors.js';


 
class Pickers extends Component {
  constructor(props) {
    super(props)
    this.state = { address: "", time: null, date: null, open: false, type: 1, formReady: false }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }
  
  handleFormSubmit(event) {
    event.preventDefault()
    console.log("form submit", this)
    const { formReady } = this.state

    if (formReady){
      this.saveGather()
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    console.log("handle close", this)
    ReactDOM.findDOMNode(this.refs.dateInput).value = '';
    ReactDOM.findDOMNode(this.refs.timeInput).value = '';
    ReactDOM.findDOMNode(this.refs.placeInput).value = '';
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

  handleTypeChange = (event, index, value) => {
    this.setState({type: value});
  }

  saveGather() {
    const { address, time, date, type } = this.state

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

      // console.log('Date is:', dateMoment.format("YYYY-MM-DD HH:mm Z"))
      // console.log(`start is ${start}`)

      let gType = ""

      if (type === 1) {
        gType = "PRIVATE"
      } else {
        gType = "PUBLIC"
      }

      insert.call({
        name: null,
        start: start,
        duration: 1,
        type: gType,
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
      },
      dialog: {
        width: '90%',
        height: '100%',
        maxWidth: 'none',
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
            backgroundColor={lightBlueA400}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            contentStyle={styles.dialog}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <form className="add-gather" onSubmit={this.handleFormSubmit}>

              <PlacesAutocomplete
                className="place-picker"
                ref="placeInput"
                value={this.state.address}
                onChange={this.handlePlaceChange}
                placeholder="Location"
                autocompleteItem={AutocompleteItem}
              />

              <SelectField 
                value={this.state.type} 
                className="type-select"
                onChange={this.handleTypeChange}
                style={{width: "100%"}}
                autoWidth={false} 
              >
                <MenuItem value={1} primaryText="Private" />
                <MenuItem value={2} primaryText="Public" />
              </SelectField>

              <div>
                <DatePicker
                  className="picker"
                  hintText="Pick a Date"
                  style={{display: "block"}}
                  firstDayOfWeek={0}
                  fullWidth={true}
                  ref="dateInput"
                  value={this.state.date}
                  minDate={new Date()}
                  onChange={this.handleDateChange}
                  autoOk={true}
                />
             
                <TimePicker
                  className="picker"
                  style={{display: "block"}}
                  fullWidth={true}
                  ref="timeInput"
                  format="ampm"
                  hintText="Pick a Time"
                  value={this.state.time}
                  onChange={this.handleTimeChange}
                  autoOk={true}
                />
              </div>
            </form>
          </Dialog>
        </div>
    )
  }
}

export default Pickers