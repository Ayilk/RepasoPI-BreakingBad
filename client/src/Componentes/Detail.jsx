import {React} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const {id} = useParams();
    const myCharacter = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    },[id,dispatch])

    return(
        <div>
            {
                myCharacter.length ?
                <div>
                    <h1>Soy {myCharacter[0].name}</h1>
                    <img src = {myCharacter[0].img? myCharacter[0].img : myCharacter[0].image}
                         alt = " "  width={"500px"}  height={"700px"}
                    />
                    <h2>Status: {myCharacter[0].status}</h2>
                    <p> Cumpleaños: {myCharacter[0].birthday} </p> 
                    <h4> Ocupaciones: {!myCharacter[0].createdInDb ? myCharacter[0].occupation + " " : 
                                        myCharacter[0].occupations.map(el => el.name + (' '))}</h4>    
                </div> : <p> Loading...</p>
            }
            <Link to='/home'> <button> Volver </button> </Link>
        </div>
    )

 
}