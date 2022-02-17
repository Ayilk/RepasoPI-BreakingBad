import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterCharactersByStatus, filterCreated, getCharacters, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home (){
     const dispatch = useDispatch();
     const allCharacters = useSelector((state) => state.characters);

     const [currentPage, setCurrentPage] = useState(1);
     const [ charactersPerPage, setCharactersPerPage] = useState(6);
     const [orden, setOrden] = useState('');
     const indexOfLastCharacter = currentPage * charactersPerPage;
     const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
     const currentCharacters =  allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter);
     
     const paginado = (pageNumber) => {
         setCurrentPage(pageNumber)
     }
    
     useEffect(() => {
         dispatch(getCharacters());
     },[dispatch])

     function handleClick(e) {
         e.preventDefault();
         dispatch(getCharacters());
     };

     function handleFilterStatus(e){
         dispatch(filterCharactersByStatus(e.target.value))
     };

     function handleFilterCreated(e){
         dispatch(filterCreated(e.target.value))
     };

     function handleSort(e){
         
         dispatch(orderByName(e.target.value));
         setCurrentPage(1);
         setOrden(`Ordenado ${e.target.value}`)
     };

     return (
         <div>
             <Link to= '/character'> Crear Personaje </Link>
             {/* <h1> AGUANTE BREAKING BAD </h1> */}
             <button onClick = {e => {handleClick(e)}}>
                 Volver a cargar todos los personajes
             </button>
         
         <div>
             <select onChange = {e => handleSort(e)}> 
                 <option value = 'asc'>Ascendente</option>
                 <option value = 'desc'>Descendente</option>
             </select>
             <select onChange =  {e => handleFilterStatus(e)}>
                <option value = 'All'>Todos</option> 
                <option value = 'Alive'>Vivo</option>
                <option value = 'Deceased'>Muerto</option>
                <option value = 'Unknown'>Desconocido</option>
                <option value = 'Presumed dead'>Probablemente muerto</option>
             </select>
             <select onChange = {e => handleFilterCreated(e)}>
                <option value = 'All'>Todos</option>
                <option value = 'created'>Creados</option>
                <option value = 'api'>Existentes</option>
             </select>

             <Paginado
                charactersPerPage= {charactersPerPage}
                allCharacters= {allCharacters.length}
                paginado= {paginado}
             />
             <SearchBar/>

        {
            currentCharacters?.map((c) => {
                return(
                    <div >
                        <Link to = {"/home/" + c.id} >
                        <Card name={c.name} 
                        image={c.img ? c.img : c.image} 
                        nickname={c.nickname} 
                        key={c.id} 
                        />
                        </Link>
                    </div>
                )
            })
        }
         </div>
         </div>
     )
}