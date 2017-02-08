class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      // key: this.props.CONGRESS_API,
      stateMembers: [],
      houseMember: [],
      singleRepresentative: [],
      repBills: [],
      timeline: [],
      historicalVotes: []
    }
    this.getStateMembers        = this.getStateMembers.bind(this)
    this.getHouseMember         = this.getHouseMember.bind(this)
    this.getMember              = this.getMember.bind(this)
    this.getMemberBills         = this.getMemberBills.bind(this)
    this.getTwitter             = this.getTwitter.bind(this)
    this.getHistoricalPositions = this.getHistoricalPositions.bind(this)
    this.getName                = this.getName.bind(this)


  }



// Props for MapPage
////////////////////
// Currently only returns senate members from NY state



  getName(name){
    member = this.state.houseMember.twitter_id
    // debugger
  }
  getStateMembers(){
    // let key = this.state.key
    $.ajax({
      url: 'https://api.propublica.org/congress/v1/members/senate/NY/current.json',
      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
      }
    })
    .then(function(response) {
      this.setState({stateMembers : response.results})
    }.bind(this))
  }

// Gets the house member of specific district
  getHouseMember(district) {
    // let key = this.state.key
    $.ajax({
      url:'https://api.propublica.org/congress/v1/members/house/NY/' + district + '/current.json',
      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
      }
    })
    .done(function(response) {
      this.setState({houseMember: response.results})
      // This way the twitter response is
      this.getTwitter(response.results[0].twitter_id)
    }.bind(this))

  }

// Rep Profile props
////////////////////




  getMember(id) {
      let key = this.state.key
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

  getMemberBills(id) {
      let key = this.state.key
      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json',
        beforeSend: function(request) {
          request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
        }

      })
      .done(function(response) {
        this.setState({repBills: response.results[0].bills})
      }.bind(this))
  }



  getTwitter(twitterHandle) {
    // debugger
    $.ajax({
      type: 'post',
      url: 'maps/congress_tweets',
      data: {twitter_account: { handle: twitterHandle }}
    })
    .done(function(response) {
      this.setState({timeline: response})
    }.bind(this))
  }


  getHistoricalPositions(id) {

    $.ajax({
      url:'https://api.propublica.org/congress/v1/members/' + id + '/votes.json',
      beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
      }
    })
    .done(function(response) {
      this.setState({historicalVotes: response.results[0].votes})

    }.bind(this))

  }





  render(){
    return(
      <div>
        <MapPage
          onGetName                 ={this.getName}
          houseMember               ={this.state.houseMember}
          onGetStateMembers         ={this.getStateMembers}
          onGetHouseMember          ={this.getHouseMember}
          onGetMember               ={this.getMember}
          onGetTwitter              ={this.getTwitter}
          onGetMemberBills          ={this.getMemberBills}
          onGetHistoricalPositions  ={this.getHistoricalPositions}

        />
        <RepPage
          stateMembers              ={this.state.stateMembers}
          singleRepresentative      ={this.state.singleRepresentative}
          onGetMember               ={this.getMember}
          houseMember               ={this.state.houseMember}
          // apiKey={this.state.key}
          onGetTwitter              ={this.getTwitter}
          timeline                  ={this.state.timeline}
          onGetMemberBills          ={this.getMemberBills}
          repBills                  ={this.state.repBills}
          onGetHistoricalPositions  ={this.getHistoricalPositions}
          historicalVotes           ={this.state.historicalVotes}

        />
      </div>
    )
  }
}
