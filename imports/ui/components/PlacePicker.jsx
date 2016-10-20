import React, { Component } from 'react'
// import GooglePlacesSuggest from 'react-google-places-suggest'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'
 
class PlacePicker extends Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Fort Worth, TX' }
    this.onChange = (address) => this.setState({ address })
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
 
  handleFormSubmit(event) {
    event.preventDefault()
    const { address } = this.state
 
    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) {
        console.log('Oh no!', err)
      }
 
      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    })
  }
 


  render() {
    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>)

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          className="place-picker"
          value={this.state.address}
          onChange={this.onChange}
          autocompleteItem={AutocompleteItem}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default PlacePicker