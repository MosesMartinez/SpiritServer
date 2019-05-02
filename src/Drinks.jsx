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
            machineList: [],
            drinkList: [],
            alc1: '',
            alc2: '',
            alc3: '',
            alc4: '',
            mix1: '',
            mix2: '',
            mix3: '',
            mix4: '',
            nextIndex: 0,
            userToken: null,
            cocktails: [{
                alcohol: '',
                cocktails: [{
                    name: '',
                    price: null,
                    alcohol: {
                        name: " ",
                        container: 0
                    },
                    mixer: {
                        name: "",
                        container: null,
                        time: null,
                    },
                    image: "",
                }],
            }],
        }
    }

    componentDidMount() {
        this.getMachines();
    }
    getMachines = () => {
        let { userToken } = this.props;
        axios.get(`/api/machines/${userToken}`)
            .then((res) => {
                this.setState({
                    machineList: res.data,
                });
                console.log(res.data);
            })
    }
    generateDrinks = () => {
        console.log(this.state.machine);
        if(this.state.machine !== 'Select'){
        axios.get(`/api/cocktails/${this.state.machine}`)
            .then((res) => {
                let drinkList = res.data;
                this.setState({
                    cocktails: drinkList,
                    nextIndex: drinkList.length
                })
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }
    addDrinkComponent = () => {
        let { cocktails } = this.state;

        let newList = [{
            alcohol: '',
            cocktails: [{
                name: '',
                price: null,
                alcohol: {
                    name: " ",
                    container: 0
                },
                mixer: {
                    name: "",
                    container: null,
                    time: null,
                },
                image: "",
                index: this.state.nextIndex,
            }],
        }];
        this.setState({
            cocktails: newList.concat(cocktails),
            nextIndex: this.state.nextIndex + 1,
        });
    }

    //Todo
    deleteDrink = (index) => {
        let { cocktails } = this.state;
        console.log("Deleting: " + index);

        for (let i = 0; i < cocktails.length; ++i) {
            if (cocktails[i].index === index) {
                index = i;
                break;
            }
        }

        cocktails.splice(index, 1);
        this.setState({
            cocktails: cocktails,
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
        let { machineList } = this.state;

        console.log(machineList[0].alcohol[0].name);
    }
    fieldInput = (e) => {
        let { machineList } = this.state;
        let machineID = e.target.value;
        if (machineID === 'Select') {
            this.setState({
                machine: 'Select',
                alc1: '',
                alc2: '',
                alc3: '',
                alc4: '',
                mix1: '',
                mix2: '',
                mix3: '',
                mix4: '',
                cocktails: [{
                    alcohol: '',
                    cocktails: [{
                        name: '',
                        price: null,
                        alcohol: {
                            name: " ",
                            container: 0
                        },
                        mixer: {
                            name: "",
                            container: null,
                            time: null,
                        },
                        image: "",
                    }],
                }],
            })
        }
        else {
            this.setState({ machine: machineID });
            for (let i = 0; i < machineList.length; i++) {
                if (machineList[i].id === parseInt(machineID)) {
                    for (let j = 0; j < 4; j++) {
                        this.setState({
                            [`alc${j + 1}`]: machineList[i].alcohol[j].name,
                            [`mix${j + 1}`]: machineList[i].mixer[j].name,
                        })
                    }
                }
            }
        }
    }
    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    displayDrinks = () => {

    }
    render() {
        const { machineList, cocktails } = this.state;
        return (
            <div className="container">
                <select onChange={(e) => { this.fieldInput(e) }} value={this.state.machine}>
                    <option value="Select">Select</option>
                    {machineList.map((machine) => {
                        return <option key={machine.id} value={machine.id}>{"Machine " + machine.id}</option>
                    })}
                </select>
                <div className="row">
                    <div className="col">Alcohol Container 1</div>
                    <div className="col">Alcohol Container 2</div>
                    <div className="col">Alcohol Container 3</div>
                    <div className="col">Alcohol Container 3</div>
                </div>
                <div className="row">
                    <div className="col"><input value={this.state.alc1} name='alc1' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.alc2} name='alc2' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.alc3} name='alc3' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.alc4} name='alc4' onChange={this.inputHandler} /></div>
                </div>
                <div className="row">
                    <div className="col">Mixer Container 1</div>
                    <div className="col">Mixer Container 2</div>
                    <div className="col">Mixer Container 3</div>
                    <div className="col">Mixer Container 3</div>
                </div>
                <div className="row">
                    <div className="col"><input value={this.state.mix1} name='mix1' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.mix2} name='mix2' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.mix3} name='mix3' onChange={this.inputHandler} /></div>
                    <div className="col"><input value={this.state.mix4} name='mix4' onChange={this.inputHandler} /></div>
                </div>
                <button onClick={this.generateDrinks}>Apply</button>
                <div>
                    {/* {JSON.stringify(cocktails)} */}

                    <button onClick={this.addDrinkComponent}>Add Cocktail</button>
                    {cocktails.length > 1 &&
                        cocktails.map((alcohol) => {
                            return (
                                <div className ="row">
                                    {
                                        alcohol.cocktails.map(cocktail => {
                                            return (
                                                <div className="col" key={cocktail.index}>
                                                    <DrinkComponent name={cocktail.name} alcohol={cocktail.alcohol.name} mixer={cocktail.mixer.name} price={cocktail.price} parent={this} index={cocktail.index} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Drinks;
