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
        {this.props.reps.map(function(rep, indx){
          return(
            <RepProf
              data={rep}
              singleRep = {this.props.singleRep}
              onGetMember={this.props.onGetMember}
              // apiKey={this.props.apiKey}
              />
           )
        }.bind(this))}
        <h2>My House Rep Info</h2>
        {this.props.houseMembers.map(function(rep, indx){
          return(
            <RepProf
              data={rep}
              singleRep = {this.props.singleRep}
              onGetMember={this.props.onGetMember} />
          )
        }.bind(this))}

      </section>
    )
  }
}
