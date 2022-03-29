import { variables } from './Variables.js';
import React, {Component} from 'react';
export class Employees extends Component{
    constructor(props){
        super(props);
        this.state={
            employees:[],
            departments:[],
            modalTile:"",
            EmployeesName:"",
            DepartmentName:"",
            Country:"",
            DateofJoining:"",
            EmployeeId:0

        }
    }
    refreshList(){
        fetch(variables.API_URL+'employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
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
    changeEmployeesName=(e)=>{
        this.setState({EmployeesName:e.target.value});
    }
    changeDepartmentName=(e)=>{
        this.setState({DepartmentName:e.target.value});
    }
    changeCountrty=(e)=>{
        this.setState({Country:e.target.value});
    }
    changeDateofJoining=(e)=>{
        this.setState({DateofJoining:e.target.value});
    }
    AddClick(){
        this.setState({
            modalTitle:"Create Employee",
            EmployeeId:0,
            EmployeesName:"",
            DepartmentName:"",
            Country:"",
            DateofJoining:"",
        });
        
    }
    editClick(emp){
        this.setState({
            modalTitle:"Update Employee",
            EmployeeId:emp.EmployeeId,
            EmployeesName:emp.EmployeesName,
            DepartmentName:emp.DepartmentName,
            Country:emp.Country,
            DateofJoining:emp.DateofJoining,
        });
        
    }
    createClick(){
        fetch(variables.API_URL+'employees',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body:JSON.stringify({
            EmployeesName:this.state.EmployeesName,
            DepartmentName:this.state.DepartmentName,
            Country:this.state.Country,
            DateofJoining:this.state.DateofJoining
        })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
      updateClick(){
        fetch(variables.API_URL+'employees',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body:JSON.stringify({
            EmployeeId:this.state.EmployeeId,
            EmployeesName:this.state.EmployeesName,
            DepartmentName:this.state.DepartmentName,
            Country:this.state.Country,
            DateofJoining:this.state.DateofJoining
        })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Confirm Deletion'))
        fetch(variables.API_URL+'employees/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        }})
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    render(){
const{
    employees,
    departments,
    modalTitle,
    EmployeeId,
    EmployeesName,
    DepartmentName,
    Country,
    DateofJoining}=this.state;

        return( <div>
            <button type="button" className="btn btn-primary m-2 float-end" 
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.AddClick()}>
                Create Employees
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employees Name</th>
                        <th>Department Name</th>     
                        <th>Country</th>
                        <th>DateofJoining</th>
                        <th>Options</th>  
                            </tr>
                </thead>
                <tbody>
                    
                    {employees.map(emp=>
                <tr key={emp.EmployeeId}>
                    <td>{emp.EmployeeId}</td>
                    <td>{emp.EmployeesName}</td>
                    <td>{emp.DepartmentName}</td>
                    <td>{emp.Country}</td>
                    <td>{emp.DateofJoining}</td>
                    <td>
                    <button class="button"
        className="btn btn-light mr-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={()=>this.editClick(emp)}>
            
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        </button>

        <button class="button"
        className="btn btn-light mr-1"
        onClick={()=>this.deleteClick(emp.EmployeeId)}>
            
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </button>
                    </td>
                     </tr>   )}
                </tbody>
            </table>
<div className="modal fade" id="exampleModal" tabIndex="-1" arial-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title">{modalTitle}</h5>
<button type="button" className="btn-close" data-bs-dismiss="modal" arial-label="Close"></button>
    </div>
    <div className="modal-body">
        <div className="input-group mb-3">
            <span className="input-group-text">Employee Name</span>
            <input type="text" className="form-control"
            value={EmployeesName}
            onChange={this.changeEmployeesName}/>
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
        <div className="input-group mb-3">
            <span className="input-group-text">Country</span>
            <input type="text" className="form-control"
            value={Country}
            onChange={this.changeCountrty}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Date Of Joining</span>
            <input type="date" className="form-control"
            value={DateofJoining}
            onChange={this.changeDateofJoining}/>
        </div>
     
 
        {EmployeeId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}>
            Create
        </button>
        :null}

        {EmployeeId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}>
            Update
        </button>
        :null}

</div>
</div>
</div>
</div>
</div>
       
       )
    }
}

