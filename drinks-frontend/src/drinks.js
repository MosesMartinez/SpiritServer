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
            machineList: [],
        }
    }

    generateDrinks = () => {
        let { machine } = this.state;
        let {drinkList} = this.state;
        console.log(machine);
        if(machine !== 'Select'){
        axios.get('/cocktails?alcohols=Vodka,Tequila,Gin,Whiskey&mixers=Orange%20Juice,Soda,Tonic,Sprite')
            .then((results) => {
                drinkList = results.data;
                console.log(drinkList);
                this.setState({
                    drinkList: drinkList,
                })
		console.log(results);
            })
            .catch((e) => {
                console.log(e);
            })
    }
}
    addDrinkComponent = () => {
        let { drinkList } = this.state;
        let newList = [<_drinkComponent/>];
        if( 0 !== drinkList.length){
        this.setState({
        //newList:[<_drinkComponent />].concat(newList),
        drinkList: newList.concat(drinkList),
        })
        }
    }
    //Todo
    deleteDrink = () => {
        console.log('inparent');
        let {drinkList} = this.state;
        console.log(drinkList);
    }
    //Todo
    saveMachine = () =>{
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
                        <option value="Select">Select</option>
                        <option value="Tequila,Vodka">Machine 1</option>
                        <option value="Gin,Whiskey">Machine 2</option>
                        <option value="Vodka">Machine 3</option>
                        <option value="Rum">Machine 4</option>
                        <option value="Tequila,Vodka,Whiskey,Rum">Machine 5</option>
                    </select>
                    {this.state.machine}
                    <button onClick={this.generateDrinks}>Generate</button>
                </div>
                <div>
                    <button onClick ={this.saveMachine}>Save Machine</button>
                    <button onClick={this.addDrinkComponent}>Add Drink</button>
                </div>
                {
                    <div>
                        {this.state.newList}
                        {drinkList.map(drink => (
                            <div className="layout" key={drink.name}>
                                {<_drinkComponent name={drink.name} alcohol={drink.alcohols} mixer={drink.mixers} onClick={this.deleteDrink} />}
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default drinks;
