import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Simple title for Country Application',
      countries: []
    }
  }

  // Make Ajax Calls Here
  componentDidMount() {
    const self = this;
    console.log('componente has mounted');
    self.getCountries();
  }

  removeCountry(id) {
    const self = this;

    const request = new Request('http://localhost:5000/api/remove/' + id, {
      method: 'DELETE'
    });

    fetch(request)
      .then(response => {
        self.getCountries();
      })
      .catch(error => console.log('Error Remove Country Fetch : ' + error));

  }

  getCountries() {
    const self = this;

    const url = 'http://localhost:5000/api/countries';
    console.log('component has mounted');

    fetch(url)
      .then(response => response.json())
      .then(json => {
        self.setState({
          countries: json
        })
      })
      .catch(error => console.log('Error Fetch : ' + error))
  }

  addCountry(event) {
    const self = this;

    event.preventDefault();
    const country_data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value
    };

    const request = new Request('http://localhost:5000/api/new-country', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(country_data)
    });

    // xmlHttpRequest()
    fetch(request)
      .then(function (response) {
        console.log('post was successful:', response);
        self.getCountries();
      })
      .catch(function (err) {
        console.log('Fetch Error addCountry :-S', err);
      })

  }

  render() {
    const title = this.state.title;
    const countries = this.state.countries;

    return (
      <div className="App">
        <h1>{title}</h1>
        <form className="countryForm">
          <input type="text" ref="country_name" placeholder="country_name"></input>
          <input type="text" ref="continent_name" placeholder="continent_name"></input>
          <button onClick={this.addCountry.bind(this)}>Add Country</button>
          {/* <pre>{JSON.stringify(countries)}</pre> */}
        </form>

        <ul>
          {countries.map(country => <li key={country.id}> {country.country_name} {country.continent_name}
            <button onClick={this.removeCountry.bind(this, country.id)}>Remove</button> </li>)}

        </ul>

      </div>
    );
  }
}

export default App;
