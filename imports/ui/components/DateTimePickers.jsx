import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

import { Row, Col } from 'react-flexbox-grid';



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
        <Row>
          <Col xs={6}>
            <DatePicker
              className="picker"
              hintText="Pick a Date"
              value={this.state.controlledDate}
              minDate={new Date()}
              onChange={this.handleDateChange}
              autoOk={true}
            />
          </Col>
          <Col xs={6}>
            <TimePicker
              className="picker"
              format="ampm"
              hintText="Pick a Time"
              value={this.state.value12}
              onChange={this.handleTimeChange}
              autoOk={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

