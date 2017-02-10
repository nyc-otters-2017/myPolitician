class StateRepProf extends React.Component {
	
	 constructor(props) {
    super(props)
    this.state = {
      // show: false,
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
    e.preventDefault()
    debugger
    this.setState({show: !this.state.show})

    name = e.target.innerHTML
    memberId = this.refs[name].id
    this.props.onGetStateMemberById(memberId)
    this.props.onGetStateMemberBills(memberId)       


  };


  votePosition(vote) {
    if(vote === "Yes"){
      return (<div className="vote-container"><p className='voted vote-date'>Voted</p><p className='vote-yes'>{vote}</p></div>)
    }
    else{
      return (<div className="vote-container"><p className='voted vote-date'>Voted</p><p className='vote-no'>{vote}</p></div>)
    }
  };


  render() {
    if(this.state.show == true) {
      // Displays Contact Information for Representative
      var details = (
         this.props.singleStateRep.map(function(profile, i) {
            return(
              <div key={i}>
                <div className="social-media">
                  <a href={"http://www.facebook.com/" + profile.facebook_account}><i className="fa fa-facebook-official social-icon" aria-hidden="true"></i></a>
                  <a href={"http://www.twitter.com/" + profile.twitter_account}><i className="fa fa-twitter social-icon" aria-hidden="true"></i></a>
                </div>
                <ul className="tabs">
                  <li className="active"><a href="#upcoming"><h3>Introduced Bills</h3></a></li>
                  <li><a href="#history"><h3>Vote History</h3></a></li>
                  <li><a href="#tweets"><h3>Tweets</h3></a></li>
                </ul>
              </div>
            )
          })
      );


      if(this.props.stateRepBills.length > 0) {
        var billDetails = (
          this.props.stateRepBills.map(function(bill,i) {
              return(
                <div key={i} className="bills" >
                  <p>{bill.title}</p>
                  <div className ="search-bill">
                    <a href={"https://www.congress.gov/search?q={%22source%22:%22legislation%22,%22search%22:%22" + bill.number + "%22}&searchResultViewType=expanded"}><span className="vote-date"><i className="fa fa-search search-icon" aria-hidden="true"></i>More Information</span></a>
                  </div>
                </div>
              )
            })
        )
      } else {
        var billDetails = (

            <p className="no-bills">This Representative has not introduced any recent bills</p>

        )
      };

      var timeline = (
        this.props.timeline.map(function(tweet,i){
          return(
            <section key={i}>
            <blockquote className="twitter-tweet">
            <p>{tweet.text}</p>
            <p> -{tweet.user.name}(@{tweet.user.screen_name})</p>
            </blockquote>
            </section>
          )
        })

      );

      var historicalVotesPosition = (
          this.props.historicalVotes.map((vote,i) => {
            return(
                <div key={i} className="bills">
                  <p>{vote.description}
                  <br></br><span className="vote-date text-right">{vote.date}</span><br></br>
                  </p>
                    {this.votePosition(vote.position)}
                </div>
              )
            })
          );
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
      );
  }
}