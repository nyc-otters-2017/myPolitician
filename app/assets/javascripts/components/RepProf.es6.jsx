class RepProf extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      // key: this.props.apiKey
    }
    this.handleClick = this.handleClick.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.votePosition = this.votePosition.bind(this)
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
      $('.upcoming').addClass("tab-content");
      $('.tab-content:visible').hide();
      $('.upcoming:hidden').show();
    });
    $('.tabs li:nth-child(2)').click(function(event){
      $(this).addClass("active");
      $('.tabs li:nth-child(1)').removeClass("active");
      $('.tabs li:nth-child(3)').removeClass("active");
      $('.upcoming').addClass("tab-content");
      $('.tab-content:visible').hide();
      $('.history:hidden').show();
    });
    $('.tabs li:nth-child(3)').click(function(event){
      $(this).addClass("active");
      $('.tabs li:nth-child(1)').removeClass("active");
      $('.tabs li:nth-child(2)').removeClass("active");
      $('.upcoming').addClass("tab-content");
      $('.tab-content:visible').hide();
      $('.tweets:hidden').show();
    });
  };


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

  votePosition(vote) {
    console.log(vote);
  };

  render() {

    if(this.state.show == true) {
      // Displays Contact Information for Representative
      var details = (
         this.props.singleRepresentative.map(function(profile) {
            return(
              <div>
                <div className="social-media">
                  <a href={"http://www.facebook.com/" + profile.facebook_account}><i className="fa fa-facebook-official social-icon" aria-hidden="true"></i></a>
                  <a href={"http://www.twitter.com/" + profile.twitter_account}><i className="fa fa-twitter social-icon" aria-hidden="true"></i></a>
                </div>
                <ul className="tabs">
                  <li className="active"><a href="#upcoming"><h3>Upcoming Bills</h3></a></li>
                  <li><a href="#history"><h3>Vote History</h3></a></li>
                  <li><a href="#tweets"><h3>Tweets</h3></a></li>
                </ul>
              </div>
            )
          })
      )

      var billDetails = (

        this.props.repBills.map(function(bill) {
            return(
              <div className="bills" >
                <p>{bill.title}</p>
              </div>
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
          this.props.historicalVotes.map((vote) => {
            return(
                <div className="bills">
                  <p>{vote.description}
                    <span className="vote-date">{vote.date}</span>
                  </p>
                  <div className="vote-container">
                    {this.votePosition(vote.description)}
                  </div>
                </div>
              )
            })
          )
      }

    return(
       <div>
            <p className= "rep-name" id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
              {details}
            <div className="upcoming tab-container">
              {billDetails}
            </div>
            <div className="tab-content history tab-container">
              {historicalVotesPosition}
            </div>
            <div className="tab-content tweets tab-container">
              {timeline}
            </div>
        </div>
      )
  }

}
