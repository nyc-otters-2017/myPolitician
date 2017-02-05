class RepProf extends React.Component{

  constructor(){
    super()

    this.state = {show: false, singleRep: [], repBills: []}

    this.handleClick = this.handleClick.bind(this)
    this.getMember = this.getMember.bind(this)

  }


  getMember(id){

      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' +id + '.json',

        beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", ENV['CONGRESS_API'])
      }

      })
      .then(function(response){
        // debugger
        this.setState({singleRep: response.results})
    }.bind(this))
  }


  getMemberBills(member){


      $.ajax({
        url:'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json',

        beforeSend: function(request) {
        request.setRequestHeader("X-API-Key", ENV['CONGRESS_API'])
      }

      })
      .then(function(response){

        this.setState({repBills: response.results[0].bills})
        debugger
    }.bind(this))
  }

  // getChamberBills(chamber){


  //     $.ajax({
  //       url: 'https://api.propublica.org/congress/v1/115/'+ chamber + '/bills/introduced.json',

  //       beforeSend: function(request) {
  //       request.setRequestHeader("X-API-Key", ENV['CONGRESS_API'])
  //     }

  //     })
  //     .then(function(response){

  //       this.setState({repBills: response.results[0].bills})
  //       debugger
  //   }.bind(this))
  // }

  handleClick(e){
    e.preventDefault()

    this.setState({show: !this.state.show})

    name = e.target.innerHTML
    memberId = this.refs[name].id

    this.getMember(memberId)
    this.getMemberBills(memberId)
    // this.getChamberBills(chamber)

  }



  render(){
    if(this.state.show == true){

      var details = (
          //TODO: make accessing indices more dynamic
         this.state.singleRep.map(function(prof){
            return(
              <div>
                <p className="soc-acc">Social Media</p>
                <span><p>facebook:{prof.facebook_account}</p></span>
                <span><p>twitter:{prof.twitter_account}</p></span>
                <span><p>youtube:{prof.youtube_account}</p></span>
                <p>Bills Sponsored: {prof.roles[0].bills_sponsored}</p>
                <p>Upcoming Bills</p>
                {this.state.repBills.map(function(bill){
                  return(
                  <p>{bill.title}</p>
                  )
                })}
              </div>

             )
          }
       )
      )
    }


    return(
       <div>
          <p id={this.props.data.id} ref = {this.props.data.name} ><a onClick={this.handleClick} href="#">{this.props.data.name}</a></p>
          {details}
        </div>
      )
  }
}
