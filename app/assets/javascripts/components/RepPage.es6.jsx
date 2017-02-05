class RepPage extends React.Component{

  constructor(){
    super()



  }




  render(){


    return(
      <section>

        <h1>My House Rep Info</h1>

        {this.props.houseMembers.map(function(rep, indx){
          return(

            <RepProf  data={rep} singleRep = {this.props.singleRep} onGetMember={this.props.onGetMember} />

           )

        }.bind(this))}

        <h1> My State Rep Info </h1>

        {this.props.reps.map(function(rep, indx){
          return(

            <RepProf  data={rep} singleRep = {this.props.singleRep} onGetMember={this.props.onGetMember} />

           )

        }.bind(this))}


      </section>
    )
  }
}

