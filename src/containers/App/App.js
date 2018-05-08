import React, { Component } from 'react';
import logo from '../../assets/img/logo-fmu.png';
import '../../assets/style/index.scss';
import './App.scss'; 

const UNITS = [
  { id : '8pce' , name: 'LOT DE 8 PCE', quantity: 8, referenceUnit: 'pce'},
  { id : '6pce' , name: 'LOT DE 6 PCE', quantity: 6, referenceUnit: 'pce'},
  { id : '4pce' , name: 'LOT DE 4 PCE', quantity: 4, referenceUnit: 'pce'},
  { id : '3pce' , name: 'LOT DE 3 PCE', quantity: 3, referenceUnit: 'pce'},
  { id : 'pce' , name: 'PCE', quantity: 3, referenceUnit: 'kg'},
  { id : 'kg' , name: 'KG', quantity: 1000, referenceUnit: 'g'},
  { id : 'g' , name: 'g', quantity: 1, referenceUnit: null},
  { id : 'cs' , name: 'CS', quantity: 20, referenceUnit: 'g'},
]

class Unit {
  constructor(id, name, quantity, ref) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.referenceUnit = ref;
  }
}

class App extends Component {

  state = {
    units : this.createUnits(),
    first : null,
    second : null,
    factor : 0
  }

  constructor(props) {
    super(props)
    this.handleUnitFirst = this.handleUnitFirst.bind(this)
    this.handleUnitSecond = this.handleUnitSecond.bind(this)
    this.convertUnit = this.convertUnit.bind(this)
  }

  //Crée et retourne un tableau d'objet Unit
  createUnits() {
    const t_unit = [];
    for (let i in UNITS) {
      let el = UNITS[i]

      t_unit.push( new Unit(el.id, el.name, el.quantity, el.referenceUnit))
    }

    return t_unit;
  }

  componentWillMount() {
    this.setState({first: this.state.units[0]})
    this.setState({second: this.state.units[1]})
  }

  //Calcule le facteur des deux units
  convertUnit() {
    const { first, second } = this.state;
    
    const firstInGram = this.convertToGram(first);
    const secondInGram = this.convertToGram(second);

    this.updateFactor((firstInGram / secondInGram))
  }

  //Convert une unité en gramme
  convertToGram(unit) {

    if(unit.id === 'g' || unit.referenceUnit === 'g') {
      return unit.quantity
    }
    else  return this.recursUnit(unit)
  }

  //Recurs sur les units pour trouver la quantité de depart en gramme
  recursUnit(unit, quantity=null){
    const { units } = this.state;
    
    if(unit.id === 'g') return quantity;
    else {
      const refId = units.findIndex((el) => el.id === unit.referenceUnit)
      quantity = (quantity ? quantity : unit.quantity);
      return this.recursUnit(units[refId], (quantity * units[refId].quantity))
    }
    
  }

  //Met à jour le facteur à afficher
  updateFactor(newFactor) {
    this.setState({factor: newFactor})
  }

  //Assigne le premier unit  
  handleUnitFirst(event) {
    this.setState({first: this.state.units.filter(x => x.id === event.target.value)[0] });
  }

  //Assigne le deuxième unit
  handleUnitSecond(event) {
    this.setState({second: this.state.units.filter(x => x.id === event.target.value)[0] });
  }


  render() {
    const { units, first, second, factor } = this.state

    return (
        <section className="App">
          <img src={logo} alt="Logo Food Me Up" width="300" />

          <div className="convertissor">
            <select onChange={this.handleUnitFirst}>
              {
                units.filter(x => x.id !== second.id).map(unit => (
                  <option value={unit.id} key={unit.id}>{unit.name}</option>
                ))
              }
            </select>
             <span> -> </span>
            <select onChange={this.handleUnitSecond}>
              {
                units.filter(x => x.id !== first.id).map(unit => (
                  <option value={unit.id} key={unit.id+"_nd"}>{unit.name}</option>
                ))
              }
            </select>
            <div className="spacing-h">
              <button onClick={this.convertUnit}>Convert</button>
            </div>
          </div>
          {
            factor !== 0 && (
              <b className="factor">{factor}</b>
            )
          }
        </section>
    );
  }
}

export default App;