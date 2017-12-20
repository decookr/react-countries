import React, { Component } from 'react';
import './App.css';

const url = `http://localhost:5000/api`;

class App extends Component {
  constructor(){
    super();
    this.state = {
      title: 'Perfect Title for our Country Application',
      countries: [],
      country_name: '',
      continent_name: ''
    }

    this.updateCountryName = this.updateCountryName.bind(this);
    this.updateContinentName = this.updateContinentName.bind(this);
    this.addCountry = this.addCountry.bind(this);
  }

  componentDidMount() {
    console.log('component has mounted');
    this.getCountries();
  }

  getCountries() {
    fetch(`${url}/countries`)
      .then(response => response.json())
      .then(countriesResponseArray => {
        this.setState({
          countries: countriesResponseArray
        });
      })
      .catch(error => console.log(`Error with getCountries Fetch: ${error}`)
      )
  }


  updateCountryName(event) {
    this.setState({
      country_name: event.target.value
    });
  }

  updateContinentName(event) {
    this.setState({
      continent_name: event.target.value
    });
  }

  addCountry(event) {
    event.preventDefault();

    const country_data = {
      country_name: this.state.country_name,
      continent_name: this.state.continent_name
    };
    //reset input fields
    this.setState({
      continent_name: '',
      country_name: ''
    })
    const request = new Request(`${url}/new-country`, {
      method: `POST`,
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(country_data)
    });

    fetch(request)
    .then(response => {
      console.log(`post was successful: ${response}`);
      this.getCountries();
    })
    .catch(error => console.log(`Fetch error addCountry: ${error}`)
    )
  }

  removeCountry(id) {
    console.log(`remove country with id ${id}`);
    const request = new Request(`${url}/remove/${id}`, {
      method: 'DELETE'
    });

    fetch(request)
    .then(response => {
      this.getCountries();
    })
    .catch(error => console.log(`Fetch error removeCountry: ${error}`)
    )
  }
  

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form>
          <input type="text" value={this.state.country_name} onChange={this.updateCountryName} placeholder="Country"/>
          <input type="text" value={this.state.continent_name} onChange={this.updateContinentName} placeholder="Continent"/>
          <button onClick={this.addCountry}>Add Country</button>
          </form>

        <ul>
          {this.state.countries.map(country => (
          <li key={country.id}>
            {country.country_name} | {country.continent_name}
            <button onClick={event => this.removeCountry(country.id)}>Delete</button>
          </li>            
          ))}
          </ul>
      </div>
    );
  }
}

export default App;
