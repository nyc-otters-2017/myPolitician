class RepProf extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      singleRepresentative: [],
      repBills: [],
      timeline: [],
      historicalVotes: []
      // key: this.props.apiKey
    }
    this.handleClick = this.handleClick.bind(this)
    this.getMember = this.getMember.bind(this)
    this.getMemberBills = this.getMemberBills.bind(this)
    this.getTwitter = this.getTwitter.bind(this)
  }

  componentDidMount() {


  }

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


  getMemberBills(id) {
      // let key = this.state.key
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



getTwitter(name){
  $.ajax({
    type: 'post',
    url: 'maps/congress_tweets',
    data: {twitter_account: { handle: name }}
  })
  .done(function(response){
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
      debugger
    }.bind(this))


  }

  handleClick(e) {
    e.preventDefault();

    this.setState({show: !this.state.show});

    name = e.target.innerHTML;
    memberId = this.refs[name].id;


    // This function uses twitter handle passed down as a prop
    //It can be bound to a different event
    this.getTwitter(this.props.data.twitter_id)
    this.getMember(memberId);
    this.getMemberBills(memberId);
    this.getHistoricalPositions(memberId);

  };




  render() {

    if(this.state.show == true) {
      // Displays Contact Information for Representative
      var details = (
         this.state.singleRepresentative.map(function(profile) {
            return(
              <div>
                <h3 className="soc-acc">Social Media </h3>
                <span><p>facebook:{profile.facebook_account}</p></span>
                <span><p>twitter:{profile.twitter_account}</p></span>
                <span><p>youtube:{profile.youtube_account}</p></span>
                <p>Bills Sponsored: {profile.roles[0].bills_sponsored}</p>
                <h3 className="tab">Upcoming Bills</h3>
              </div>
            )
          })
      )

      var billDetails = (

        this.state.repBills.map(function(bill) {

            return(
              <div>
                <p>{bill.title}</p>
              </div>
            )
          })
        )

      var timeline = (
        this.state.timeline.map(function(tweet){
          return(
            <section>
            <h3>Tweets</h3>
            <p>{tweet.text}</p>
            </section>
          )
        })

      )

      }


      var historicalVotesPosition = (
        this.state.historicalVotes.map(function(vote) {
          return(
            <div>
              <h5>{vote.description}</h5>
              <span><h6>{vote.date}</h6></span><span><h6>{vote.position}</h6></span>
            </div>
          )
        })
      )



    }

    return(
       <div>
          <p id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
          {details}
          {billDetails}
          {historicalVotesPosition}

          {timeline}


        </div>
      )
  }
}
