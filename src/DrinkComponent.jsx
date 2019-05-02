import React, { Component } from 'react';
import "./drinkComponent.css";

class DrinkComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      name: '',
      price: '',
      alcohol: '',
      mixer: '',
      error: '',
    };

    this.onDrop = this.onDrop.bind(this);

  }

  componentWillMount() {
    let { name, alcohol, mixer, price } = this.props;

    if (name) this.setState({ name: name });
    if (alcohol) this.setState({ alcohol: alcohol });
    if (mixer) this.setState({ mixer: mixer });
    if (price) this.setState({ price: price });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  updatePrice = (index, e) => {
    let { drinkList } = this.props.parent.state;

    for (let i = 0; i < drinkList.length; ++i) {
      if (drinkList[i].index === index) {
        index = i;
        break;
      }
    }

    // let priceInt = parseFloat(e.target.value).toString();
    // if (priceInt.length != e.target.value.length)
    //   this.setState({ error: "Bad price characters" });
    // else
    //   this.setState({ error: "" });

    drinkList[index].price = e.target.value;

    this.props.parent.setState({ drinkList: drinkList })
    this.setState({ price: drinkList[index].price })
  }

  render() {
    let { name, alcohol, mixer } = this.state;

    return (
      <div className="container border border-primary rounded mt-5 mb-3">
        <div className="row justify-content-center mt-3">
          Cocktail Name:
        </div>
          <div className="row justify-content-center">
            <input value={name}
              onChange={(e) => {
                this.setState({ name: e.target.value })
              }
              } />
          </div>
        <div className="row justify-content-center">
          Alcohol:
          </div>
          <div className="row justify-content-center">
            <input value={alcohol}
              onChange={(e) => {
                this.setState({ name: e.target.value })
              }
              } />
          </div>
        <div className="row justify-content-center">
          Mixer
          </div>
          <div className="row justify-content-center">
            <input value={mixer}
              onChange={(e) => {
                this.setState({ name: e.target.value })
              }
              } />
          </div>
        <div className="row justify-content-center">
          Cocktail Price:
        </div>
          <div className="row justify-content-center">
            <input className="input" value={this.state.price}
              onChange={(e) => this.updatePrice(this.props.index, e)} maxLength="8" />
          </div>
          <div className="row justify-content-center mt-3 mb-3">
          <h5 style={{ color: 'red', textAlign: 'center', }}>{this.state.error}</h5>
          <button onClick={(e) => this.props.parent.deleteDrink(this.props.index, e)}>Remove</button>
          </div>
      </div >
    );
  }

}

export default DrinkComponent; 