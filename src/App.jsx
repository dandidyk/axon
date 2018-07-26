import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Table from './components/Table'
import Form from './components/Form'
import Summary from './components/Summary'
//import server from '../server'
import axios from 'axios'

class App extends Component {
  state = {
    disable: true
  };


  getUsersfromKiev (data) {
    let amount = 0;
    data.forEach( item => {
      if ( item.location.toLowerCase() === 'kiev') {
        amount++
      }
    })
    this.setState({ fromKiev: amount})
  }

  countOldestUsers (data) {
     let year = data.map( user => {
        let dobAr =  user.dob.split('.');
        let date = new Date(dobAr[2],dobAr[1] - 1,dobAr[0])

        //console.log( date.getTime())
        return date
      })
      .sort( (a,b) => a>b)
      .slice(0,3)
      .map( i => {
        let now = new Date();
        return now.getFullYear() - i.getFullYear()
      })
      .reduce( (a,b) => a + b)
      this.setState({ year: year})
  }

  getLongestName (data) {
    let names = data.map( user => {
      return {
        name: `${user.first_name} ${user.last_name}`,
        length : `${user.first_name} ${user.last_name}`.length }
    })
    let biggestLength = 0;

    names.forEach( user => {
      if ( biggestLength < user.length) biggestLength = user.length
    })

    let name = ''
     names.forEach( user => { 
      if(user.length === biggestLength) name = user.name })

    this.setState({longestName: name})
  }

  createSummary (data) {
    this.getUsersfromKiev(data)
    this.countOldestUsers(data)
    this.getLongestName(data)
  }

  getData () {
    axios.get('http://localhost:3001/users')
    .then( response => {
        this.setState({ data: response.data})
        this.createSummary(response.data)
        console.log(this.state);
    })
    .catch( error => {
        this.setState({ error: error})
    })
  }

  componentDidMount() {
      this.getData()
  }

  handleDelete = (id) => {
      axios.delete('http://localhost:3001/users/' + id) 
        .then ( response => {
            this.getData();
        })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state)
    const id = this.state.data.length + 10
    const first_name = this.state.first_name
    const last_name = this.state.last_name
    let dob = this.state.dob.split('-')
    dob = `${dob[2]}.${dob[1]}.${dob[0]}`
    const location = this.state.location

    const user = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        location: location 
    }

    axios.post('http://localhost:3001/users', user)
      .then ( response => {
        this.getData()
        
      })
  }


  handleChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value



    this.setState({
      [name]: value
    })

      if (this.state.first_name &&
        this.state.last_name &&
        this.state.location &&
        this.state.dob) {
        this.setState({
          disable: false
        })
      } else {
        this.setState({
          disable: true
        })
      }
  }



  render() {

    
    return (
      <div className='App-wrapper'>
        <Table data={this.state.data} handleDelete={this.handleDelete} />
        <Form handleDisable={this.handleDisable} handleSubmit={this.handleSubmit} handleChange={this.handleChange} disable={this.state.disable} />
        <Summary
          fromKiev={this.state.fromKiev}
          longestName={this.state.longestName}
          year={this.state.year} />
      </div>
    );
  }
}

export default App;
