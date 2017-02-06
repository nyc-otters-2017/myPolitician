class RepProf extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      singleRepresentative: [],
      repBills: [],
      // key: this.props.apiKey
    }
    this.handleClick = this.handleClick.bind(this)
    this.getMember = this.getMember.bind(this)
    this.getMemberBills = this.getMemberBills.bind(this)
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
      .then(function(response) {
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
      .then(function(response) {
        this.setState({repBills: response.results[0].bills})
      }.bind(this))
  }

  // getMemberHistoricalPositions(id) {
  //
  //   $.ajax({
  //
  //   })
  // }

  handleClick(e) {
    e.preventDefault();

    this.setState({show: !this.state.show});

    name = e.target.innerHTML;
    memberId = this.refs[name].id;

    this.getMember(memberId);
    this.getMemberBills(memberId);
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





    }
    return(
       <div>
          <p id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
          {details}
          {billDetails}

        </div>
      )
  }
}
