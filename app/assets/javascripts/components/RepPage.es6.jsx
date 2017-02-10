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
        {this.props.stateMembers.map(function(rep, i){
          return(
            <StateRepProf
              data                        ={rep}
              key                         ={i}
          
              // apiKey={this.props.apiKey}
              onGetTwitter                ={this.props.onGetTwitter}
              onGetMemberBills            ={this.props.onGetMemberBills}
              onGetHistoricalPositions    ={this.props.onGetHistoricalPositions}
              timeline                    ={this.props.timeline}
              repBills                    ={this.props.repBills}
              historicalVotes             ={this.props.historicalVotes}
              onGetStateMemberById        ={this.props.onGetStateMemberById}
              singleStateRep              ={this.props.singleStateRep}
              onGetStateMemberBills       ={this.props.onGetStateMemberBills}
              stateRepBills               ={this.props.stateRepBills}
              historicalStateRepVotes     ={this.props.historicalStateRepVotes}
              onGetStateRepHistoricalPositions ={this.props.onGetStateRepHistoricalPositions}
              />
           )
        }.bind(this))}
        <h2>My House Rep Info</h2>
        {this.props.houseMember.map(function(rep, i){
          return(
            <RepProf
              data                     ={rep}
              key                      ={i}
              singleRepresentative     ={this.props.singleRepresentative}
              onGetMember              ={this.props.onGetMember}
              onGetTwitter             ={this.props.onGetTwitter}
              onGetMemberBills         ={this.props.onGetMemberBills}
              onGetHistoricalPositions ={this.props.onGetHistoricalPositions}
              timeline                 ={this.props.timeline}
              repBills                 ={this.props.repBills}
              historicalVotes          ={this.props.historicalVotes}
              defaultShowInfo          ={this.props.defaultShowInfo}
              />
          )
        }.bind(this))}

      </section>
    )
  }
}
