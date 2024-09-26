import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useDispatch } from "react-redux";
import { setUsers } from "../../slices/userSlice";


export default function Users() {
    const dispatch = useDispatch();
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);      

    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = () => {
      //  setLoading(true)
        axiosClient.get('/employee/1').then(({data})=>{
          //  setLoading(false)
          //  setUsers(data.data)
            // console.log(data);
            dispatch(setUsers(data))
        })
        .catch(()=>{
           // setLoading(false)
        })

    }
    return (
        <div>
            users
        </div>
    )
}