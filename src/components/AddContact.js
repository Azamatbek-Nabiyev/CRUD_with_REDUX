import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AddContact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(state => state)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkEmail = contacts.find(contact => contact.email === email && contact)
        const checkNumber = contacts.find(contact => contact.number === number && contact)

        if(!email || !number || !name ){
            return toast.warning('Please fill in fields')
        }
        if (checkEmail){
            return toast.error('This email already Exists!')
        } 
        if (checkNumber){
            return toast.error('This number already Exists!')
        } 
        const data = {
            id: contacts[contacts.length - 1].id + 1 ,
            name, 
            email, 
            number
        }
        dispatch({type: "ADD_CONTACT", payload: data})
        toast.success('Student added succesfully !');
        setName('');
        setNumber('');
        setEmail('');
    }


    return (
        <div className='container'>
        <div className='row'>
            <h1 className='display-3 text-center'>
                Add Contact
            </h1>
            <div className='col-md-6 mx-shadow mx-auto p-5 '>
                <form onSubmit={handleSubmit} >
                    <div className='input-group'>
                        <input 
                        type='text' 
                        placeholder='name' 
                        className='form-control' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <input 
                        type='email' 
                        placeholder='email' 
                        className='form-control my-3 ' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <input 
                        type='number' 
                        placeholder='number' 
                        className='form-control' 
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <input 
                        type='submit' 
                        value='Add Student' 
                        className='btn btn-block btn-dark mt-3'/>
                        
                        <Link to='/'>
                        <input 
                        value='Cancel'
                        className=' w-50 btn btn-danger mt-3 mx-2'/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default AddContact
