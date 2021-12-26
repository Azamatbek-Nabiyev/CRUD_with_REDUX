import React,{useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function EditContact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const {id} = useParams();
    
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const currentContact = contacts.find(contact => contact.id === parseInt(id))

    useEffect(() => {
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact])

    const editContact = (e) => {
        e.preventDefault();
        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

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
            id: parseInt(id),
            name, 
            email, 
            number
        }
        dispatch({type: "UPDATE_CONTACT", payload: data})
        toast.success('Student updated succesfully !');
    }

    return (
        <div className='container'>
            {currentContact ? (
                <>
                    <div className='row'>
                        <h1 className='display-3 text-center'>
                            Edit Student
                        </h1>
                        <div className='col-md-6 mx-shadow mx-auto p-5 '>
                            <form onSubmit={editContact}>
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
                                    className='form-control mb-3 '
                                    value={number} 
                                    onChange={e => setNumber(e.target.value)}
                                    />
                                </div>
                                <div className='input-group'>
                                    <input type='submit' value='Update Student' className=' mr-3 btn btn-block btn-dark' />
                                    <Link to='/' className='btn btn-danger mx-4'>
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <div className='alert alert-danger' role='alert'>
                    Student Contact with id {id} not exists ! 
                </div>
            )}
        </div>
    )
}

export default EditContact
