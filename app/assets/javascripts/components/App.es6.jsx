class App extends React.Component {


  constructor(){
    super()
    this.state = {repInfo: [], houseMembers: []}
    this.getState = this.getState.bind(this)
    this.getHouseMember = this.getHouseMember.bind(this)


  }


  // TODO: Make more dynamic
  getState(state){

    $.ajax({
      url: 'https://api.propublica.org/congress/v1/members/senate/NY/current.json',

      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "")
      }

    })
    .then(function(response){
        this.setState({repInfo : response.results})
    }.bind(this))
  }


  getHouseMember(district){

    $.ajax({
      url:'https://api.propublica.org/congress/v1/members/house/NY/' + district + '/current.json',

      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "")
      }

    })
    .then(function(response){

        this.setState({houseMembers: response.results})
        // debugger
    }.bind(this))

  }


  render(){
    return(
      <div>

        <MapPage onGetState = {this.getState} onGetHouseMember={this.getHouseMember} />

        <RepPage reps = {this.state.repInfo} singleRep = {this.state.singleRep} onGetMember = {this.getMember} houseMembers = {this.state.houseMembers} />
      </div>
      )


  }
}
