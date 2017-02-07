class RepProf extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      // key: this.props.apiKey
    }
    this.handleClick = this.handleClick.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
  }

  componentDidMount() {
    this.renderTabs();
  }

  componentDidUpdate() {
    this.renderTabs();
  }

  renderTabs() {
    $('.tabs li:nth-child(1)').click(function(event){
      $(this).addClass("active");
      $('.tabs li:nth-child(2)').removeClass("active");
      $('.tabs li:nth-child(3)').removeClass("active");
      $('.tab-content:visible').hide();
      $('.upcoming:hidden').show();
    });
    $('.tabs li:nth-child(2)').click(function(event){
      $(this).addClass("active");
      $('.tabs li:nth-child(1)').removeClass("active");
      $('.tabs li:nth-child(3)').removeClass("active");
      $('.tab-content:visible').hide();
      $('.history:hidden').show();
    });
    $('.tabs li:nth-child(3)').click(function(event){
      $(this).addClass("active");
      $('.tabs li:nth-child(1)').removeClass("active");
      $('.tabs li:nth-child(2)').removeClass("active");
      $('.tab-content:visible').hide();
      $('.tweets:hidden').show();
    });
  };

  // getMember(id) {
  //     // let key = this.state.key
  //     $.ajax({
  //       url:'https://api.propublica.org/congress/v1/members/' +id + '.json',
  //       beforeSend: function(request) {
  //         request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
  //       }
  //     })
  //     .done(function(response) {
  //       this.setState({singleRepresentative: response.results})
  //     }.bind(this))
  // }


//   getMemberBills(id) {
//       // let key = this.state.key
//       $.ajax({
//         url:'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json',
//         beforeSend: function(request) {
//           request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
//         }
//
//       })
//       .done(function(response) {
//         this.setState({repBills: response.results[0].bills})
//       }.bind(this))
//   }
//
//
//
// getTwitter(name){
//   $.ajax({
//     type: 'post',
//     url: 'maps/congress_tweets',
//     data: {twitter_account: { handle: name }}
//   })
//   .done(function(response){
//     this.setState({timeline: response})
//
//   }.bind(this))
// }
//
//   getHistoricalPositions(id) {
//
//     $.ajax({
//       url:'https://api.propublica.org/congress/v1/members/' + id + '/votes.json',
//       beforeSend: function(request) {
//         request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc");
//       }
//     })
//     .done(function(response) {
//       this.setState({historicalVotes: response.results[0].votes})
//
//     }.bind(this))
//
//
//   }

  handleClick(e) {
    e.preventDefault();

    this.setState({show: !this.state.show});

    name = e.target.innerHTML;
    memberId = this.refs[name].id;

    // This function uses twitter handle passed down as a prop
    //It can be bound to a different event
    this.props.onGetTwitter(this.props.data.twitter_id);
    this.props.onGetMember(memberId);
    this.props.onGetMemberBills(memberId);
    this.props.onGetHistoricalPositions(memberId);
  };




  render() {

    if(this.state.show == true) {
      // Displays Contact Information for Representative
      var details = (
         this.props.singleRepresentative.map(function(profile) {
            return(
              <div>
                <h3 className="soc-acc">Social Media </h3>
                  <a href={"http://www.facebook.com/" + profile.facebook_account}><i className="fa fa-facebook-official social-icon" aria-hidden="true"></i></a>
                  <a href={"http://www.twitter.com/" + profile.twitter_account}><i className="fa fa-twitter social-icon" aria-hidden="true"></i></a>

                <ul className="tabs">
                  <li className="active"><a href="#upcoming"><h3>Upcoming Bills</h3></a></li>
                  <li ><a href="#history"><h3>Vote History</h3></a></li>
                  <li><a href="#tweets"><h3>Tweets</h3></a></li>
                </ul>
              </div>
            )
          })
      )

      var billDetails = (

        this.props.repBills.map(function(bill) {
            return(
              <p className="upcoming-bills">{bill.title}</p>
            )
          })
        )

      var timeline = (
        this.props.timeline.map(function(tweet){
          return(
            <section>
            <blockquote className="twitter-tweet">
            <p>{tweet.text}</p>
            <p> -{tweet.user.name}(@{tweet.user.screen_name})</p>
            </blockquote>
            </section>
          )
        })

      )

      var historicalVotesPosition = (
          this.props.historicalVotes.map(function(vote) {
            return(
               <div>
                  <p>{vote.description}</p>
                  <span><p>{vote.date}</p></span><span><p>{vote.position}</p></span>
                </div>
              )
            })
          )
      }

    return(
       <div>
            <p className= "rep-name" id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
              {details}
            <div className="tab-content upcoming">
              {billDetails}
            </div>
            <div className="tab-content history">
              {historicalVotesPosition}
            </div>
            <div className="tab-content tweets">
              {timeline}
            </div>
        </div>
      )
  }

}
