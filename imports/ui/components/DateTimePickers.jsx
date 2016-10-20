import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';


export default class DateTimePickers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value12: null, controlledDate: null};
  }

  handleTimeChange = (event, date) => {
    this.setState({value12: date});
  };

  handleDateChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <div>
        <DatePicker
          className="picker"
          hintText="Pick a Date"
          value={this.state.controlledDate}
          minDate={new Date()}
          onChange={this.handleDateChange}
          autoOk={true}
        />
        <TimePicker
          className="picker"
          format="ampm"
          hintText="Pick a Time"
          value={this.state.value12}
          onChange={this.handleTimeChange}
          autoOk={true}
        />
      </div>
    );
  }
}

