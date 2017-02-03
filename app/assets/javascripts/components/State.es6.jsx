class State extends React.Component{

  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this)

  }



  getDistrict(){



  }

  handleClick(e){
    e.preventDefault
    state = e.target.innerHTML
    this.props.onGetState(state)

    thi
    //TODO: add a prop func that posts gets data and sets the state of rep
    //info in the app
    //onGetState

  }

  render(){
    return(
        <div>
          <p>Note: this is a broad demonstration of how the app should function</p>
          <span><button onClick={this.handleClick}>NY</button></span>
          <p><a onClick={}>
          <span><button onClick={this.handleClick}>CA</button></span>
          <span><button  onClick={this.handleClick}>TX</button></span>
        </div>
    )
  }
}
