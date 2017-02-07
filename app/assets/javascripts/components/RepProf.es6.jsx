class RepProf extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      // key: this.props.apiKey
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate() {
  }


  handleClick(e) {
    e.preventDefault();

    this.setState({show: !this.state.show});

    name = e.target.innerHTML;
    memberId = this.refs[name].id;

    // This function uses twitter handle passed down as a prop
    //It can be bound to a different event
    // this.props.onGetTwitter(this.props.data.twitter_id);
    // this.props.onGetMember(memberId);
    // this.props.onGetMemberBills(memberId);
    // this.props.onGetHistoricalPositions(memberId);
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
                  <a href={"http://www.youtube.com/" + profile.youtube_account}><i className="fa fa-youtube social-icon" aria-hidden="true"></i></a>

                <ul className="tabs">
                  <li className="active"><a href="#whole_self"><h3>Upcoming Bills</h3></a></li>
                  <li ><a href="#kindness"><h3>Vote History</h3></a></li>
                  <li><a href="#whole_self"><h3>Tweets</h3></a></li>
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
            <div className="tab-content">
            {billDetails}
            </div>
            <div className="tab-content">
              {historicalVotesPosition}
            </div>
            <div className="tab-content">
              {timeline}
            </div>
        </div>
      )
  }
}
