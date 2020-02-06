import React, { Component } from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';

let currentPage = 0;
let defaultStyle = {
  color: '#000'
};
let fakeRecipeData = {
  recipe: {
    name: 'Salmon, Potatoes, and Green Beans',
    times: [
      { preparartion: 10}
    ],
    ingredients: [
      { name: 'Baby Leeks', amount: 3, unit: 'oz' },
      { name: 'Organic Fingerling Potatoes', amount: 0.5, unit: 'lb' },
      { name: 'Green Beans', amount: 5, unit: 'oz' },
      { name: 'Salmon Fillets', amount: 2, unit: '' },
      { name: 'Fresh Thyme', amount: 0.25, unit: 'oz' },
      { name: 'Fresh Flat-leaf Parsley', amount: 0.25, unit: 'oz' },
      { name: 'Champagne Vinegar', amount: 1, unit: 'Tbsp' },
      { name: 'Dijon Mustard', amount: 1, unit: 'Tbsp' },
      { name: 'Butter', amount: 1, unit: 'tsp' },
      { name: 'Cooking Oil', amount: 0, unit: '' },
      { name: 'Extra-virgin Olive Oil', amount: 0, unit: '' },
      { name: 'Kosher Salt and Black Pepper', amount: 0, unit: '' }
    ],
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
          {
            name: 'Thickness',
            options: [
              {label: '1"', value:1},
              {label: '1.25"', value:1.25},
              {label: '1.5"', value:1.5}
            ]
          },
          {
            name: 'Doneness',
            options: [
              {label: 'Rare', value: 113},
              {label: 'Medium Rare', value: 118},
              {label: 'Medium', value: 126},
              {label: 'Medium Well', value: 129},
              {label: 'Well Done', value: 133}
            ]
          }
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

/*class PlaylistCounter extends Component {
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
}*/

class ParameterSelector extends Component {
  constructor(props) {
    super(props);
    this.state={
      options: []
    }
    this.onChange = this.onChange.bind(this);    
  }
  
  // Change the selected value
  onChange(event) {
    event.target.checked = true;
    const group = event.target.name;
    const id = event.target.id;
    const option = {group, id, option: event.target.value };
    let options;
    if (this.state.options.some(option => option.group === group)) {
      options = [...this.state.options.filter(option => option.group !== group), option];
    } else {
      options = [...this.state.options, option];
    }
    this.setState(
      {
        options
      }, () => console.log(this.state.options)
    )
  }

  render() {
    let parameterOptions = [];

    this.props.parameters.map((parameter,key) => 
      (
        parameterOptions.push(
          <div key={key}>
            <div key={key} className='multi-selector-header'>
              {parameter.name}
            </div>
            <div className='multi-selector-group'>
              {
                parameter.options.map((option, index) => 
                  <div key={index} className='multi-selector-wrapper'>
                    <input 
                      type='radio' 
                      value={option.value}
                      id={key.toString() + index.toString()}
                      name={parameter.name} 
                      onChange={this.onChange}
                    />
                    <label htmlFor={key.toString() + index.toString()} key={index}>
                    
                    {option.label}<br />({parameter.name === "Doneness" ? option.value: ' '})
                  </label></div>
                )
              }
            </div>
          </div>
        )
      )
    );

    return (
      <div style={defaultStyle}><form>
        {parameterOptions}
      </form></div>
    )
  }
}

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      page: this.props.page,
      steps: this.props.steps,
    }

    // Navigation bindings
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  // Used for page transition effect
  /*componentWillUpdate() {
    setTimeout(() => {
      this.changePage();
    }, 1000);
  }*/

  changePage() {
    // Animation testing
    const wrapper = this.wrapperRef.current;
    wrapper.classList.toggle('flip');
  }

  render() {
    let buttonText = '';
    
    // Set the button text
    if (this.state.page + 1 === this.state.steps.length) {
      buttonText = 'Finish';
    } else {
      buttonText = 'Continue to Step ' + (this.state.page + 2);
    }

    // Return the component markup
    return (
      <div className='card'>

        <div className='instructions-wrapper'>
          <div ref={this.wrapperRef} className='instructions'>
            <h3><span className='step-counter'>{this.state.page + 1}</span> {this.state.steps[this.state.page].name}</h3>
            <div>{this.state.steps[this.state.page].instructions}</div>

            <div className='multi-selector'>
              <ParameterSelector parameters={this.state.steps[this.state.page].parameters} />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='nav'>
          <button className='btn' type='button' onClick={this.prevPage}>
            <FontAwesome
              name="fa-caret-left"
              className="fas fa-caret-left"
            />
          </button>

          <button className='btn next' type='button' onClick={this.nextPage}>{buttonText}</button>

          <button className='btn' type='button' onClick={this.lastPage}>
            <FontAwesome
              name="fa-step-forward"
              className="fas fa-step-forward"
            />
          </button>
        </div>
      </div>
    );
  }

  // Go forward a page
  // TODO: Later refactor into separate component
  nextPage() { 
    if (this.state.page+1 < this.state.steps.length) {
      this.setState({
        page: this.state.page+1
      });
    }
    console.log('Continue to ' + this.props.page.toString());
  }

  // Go back a page
  // TODO: Replace with page menu
  prevPage() {
    if (!this.state.page-1 < 0) {
      this.setState({
        page: this.state.page-1
      });
    }
  }

  // Skip to the next required input
  lastPage() {
    this.setState({
      page: this.state.steps.length-1
    });
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