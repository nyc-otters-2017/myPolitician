class App extends React.Component {

  constructor(){
    super()
    this.state = {repInfo: []}
    this.getState = this.getState.bind(this)


  }


  getState(state){

    $.ajax({
      url: 'https://api.propublica.org/congress/v1/members/house/' + state + '/current.json',

      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc")
      }

    })
    .then(function(response){
        this.setState({repInfo : response.results})
    }.bind(this))
  }





//Posts representative's policies to the RepInfo comp.
  // postRepInfo(){

  // }





  render(){
    return(
      <div>
      <h1>My Demo Map!</h1>
        <MapPage onGetState = {this.getState} />
        <RepPage reps = {this.state.repInfo} singleRep = {this.state.singleRep} onGetMember = {this.getMember} />
      </div>
      )
  }
}
