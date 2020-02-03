import React, { Component } from 'react';
import './App.css';

let currentPage = 0;
let defaultStyle = {
  color: '#000'
};
let fakeRecipeData = {
  recipe: {
    name: 'Salmon, Potatoes, and Green Beans',
    steps: [
      {
        name: 'Prepare Leeks and Potatoes',
        instructions: 'Trim about 1/4 inch from top and bottom of leeks. Cut leeks in half lengthwise and remove outer layer. Slice leeks as thinly as possible into half-moons. Quarter fingerling potatoes lengthwise. In medium bowl, toss together leeks, potatoes, 1 teaspoon cooking oil and a pinch of salt. Evenly spread leeks and potatoes in Zone 3 of Brava glass tray.',
        parameters: []
      },
      {
        name: 'Prepare Green Beans',
        instructions: 'Trim stems from green beans. Cut beans in half crosswise. In same bowl, toss together green beans, 1/2 teaspoon cooking oil and a pinch of salt. Evenly spread green beans in Zone 2 of glass tray.',
        parameters: []
      },
      {
        name: 'Prepare Salmon',
        instructions: 'Spread about half of butter on Zone 1 of glass tray. Any uncovered butter may burn, so spread only enough for the fish to cover it. Pat salmon dry with paper towels. Season fish on both sides with a pinch of salt. Place salmon, skin side down, on top of butter. Make sure thinnest salmon fillet is on left side of Zone 1. Top each fillet with a few thyme sprigs.',
        parameters: [
          {label: 'Rare', value: 113},
          {label: 'Medium Rare', value: 118},
          {label: 'Medium', value: 126},
          {label: 'Medium Well', value: 129},
          {label: 'Well Done', value: 133}
        ]
      },
      {
        name: 'Prepare TempSensor and Insert Glass Tray',
        instructions: 'Insert TempSensor horizontally through center of thickest part of thinnest salmon fillet. While food cooks, prepare vinaigrette.',
        parameters: []
      },
      {
        name: 'Make Vinaigrette',
        instructions: 'Remove parsley leaves from stems; coarsely chop leaves. In medium bowl, combine Champagne vinegar, Dijon mustard, parsley, 2 tablespoons extra-virgin olive oil and a pinch of salt and pepper; stir well.',
        parameters: []
      },
      {
        name: 'Serve',
        instructions: 'When your food is done, cut salmon in half crosswise. This will stop the cooking process and maintain your preferred doneness. Transfer leeks, potatoes and green beans to bowl with vinaigrette and toss to coat. Season to taste with salt and pepper. Arrange salmon and vegetables on individual plates. If desired, drizzle salmon with remaining vinaigrette from bowl.',
        parameters: []
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display:'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display:'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} minutes</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)
        }/>
      </div>
    );
  }
}

class ParameterSelector extends Component {
  constructor(props) {
    super(props);
    this.state={selectedParameter: 0}
  }
  
  // Change the selected value
  onChange(value) {
    this.setState({
      selectedParameter: value
    })
  }

  render() {
    let listParameters = this.props.parameters.map((parameter, index) =>
      <label key={index}>
        <input 
          type='radio' 
          value={parameter.value} 
          id={index}
          checked={this.state.selectedParameter == index ? true : false}
          onChange={this.onChange.bind(this,index)}
        />
        {parameter.label} - {parameter.value}
      </label>
    );
    return (
      <div style={defaultStyle}><form>
        {listParameters}
      </form></div>
    )
  }
}

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      steps: this.props.steps,
    }
    this.nextPage = this.nextPage.bind(this);
  }

  render() {
    let buttonText = '';
    let testText = '';
    
    // Set the button text
    if (this.state.page + 1 === this.state.steps.length) {
      buttonText = 'Finish';
    } else {
      buttonText = 'Continue to Step ' + (this.state.page + 2);
    }

    // Return the component markup
    return (
      <div style={{...defaultStyle,display:'inlineblock',width: "25%"}}>
        <h3><span>{this.state.page + 1}</span> {this.state.steps[this.state.page].name}</h3>
        <div>{this.state.steps[this.state.page].instructions}</div>

        <div><ParameterSelector parameters={this.state.steps[this.state.page].parameters} /></div>

        <button className='btn btn-primary float-right' type='button' onClick={this.nextPage}>{buttonText}</button>
      </div>
    );
  }

  // later refactor into separate component
  nextPage() { 
    if (this.state.page+1 < this.state.steps.length) {
      this.setState({
        page: this.state.page+1
      });
    }
    console.log('Continue to ' + this.props.page.toString());
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipeData: {},
      filterString: '',
      currentPage: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({recipeData: fakeRecipeData});
    }, 1000);
  }
  render() {
    let stepsToRender = this.state.recipeData.recipe ? this.state.recipeData.recipe.steps
      /* FILTER CODE NOT NEEDED YET.filter(step =>
        step.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    )*/ 
    : []

    return (
      <div className='App'>
        {this.state.recipeData.recipe ?
          <div>
            <h1 style={{...defaultStyle, 'fontSize': '32px'}}>
              {this.state.recipeData.recipe.name}
            </h1>
            
            {/*<PlaylistCounter playlists={stepsToRender}/>
            <HoursCounter playlists={stepsToRender}/>
            
            <Filter 
              onTextChange={text => this.setState({filterString: text})} 
            />*/}
            
            {/*{stepsToRender.filter(step =>
              step.name.toLowerCase().includes(
                this.state.filterString.toLowerCase()
              )
            ).map((step,id) =>
              <RecipePage key={id.toString()} value={id} step={step}/>
              )}*/}

            <RecipePage page={currentPage} steps={stepsToRender}/>

          </div> : <h1 style={defaultStyle}>Loading Recipe...</h1>
        }
      </div>
    );
  }
}

export default App;