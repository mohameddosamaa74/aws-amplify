import react,  { Component } from 'react';
class Forget extends Component{
    state={
        mobile:"",
        code:"",
        pass:"",
        confirm:"",
        error:{}
    };
    handlesub=async e=>{
        e.preventDefault();
        const error=this.valid();
    if(error)return;
        //back end
       //s const url="https://backend-api-tabarani.herokuapp.com/api/users";
    
    };
    valid = () =>{
        const error={};
        if(this.state.mobile.trim()==="")
        error.username="mobile is require";
        if(this.state.pass.trim()==="")
        error.pass="password is require";
        if(this.state.confirm!==this.state.pass)
        error.confirm="must enter the same pass";
        if(this.state.code.trim()==="")
        error.pass="coder is require";
        this.setState({error})
        return Object.keys(error).length===0 ? null:error;
    };
    handlechange=(e)=>{
    let state={...this.state};
    state[e.currentTarget.name]=e.currentTarget.value;
    this.setState(state);
    };
  render(){
  return (
    <react.Fragment>
             <form onSubmit={this.handlesub}className="container">
  <div className="mb-3">
    <label htmlFor="exampleInputmobile" className="form-label">mobile</label>
    <input name="mobile" onChange={this.handlechange} type="text" className="form-control" id="exampleInputmobile"/>
  {this.state.error.mobile&&  <div className="alert alert-danger">{this.state.error.mobile}</div>}
  </div>
  <button type="submit" className="btn btn-primary">confirm</button>
</form>
    </react.Fragment>
  );}
}

export default Forget;
