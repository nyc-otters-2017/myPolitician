class MapPage extends React.Component {

  constructor() {
    super()
  }

  render() {
    return(
      <State
        onGetStateMembers = {this.props.onGetStateMembers}
        onGetHouseMember={this.props.onGetHouseMember}
        onGetMember={this.props.onGetMember}
        />
    )
  }
}
