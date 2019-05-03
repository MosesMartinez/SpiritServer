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
            time1: 5.0,
            time2: 5.0,
            time3: 5.0,
            time4: 5.0,
            userToken: null,
            cocktails: [],
            message: null,
        }
    }

    componentDidMount() {
        this.getMachines();
    }

    setMessage = (message) => {
        this.setState({
            message: message,
        });

        setTimeout(() => {
            this.setState({
                message: null,
            });
        }, 3000)
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
                        // cocktail.index = index++;
                        cocktail.index = Math.floor(Math.random() * 500000);
                    });
                    // let {cocktails} = this.state;
                    // for(let i = 0; i<drinks.length; i++){

                    // }
                    this.setState({
                        cocktails: cocktails,
                        drinkList: res.data,
                    })
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
    addDrinkComponent = () => {
        let { cocktails, alc1, mix1 } = this.state;
        if (cocktails.length > 1) {
            let newList = [{
                name: '',
                price: 0,
                alcohol: {
                    name: alc1,
                    container: 0
                },
                mixer: {
                    name: mix1,
                    container: 0,
                    time: 0,
                },
                image: null,
                index: Math.floor(Math.random() * 500000),
            }];
            this.setState({
                cocktails: newList.concat(cocktails),
            });
        }
    }

    cancel = () => {
        this.setState({
            cocktails: [],
            isLoaded: false,
            time1: '',
            time2: '',
            time3: '',
            time4: '',
        })
    }

    //Todo
    deleteDrink = (index) => {
        let { cocktails } = this.state;
        console.log("Deleting: " + index);
        let deleteIndex = 0;

        for (let i = 0; i < cocktails.length; ++i) {
            if (cocktails[i].index === index) {
                console.log('Found drink at ' + i);
                deleteIndex = i;
                break;
            }
        }

        cocktails.splice(deleteIndex, 1);
        this.setState({
            cocktails: cocktails,
        })
    }
    //Todo
    saveMachine = () => {
        let { cocktails, machine } = this.state;
        // this.setState({ isLoaded: !this.state.isLoaded, machine: 'Select' })
        console.log(cocktails);
        cocktails.forEach(function (v) { delete v.index });
        let alcoholList = [];
        let mixerList = [];
        // drinkList.forEach();
        let finishedJSON = [];
        for (let i = 0; i < 4; ++i) {
            alcoholList.push(this.state[`alc${i + 1}`]);
            mixerList.push(this.state[`mix${i + 1}`])
            let curObj = {};
            curObj.alcohol = this.state[`alc${i + 1}`];
            let coc = [];
            cocktails.forEach(cocktail => {
                console.log(cocktail.mixer.name);
                if (cocktail.alcohol.name === curObj.alcohol) {
                    coc.push(cocktail);
                    cocktail.alcohol.container = i;
                }
                if (cocktail.mixer.name === this.state[`mix${i + 1}`]) {
                    cocktail.mixer.time = parseFloat(this.state[`time${i + 1}`]);
                    cocktail.mixer.container = i;
                }
            });
            curObj.cocktails = coc;
            finishedJSON.push(curObj);
        }
        console.log(finishedJSON);
        const jsonString = JSON.stringify(finishedJSON);
        const alcString = JSON.stringify(alcoholList);
        const mixString = JSON.stringify(mixerList);
        console.log(alcString);
        console.log(mixString);
        axios.post(`/api/cocktails/${machine}`, {
            cocktails: jsonString
        })
            .then((res) => {
                console.log(res.data);
                this.cancel();
                this.setMessage('Cocktails added');

                axios.post(`/api/machines/${machine}`, {
                    alcohol: alcString,
                    mixer: mixString,
                })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
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
            })
        }
        else {
            this.getMachines();
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
                <div className="col" key={cocktail.index}>
                    <DrinkComponent
                        name={cocktail.name}
                        alcohol={cocktail.alcohol.name}
                        alcArray={alcArray}
                        mixer={cocktail.mixer.name}
                        mixArray={mixArray}
                        price={cocktail.price}
                        image={cocktail.image}
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
                        <div className="col"><input value={this.state.time1} disabled={!this.state.isLoaded} name='time1' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time2} disabled={!this.state.isLoaded} name='time2' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time3} disabled={!this.state.isLoaded} name='time3' onChange={this.inputHandler} /></div>
                        <div className="col"><input value={this.state.time4} disabled={!this.state.isLoaded} name='time4' onChange={this.inputHandler} /></div>
                    </div>
                    <div className="row mt-3">
                        <div className="col h1 text-danger text-center">
                            {this.state.message}
                        </div>
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
