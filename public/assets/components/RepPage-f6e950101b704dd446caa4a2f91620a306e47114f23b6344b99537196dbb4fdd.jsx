class RepPage extends React.Component{
  constructor(props){
    super(props)
  }

componentDidMount() {
}
  render() {
    return(
      <section>
        <h2> My State Rep Info </h2>
        {this.props.stateMembers.map(function(rep, indx){
          return(
            <RepProf
              data={rep}
              singleRepresentative = {this.props.singleRepresentative}
              onGetMember={this.props.onGetMember}
              // apiKey={this.props.apiKey}
              onGetTwitter={this.props.onGetTwitter}
              onGetMemberBills={this.props.onGetMemberBills}
              onGetHistoricalPositions={this.props.onGetHistoricalPositions}
              timeline={this.props.timeline}
              repBills={this.props.repBills}
              historicalVotes={this.props.historicalVotes}
              />
           )
        }.bind(this))}
        <h2>My House Rep Info</h2>
        {this.props.houseMember.map(function(rep, indx){
          return(
            <RepProf
              data={rep}
              defaultShowInfo={this.props.defaultShowInfo}
              singleRepresentative = {this.props.singleRepresentative}
              onGetMember={this.props.onGetMember}
              onGetTwitter={this.props.onGetTwitter}
              onGetMemberBills={this.props.onGetMemberBills}
              onGetHistoricalPositions={this.props.onGetHistoricalPositions}
              timeline={this.props.timeline}
              repBills={this.props.repBills}
              historicalVotes={this.props.historicalVotes}
              />
          )
        }.bind(this))}

      </section>
    )
  }
}
