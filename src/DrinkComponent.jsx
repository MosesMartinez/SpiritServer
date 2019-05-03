import React, { Component } from 'react';
import "./drinkComponent.css";
import axios from 'axios';

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
      image: '/images/uploads/b98d337e481b663b75c3b348e1ef71cbc614d83e.jpg',
    };

    this.onDrop = this.onDrop.bind(this);

    this.fileInput = React.createRef();
    this.imageRef = React.createRef();
    this.submitRef = React.createRef();

  }

  componentWillMount() {
    let { name, alcohol, mixer, price, image, parent } = this.props;

    if (name) this.setState({ name: name });
    if (alcohol) this.setState({ alcohol: alcohol });
    if (mixer) this.setState({ mixer: mixer });
    if (price) this.setState({ price: price });
    if (image) this.setState({ image: image });

    let alcoholFound = false;
    let mixerFound = false;
    for (let i = 1; i <= 4; ++i) {
      if (parent.state[`alc${i}`] === alcohol)
        alcoholFound = true;
      if (parent.state[`mix${i}`] === mixer)
        mixerFound = true;
    }
    console.log('alcoholFound: ' + alcoholFound);

    if (alcoholFound == false)
      this.setState({
        alcohol: parent.state.alc1,
      })
    if (mixerFound == false)
      this.setState({
        mixer: parent.state.mix1,
      })

  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  updateName = (index, e) => {
    let { cocktails } = this.props.parent.state;

    for (let i = 0; i < cocktails.length; ++i) {
      if (cocktails[i].index === index) {
        index = i;
        break;
      }
    }
    cocktails[index].name = e.target.value;
    this.props.parent.setState({ cocktails: cocktails })
    this.setState({ name: cocktails[index].name })
  }
  updateAlcohol = (index, e) => {
    let { cocktails } = this.props.parent.state;
    console.log(e.target.value);

    for (let i = 0; i < cocktails.length; ++i) {
      if (cocktails[i].index === index) {
        index = i;
        break;
      }
    }
    cocktails[index].alcohol.name = e.target.value;
    this.props.parent.setState({ cocktails: cocktails })
    this.setState({ alcohol: cocktails[index].alcohol.name })
  }
  updateMixer = (index, e) => {
    let { cocktails } = this.props.parent.state;

    for (let i = 0; i < cocktails.length; ++i) {
      if (cocktails[i].index === index) {
        index = i;
        break;
      }
    }
    cocktails[index].mixer.name = e.target.value;
    cocktails[index].mixer.container = index
    this.props.parent.setState({ cocktails: cocktails })
    this.setState({ mixer: cocktails[index].mixer.name })
  }
  updatePrice = (index, e) => {
    let { cocktails } = this.props.parent.state;

    for (let i = 0; i < cocktails.length; ++i) {
      if (cocktails[i].index === index) {
        index = i;
        break;
      }
    }

    // let priceInt = parseFloat(e.target.value).toString();
    // if (priceInt.length != e.target.value.length)
    //   this.setState({ error: "Bad price characters" });
    // else
    //   this.setState({ error: "" });

    if (e.target.value > 0) {
      cocktails[index].price = parseInt(e.target.value);
    }
    else {
      cocktails[index].price = e.target.value;
    }

    this.props.parent.setState({ cocktails: cocktails })
    this.setState({ price: cocktails[index].price })
  }

  handleSubmit = (index, event) => {
    event.preventDefault();

    let { cocktails } = this.props.parent.state;

    var formData = new FormData();
    var imagefile = document.querySelector(`#file${this.props.index}`);
    formData.append("image", imagefile.files[0]);
    axios.post('/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(image => {
        console.log(image.data);

        for (let i = 0; i < cocktails.length; ++i) {
          if (cocktails[i].index === index) {
            index = i;
            break;
          }
        }

        cocktails[index].image = image.data;
        this.props.parent.setState({ cocktails: cocktails })

        this.setState({
          image: image.data,
        })
      })
      .catch(err => {
        alert('Files must be less than 1 MB');
      })
  }

  render() {
    let { name, alcohol, mixer, price, image } = this.state;
    const { alcArray, mixArray, index } = this.props;

    const inputBoxStyle = {
      width: '80%',
    }

    const rootDivStyle = {
      width: '300px',
    }

    return (
      <div className="container border border-primary rounded mt-5 mb-3" style={rootDivStyle}>


        {/* Hidden */}
        <form
          onSubmit={(e) => this.handleSubmit(this.props.index, e)}
          style={{ display: 'none' }}
        >
          <input type="file"
            name="img"
            id={`file${this.props.index}`}
            accept="image/png, image/jpeg"
            onChange={() => this.submitRef.current.click()}
            ref={this.fileInput}
          />
          <button
            ref={this.submitRef}
            type="submit">Submit</button>
        </form>
        {/* Hidden */}

        <div className="row justify-content-center mt-3">
          <div
            className="border justify-content-center text-center"
            style={{ width: '200px', height: '200px' }}
            onClick={() => this.fileInput.current.click()}
          >
            <img src={image} />
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          Cocktail Name:
        </div>

        <div className="row justify-content-center">
          <input
            value={name}
            onChange={(e) => this.updateName(this.props.index, e)}
            style={inputBoxStyle}
          />
        </div>

        <div className="row justify-content-center">
          Alcohol:
          </div>

        <div className="row justify-content-center">
          <select
            value={alcohol}
            onChange={(e) => this.updateAlcohol(index, e)}
            style={inputBoxStyle}
          >
            <option value={alcArray[0]}>{alcArray[0]}</option>
            <option value={alcArray[1]}>{alcArray[1]}</option>
            <option value={alcArray[2]}>{alcArray[2]}</option>
            <option value={alcArray[3]}>{alcArray[3]}</option>
          </select>
        </div>

        <div className="row justify-content-center">
          Mixer
          </div>

        <div className="row justify-content-center">
          <select
            value={mixer}
            onChange={(e) => this.updateMixer(index, e)}
            style={inputBoxStyle}
          >
            <option value={mixArray[0]}>{mixArray[0]}</option>
            <option value={mixArray[1]}>{mixArray[1]}</option>
            <option value={mixArray[2]}>{mixArray[2]}</option>
            <option value={mixArray[3]}>{mixArray[3]}</option>
          </select>
        </div>

        <div className="row justify-content-center">
          Cocktail Price:
        </div>

        <div className="row justify-content-center">
          <input
            className="input"
            value={price}
            onChange={(e) => this.updatePrice(this.props.index, e)}
            maxLength="8"
            style={inputBoxStyle}
          />
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