class App extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      key: this.props.CONGRESS_API,
      repInfo: [],
      houseMembers: []}
    this.getState = this.getState.bind(this)
    this.getHouseMember = this.getHouseMember.bind(this)
  }


  // TODO: Make more dynamic
  getState(state){
    let key = this.state.key

    $.ajax({
      url: 'https://api.propublica.org/congress/v1/members/senate/NY/current.json',

      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", key)
      }

    })
    .then(function(response){
        this.setState({repInfo : response.results})
    }.bind(this))
  }


  getHouseMember(district){
    let key = this.state.key

    $.ajax({
      url:'https://api.propublica.org/congress/v1/members/house/NY/' + district + '/current.json',

      beforeSend: function(request) {

        request.setRequestHeader("X-API-Key", key)
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

        <RepPage reps = {this.state.repInfo} singleRep = {this.state.singleRep} onGetMember = {this.getMember} houseMembers = {this.state.houseMembers} apiKey = {this.state.key} />
      </div>
      )


  }
}
