class MapPage extends React.Component{

  constructor(){
    super()

  }

  render(){
    return(
      <State onGetState = {this.props.onGetState} onGetHouseMember={this.props.onGetHouseMember} />
    )
  }
}
