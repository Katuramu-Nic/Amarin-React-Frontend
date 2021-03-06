import { variables } from './Variables.js';
import React, {Component} from 'react';
export class Customers extends Component{
    constructor(props){
        super(props);
        
        this.state={
            customers:[],
            departments:[],
            ModaTitle:"",
            CustomerName:"",
            DepartmentName:"",
            Country:"",
            CustomerId:0
        }

    }
    refreshList(){
        fetch(variables.API_URL+'customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({customers:data});
        });
        fetch(variables.API_URL+'departments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changeCustomerName=(e)=>{
        this.setState({CustomerName:e.target.value});
    }
    changeDepartmentName=(e)=>{
        this.setState({DepartmentName:e.target.value});
    }
    changeCountry=(e)=>{
        this.setState({Country:e.target.value});
    }
    AddClick(){
        this.setState({
            modalTitle:"Add Customer",
            CustomerId:0,
            CustomerName:"",
            DepartmentName:"",
            Country:""

        });
        
    }
    editClick(cus) {
                this.setState({
                    modalTitle:"Update Department",
                    CustomerId:cus.CustomerId,
                    CustomerName:cus.CustomerName,
                    DepartmentName:cus.DepartmentName,
                    Country:cus.Country
        });
    }
    createClick(){
        fetch(variables.API_URL+'customers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body:JSON.stringify({
            CustomerName:this.state.CustomerName,
            DepartmentName:this.state.DepartmentName,
            Country:this.state.Country,
        })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed')
        })
    }
    //Updating
    updateClick(){
        fetch(variables.API_URL+'customers',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body:JSON.stringify({
            CustomerName:this.state.CustomerName,
            DepartmentName:this.state.DepartmentName,
            Country:this.state.Country,
        })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed')
        })
    }
    //Deleting
     //Updating
     deleteClick(id){
         if(window.confirm("Confirm Deleting")){
        fetch(variables.API_URL+'customers/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed')
        })}
    }
    render(){
        const{
        customers,
        departments,
        modalTitle,
        CustomerId,
        CustomerName,
        DepartmentName,
        Country}=this.state;

        return(<div>
               <button type="button" className="btn btn-primary m-2 float-end" 
               data-bs-toggle="modal"
               data-bs-target="#exampleModal"
               onClick={()=>this.AddClick()}>
                   Create Customer
               </button>
  

             
       <table className="table table-striped">
        <thead> 
               <tr>
                   <th>CutomerID</th>
                   <th>Customer Name</th>
                   <th>Department Name</th>
                   <th>Country</th>
                   <th>Options</th>
               </tr>
           </thead> 
        <tbody>
        
        {customers.map(cus=>  
        <tr key={cus.CustomerId}>
        <td>{cus.CustomerId}</td>
        <td>{cus.CustomerName}</td>
        <td>{cus.DepartmentName}</td>
        <td>{cus.Country}</td>
        <td>
        <button class="button"
        className="btn btn-light mr-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={()=>this.editClick(cus)}>
            
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        </button>
        <button class="button"
        className="btn btn-light mr-1"
        onClick={()=>this.deleteClick(cus.CustomerId)}>
            
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </button>
        </td>
        </tr>)}
   </tbody>
   </table>
   
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title">{modalTitle}</h5>
<button type="button" className="btn-close" data-bs-dismiss="modal" arial-label="close"></button>
</div>



<div className="modal-body">
<div className="input-group mb-3">
<span className="input-group-text">Customer Name</span>
<input type="text" className="form-control"
value={CustomerName}
onChange={this.changeCustomerName}/>
</div>

<div className="input-group mb-3">
            <span className="input-group-text">Department Name</span>
            <select className="form-select"
            onChange={this.changeDepartmentName}
            value={DepartmentName}>
                {departments.map(dep=><option key={dep.DepartmentId}>
                    {dep.DepartmentName}
                    </option>)}
            </select>
        </div>

<div className="modal-body">
<div className="input-group mb-3">
<span className="input-group-text">Country</span>
<input type="text" className="form-control"
value={Country}
onChange={this.changeCountry}/>
</div>
</div>

{CustomerId==0?
<button type="button" 
className="btn btn-primary float-start"
onClick={()=>this.createClick}>Create</button>
:null}

{CustomerId!=0?
<button type="button"
 className="btn btn-primary float"
 onClick={()=>this.updateClick}
 >Update</button>
:null}

</div>
</div>
</div>
</div>
</div>


        )
    }
}
