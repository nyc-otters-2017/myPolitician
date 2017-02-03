class RepPage extends React.Component{

  constructor(){
    super()



  }




  render(){


    return(
      <section>

        <h1>My Rep Info</h1>

        {this.props.reps.map(function(rep, indx){
          return(

            <RepProf  data={rep} singleRep = {this.props.singleRep} onGetMember={this.props.onGetMember} />

           )

        }.bind(this))}

      </section>
    )
  }
}

