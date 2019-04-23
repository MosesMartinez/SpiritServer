import React, { Component } from 'react';
import DrinkComponent from './DrinkComponent.jsx';
import "./drinkComponent.css";
import axios from 'axios';
class Drinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            machine: 'Select',
            drinkList: [],
            machineList: [],
            nextIndex: 0,
        }
    }

    generateDrinks = () => {
        let { machine } = this.state;
        let { drinkList } = this.state;
        console.log(machine);
        if (machine !== 'Select') {
            axios.get('/api/cocktails?alcohols=Vodka,Tequila,Gin,Whiskey&mixers=Orange%20Juice,Soda,Tonic,Sprite')
                .then((results) => {
                    drinkList = results.data;
                    drinkList.forEach(drink => {
                        drink.price = 0;
                    });
                    console.log(drinkList);
                    this.setState({
                        drinkList: drinkList,
                        nextIndex: drinkList.length,
                    })
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
    addDrinkComponent = () => {
        let { drinkList } = this.state;
        let newList = [{
            name: "",
            alcohols: [
                ""
            ],
            mixers: [
                ""
            ],
            image: null,
            index: this.state.nextIndex,
            price: 0,
        }];
        this.setState({
            drinkList: newList.concat(drinkList),
            nextIndex: this.state.nextIndex + 1,
        });
    }

    //Todo
    deleteDrink = (index) => {
        let { drinkList } = this.state;
        console.log(drinkList);
        console.log("Deleting: " + index);

        for (let i = 0; i < drinkList.length; ++i) {
            if (drinkList[i].index == index) {
                index = i;
                break;
            }
        }

        drinkList.splice(index, 1);
        this.setState({
            drinkList: drinkList,
        })
    }

    // updatePrice = (index, e) => {
    //     let { drinkList } = this.state;

    //     for (let i = 0; i < drinkList.length; ++i) {
    //         if (drinkList[i].index == index) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     console.log(drinkList[index]);

    //     this.setState({
    //         drinkList: drinkList,
    //     })
    // }
    //Todo
    saveMachine = () => {
        let { drinkList } = this.state;
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
                    <button onClick={this.saveMachine}>Save Machine</button>
                    <button onClick={this.addDrinkComponent}>Add Drink</button>
                </div>
                {
                    <div>
                        {drinkList.map((drink) => (
                            <div className="layout" key={drink.index}>
                                {<DrinkComponent name={drink.name} alcohol={drink.alcohols} mixer={drink.mixers} parent={this} index={drink.index} />}
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default Drinks;
