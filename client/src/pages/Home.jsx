import react, { useEffect } from "react";
import Axios from 'axios'
import { useState } from "react";
import axios from "axios";

const Home = () => {
    
    const [name, setName ] = useState('')
    const [age, setAge ] = useState(0)
    const [gender, setGender ] = useState('')
    const [ nationality, setNationality ] = useState('')
    const [employeeList, setEmployeeList ] = useState([])
    const [newEmployee, setNewEmployee ] = useState('')
 
    useEffect(()=> {
        Axios.get('http://localhost:3001/employees').then((res) => {
            setEmployeeList(res.data)
        })
    }, [])

    const addEmployee = () => {
        Axios.post('http://localhost:3001/create', {
            name: name, 
            age: age, 
            gender:gender, 
            nationality:nationality}).then(()=> {
                console.log(`successfully added:${name+age+gender+nationality}`);
            })
    }

    const getEmployees = () => {
       return employeeList
    }

    const deleteEmployee = (employee) => { 
        Axios.delete(`http://localhost:3001/delete/${employee}`)
    }
    const updateEmployee = (employee) => { 
        Axios.delete(`http://localhost:3001/update/${employee}`, {

        })
    }
    console.log(gender)
    return (
        <div className="Home">
            <div className="form">
               < div className="box">
                <label >Name</label>
                <input type="text" onChange={ (e) => { setName(e.target.value)} } />
            </div>
            <div className="box">
                <label >Age</label>
                <input type="number" onChange={ (e) => { setAge(e.target.value)} } />
            </div>
            <div className="box">
                <label >Nationality</label>
                <input type="text" onChange={ (e) => { setNationality(e.target.value)} } />
            </div>
            <div className="box">
                <label >Gender</label>
                <select name="gender" id="" onChange={ (e) => { setGender(e.target.value)} } >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Rather Not Say">Rather Not Say</option>
                </select>
            </div>
            <button type="submit" onClick={addEmployee}>Submit</button>
            </div>
            <div className="info">
                {employeeList.map( (employee, key)=> {
                    return(<div key={employee.id} className="">
                        <p>{employee.name}</p>
                        <p>{employee.age}</p>
                        <p>{employee.nationality}</p>
                        <p>{employee.gender}</p>
                        <button onClick={() => deleteEmployee(employee.name)} className="delete" >Delete</button>
                    </div>)
                })

                }
            </div>
        </div>
    )
}

export default Home