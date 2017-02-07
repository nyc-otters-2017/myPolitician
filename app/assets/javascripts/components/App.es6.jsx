class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      key: this.props.CONGRESS_API,
      repInfo: [],
      houseMembers: []}
    this.getState = this.getState.bind(this)
    this.getHouseMember = this.getHouseMember.bind(this)
    this.getMember = this.getMember.bind(this)
  }

// Props for MapPage
////////////////////
  getState(state){
    // let key = this.state.key
    $.ajax({
      url: 'https://api.propublica.org/congress/v1/members/senate/NY/current.json',
      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
      }
    })
    .then(function(response) {
        this.setState({repInfo : response.results})
    }.bind(this))
  }


  getHouseMember(district) {
    // let key = this.state.key
    $.ajax({
      url:'https://api.propublica.org/congress/v1/members/house/NY/' + district + '/current.json',
      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
      }
    })
    .then(function(response) {
        this.setState({houseMembers: response.results})
    }.bind(this))

  }

// Rep Profile props
////////////////////

  getMember(id) {
      // let key = this.state.key
      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' +id + '.json',
        beforeSend: function(request) {
          request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
        }
      })
      .done(function(response) {
        this.setState({singleRepresentative: response.results})
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
