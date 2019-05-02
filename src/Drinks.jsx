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
            alcohols: ['', '', '', ''],
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
            time1: '',
            time2: '',
            time3: '',
            time4: '',
            nextIndex: 0,
            userToken: null,
            cocktails: [],

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
        if (this.state.machine !== 'Select') {
            this.setState({ isLoaded: !this.state.isLoaded })
            axios.get(`/api/cocktails/${this.state.machine}`)
                .then((res) => {
                    console.log(res.data);
                    let drink = res.data;
                    let index = 0;
                    let cocktails = []
                    for (let i = 0; i < drink.length; i++) {
                        for (let j = 0; j < drink[i].cocktails.length; j++) {
                            cocktails.push(drink[i].cocktails[j]);
                            this.setState({
                                [`time${j + 1}`]: drink[i].cocktails[j].mixer.time,
                            });
                        }
                    }
                    cocktails.forEach(cocktail => {
                        cocktail.index = index++;
                    });
                    // let {cocktails} = this.state;
                    // for(let i = 0; i<drinks.length; i++){

                    // }
                    this.setState({
                        cocktails: cocktails,
                        nextIndex: cocktails.length,
                        drinkList: res.data,
                    })
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
    addDrinkComponent = () => {
        let { cocktails } = this.state;
        if (cocktails.length > 1) {
            let newList = [{
                name: '',
                price: 0,
                alcohol: {
                    name: "",
                    container: 0
                },
                mixer: {
                    name: "",
                    container: 0,
                    time: 0,
                },
                image: "",
                index: this.state.nextIndex,
            }];
            this.setState({
                cocktails: newList.concat(cocktails),
                nextIndex: this.state.nextIndex + 1,
            });
        }
    }

    cancel = () => {
        this.setState({
            cocktails: [],
            isLoaded: false,
        })
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
    //Todo
    saveMachine = () => {
        let { cocktails, machine } = this.state;
        this.setState({ isLoaded: !this.state.isLoaded, machine: 'Select' })
        cocktails.forEach(function (v) { delete v.index });
        // drinkList.forEach();
        let finishedJSON = [];
        for (let i = 0; i < 4; ++i) {
            let curObj = {};
            curObj.alcohol = this.state[`alc${i + 1}`];
            let coc = [];
            cocktails.forEach(cocktail => {
                if (cocktail.alcohol.name === curObj.alcohol)
                    coc.push(cocktail);
                if (cocktail.mixer.name === this.state[`mix${i + 1}`])
                    cocktail.mixer.time = this.state[`time${i + 1}`];
            });
            curObj.cocktails = coc;
            finishedJSON.push(curObj);
        }
        console.log(finishedJSON);
        const jsonString = JSON.stringify(finishedJSON);

        axios.post(`/api/cocktails/${machine}`, {
            cocktails: jsonString
        })
            .then((res) => {
                console.log(res.data);
            })
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
                time1: '',
                time2: '',
                time3: '',
                time4: '',
                nextIndex: 0,
            })
        }
        else {
            this.setState({ machine: machineID, cocktails: [] });
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
    render() {
        const { machineList, cocktails } = this.state;

        let buttons =
            <div className="row mt-4 justify-content-center">
                <button onClick={this.cancel} className=" btn btn-primary btn-sm col-sm-1 mr-4">Cancel</button>
                <button onClick={this.addDrinkComponent} className=" btn btn-primary btn-sm col-sm-1 mr-4">Add Cocktail</button>
                <button onClick={this.saveMachine} className="btn btn-primary btn-lsm col-sm-1 mr-4">Save</button>
            </div>

        if (cocktails.length == 0)
            buttons =
                <div className="row mt-4 justify-content-center">
                    <button onClick={this.generateDrinks} className=" btn btn-primary btn-sm col-sm-1 mr-4">Apply</button>
                </div>

        let alcArray = [];
        let mixArray = [];
        for (let i = 1; i <= 4; ++i) {
            alcArray.push(this.state[`alc${i}`])
            mixArray.push(this.state[`mix${i}`])
        }
        const drinks = cocktails.map((cocktail, i) => {
            return (
                <div className="col" key={i}>
                    <DrinkComponent
                        name={cocktail.name}
                        alcohol={cocktail.alcohol.name}
                        alcArray={alcArray}
                        mixer={cocktail.mixer.name}
                        mixArray={mixArray}
                        price={cocktail.price}
                        parent={this}
                        index={cocktail.index}
                    />
                </div>
            )
        })


        return (
            <div className="container">
                <div className="border-bottom border-top mt-3 border-info pt-4 pb-4">
                    <select onChange={(e) => { this.fieldInput(e) }} value={this.state.machine}>
                        <option value="Select">Select</option>
                        {machineList.map((machine) => {
                            return (
                                <option key={machine.id} value={machine.id}>
                                    {"Machine " + machine.id}
                                </option>
                            );
                        })}
                    </select>
                    <div className="row">
                        <div className="col">Alcohol Container 1</div>
                        <div className="col">Alcohol Container 2</div>
                        <div className="col">Alcohol Container 3</div>
                        <div className="col">Alcohol Container 3</div>
                    </div>
                    <div className="row">
                        <div className="col"><input value={this.state.alc1} disabled={this.state.isLoaded} name='alc1' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.alc2} disabled={this.state.isLoaded} name='alc2' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.alc3} disabled={this.state.isLoaded} name='alc3' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.alc4} disabled={this.state.isLoaded} name='alc4' onChange={this.inputHandler} /></div>
                    </div>
                    <div className="row">
                        <div className="col">Mixer Container 1</div>
                        <div className="col">Mixer Container 2</div>
                        <div className="col">Mixer Container 3</div>
                        <div className="col">Mixer Container 3</div>
                    </div>
                    <div className="row">
                        <div className="col"><input value={this.state.mix1} disabled={this.state.isLoaded} name='mix1' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.mix2} disabled={this.state.isLoaded} name='mix2' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.mix3} disabled={this.state.isLoaded} name='mix3' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.mix4} disabled={this.state.isLoaded} name='mix4' onChange={this.inputHandler} /></div>
                    </div>
                    <div className="row">
                        <div className="col">Mixer 1 Pour Time</div>
                        <div className="col">Mixer 2 Pour Time</div>
                        <div className="col">Mixer 3 Pour Time</div>
                        <div className="col">Mixer 4 Pour Time</div>
                    </div>
                    <div className="row">
                        <div className="col"><input value={this.state.time1} name='time1' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time2} name='time2' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time3} name='time3' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time4} name='time4' onChange={this.inputHandler} /></div>
                    </div>
                </div>
                {buttons}
                <div>
                    <div className="row">
                        {drinks}
                    </div>
                </div>
            </div>
        )
    }
}

export default Drinks;
