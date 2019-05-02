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

    this.fileInput = React.createRef();

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

    cocktails[index].price = parseInt(e.target.value);

    this.props.parent.setState({ cocktails: cocktails })
    this.setState({ price: cocktails[index].price })
  }

  handleUploadImage = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    let { name, alcohol, mixer, price } = this.state;
    const { alcArray, mixArray, index } = this.props;

    const inputBoxStyle = {
      width: '80%',
    }

    const rootDivStyle = {
      width: '300px',
    }

    const img = 'data:image/jpg;base64,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LiPC2IU1PSxVczo7tglALZCDfLr32XKM4wwYiWDB5sPq2Os9glc3Kb7ZXXsor44tPaXHkmnpbTYDWwOIkp5oXak543ZbeDtlGzU80FVHA62eW+U9hN7WW3uGYqqoycvmyA20NQQT8lnkPC7K3K+rwZsj73zuliJv33LbqtbiRK1TmzVzcySenDnZZHBjxG8BpsCez5/NXz66rrZm0z6ZjXxjS0dri+/jsuiY+CqJkr3HCw17zmc/mREk2A16vcPkvqXhWCI52YZMXnc86IeG+VV5/ptLTuYTf3O0RqIc0yYXV8t5bBI8Xt90wvcPCwXz9ltijlir6oCYEXjhaXva219gLD+ay6R+wYms+8wxw/jqM4Hw2+S110h4XMI3GGEMB1JfJcegVjHxK1QX5trdJL2cpIJeIMVFHSGmp4qUABzsziS4akjTsXQC0v7OeB1lBh+KYhVxuYyqcxkJcLZw29yPDUarc6uVjUahTtO53L1ERdORERAREQEREBERAREQEREBERAUDj/CWB487PieHQSzdkwblkH8w1U8iDD6PgSgw9wNFPOxo2D7Ot8dFNQ4bNCLNnJHj/opZF5oWbKaYbygo+lkeLGS3krxF6Ih2DCS/MqZCD2DRUm8MYUZBJUUwqHA3HPOYD4bKcRB8taGtDWgBoFgB2L6REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/9k=';

    return (
      <div className="container border border-primary rounded mt-5 mb-3" style={rootDivStyle}>

        <div className="row justify-content-center mt-3">
          <div className="border justify-content-center text-center" style={{ width: '200px', height: '200px' }}>Add Image</div>
        </div>

        <div className="row justify-content-center mt-3">
          Cocktail Name:
        </div>

        <div className="row justify-content-center">
          {/* <input
            type='file'
            ref={this.fileInput}
          /> */}
          {/* <form onSubmit={this.handleUploadImage}>
            <div>
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>
            <div>
              <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
            </div>
            <br />
            <div>
              <button>Upload</button>
            </div>
            <img src={this.state.imageURL} alt="img" />
          </form> */}
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