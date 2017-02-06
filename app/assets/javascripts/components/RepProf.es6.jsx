class RepProf extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      show: false,
      singleRep: [],
      repBills: [],
      timeline: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.getMember = this.getMember.bind(this)
    this.getMemberBills = this.getMemberBills.bind(this)
    this.getTwitter = this.getTwitter.bind(this)
  }

  componentDidMount() {


  }

  getMember(id){
      // let key = this.state.key
      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' +id + '.json',

        beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc")
        }
      })
      .then(function(response){
        // debugger
        this.setState({singleRep: response.results})
    }.bind(this))
  }


  getMemberBills(id){
      // let key = this.state.key
      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json',
        beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", "y3spXskaU43BBv4WCh6BazYtzVOToHf1ZUhTiiQc")
      }

      })
      .then(function(response) {

        this.setState({repBills: response.results[0].bills})
         // debugger

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

  handleClick(e){
    e.preventDefault()

    this.setState({show: !this.state.show})

    name = e.target.innerHTML
    memberId = this.refs[name].id

    this.getMember(memberId)
    this.getMemberBills(memberId)

    // This function uses twitter handle passed down as a prop
    //It can be bound to a different event
    this.getTwitter(this.props.data.twitter_id)


  };



  render(){
    if(this.state.show == true){
      console.log(this.state.show)


      var details = (
          //todo: make accessing indices more dynamic
          //todo: if you want to delete click on show
         this.state.singleRep.map(function(prof){
            return(
              <div>
                <p className="soc-acc">Social Media</p>
                <span><p>facebook:{prof.facebook_account}</p></span>
                <span><p>twitter:{prof.twitter_account}</p></span>
                <span><p>youtube:{prof.youtube_account}</p></span>
                <p>Bills Sponsored: {prof.roles[0].bills_sponsored}</p>
                <p>Upcoming Bills</p>
              </div>
            )
          })
      )

      var billDetails = (
        this.state.repBills.map(function(bill){
            return(
              <p>{bill.title}</p>
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
    return(
       <div>
          <p id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
          {details}
          {billDetails}

          {timeline}


        </div>
      )
  }
}
