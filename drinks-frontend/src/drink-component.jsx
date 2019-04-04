import React, { Component } from 'react';
import "./drinkComponent.css"
import ImageUploader from 'react-images-upload';

class drinkComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      name: '',
      price: '',
      image: false,
      icon: true,
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
      icon: false,
    });
  }
  render() {
    return (
      <div className="drinkComponent">
        <ImageUploader
          withIcon={true}
          withLabel={false}
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          withPreview={true}
        />
        <div>
          Cocktail Name:
          <div className="inputFields">
            <input value={this.props.name} 
            onChange ={ (e) => {
              this.setState({name: e.target.value})}
            }/>
          </div>
        </div>
        <div>
          Cocktail Price:
          <div className="inputFields">
            <input className="input" value={this.state.price} 
            onChange ={ (e) => {
              this.setState({price: e.target.value})}
            }/>
          </div>
          <button onClick={this.deleteDrink}>Remove</button>
        </div>
      </div>
    );
  }

}

export default drinkComponent; 