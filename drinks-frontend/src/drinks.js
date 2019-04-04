import React, { Component } from 'react';
import _drinkComponent from './drink-component.jsx';
import "./drinkComponent.css";
import axios from 'axios';
class drinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            machine: 'Select',
            drinkList: [],
            newList: [],
        }
    }

    componentDidMount = () => {
        let { machine } = this.state;
        let {drinkList} = this.state;
        // console.log(machine);
        axios.get('/api/drinkList', {
            params: {
                alcohol: machine,
            }
        })
            .then((results) => {
                drinkList = results.data;
                this.setState({
                    drinkList: drinkList,
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }
    generateDrinks = () => {
        fetch('/api/drinkList')
            .then(res => res.json())
            .then((results) => {
                console.log(results);
                this.setState({
                    isLoaded: true,
                    drinkList: results,
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    addDrinkComponent = () => {
        let { newList, drinkList } = this.state;
        this.setState({
            newList: [<_drinkComponent function={this.deleteDrink}/>].concat(newList),
            drinkList: newList.concat(drinkList),
        })
    }
    deleteDrink () {
        console.log('inparent');
        let {drinkList} = this.state;
        console.log(drinkList);
    }
    render() {
        const { drinkList } = this.state;
        return (
            <div>
                <div>
                    <select id="Machine" onChange={(e) => {
                        this.setState({ machine: e.target.value })
                    }} value={this.state.machine}>
                        <option value="select">Select</option>
                        <option value="Tequila,Vodka">Machine 1</option>
                        <option value="Gin,Whiskey">Machine 2</option>
                        <option value="Vodka">Machine 3</option>
                        <option value="Rum">Machine 4</option>
                        <option value="Tequila,Vodka,Whiskey,Rum">Machine 5</option>
                    </select>
                    {this.state.machine}
                    <button onClick={this.componentDidMount}>Generate</button>
                </div>
                <div>
                    <button>Save Machine</button>
                    <button onClick={this.addDrinkComponent}>Add Drink</button>
                </div>
                {
                    <div>
                        {this.state.newList}
                        {drinkList.map(drink => (
                            <div className="layout" key={drink.drinks}>
                                {<_drinkComponent name={drink.name} onClick={this.deleteDrink} />}
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default drinks;
