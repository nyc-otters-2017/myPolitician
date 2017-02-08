class MapPage extends React.Component {

  constructor() {
    super()
  }
componentDidMount(){

}
  render() {
    return(
      <State
        onGetName                 ={this.props.onGetName}
        houseMember               ={this.props.houseMember}
        onGetStateMembers         ={this.props.onGetStateMembers}
        onGetHouseMember          ={this.props.onGetHouseMember}
        onGetMember               ={this.props.onGetMember}
        onGetTwitter              ={this.props.onGetTwitter}
        onGetMemberBills          ={this.props.onGetMemberBills}
        onGetHistoricalPositions  ={this.props.onGetHistoricalPositions}
        />
    )
  }
}
