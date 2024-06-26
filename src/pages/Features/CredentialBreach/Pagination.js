import React from 'react';
import './Pagination.scss';
const Pagination = (props) => {

    const PageNumbers = [];
    for(let i=1 ; i<= Math.ceil(props.totalPost/props.postPerPage) ; i++){
        PageNumbers.push(i);
    }
  return (
   <nav>
       <ul className='pagination justify-content-center'>
           <li className='page-item'>
               <a className='page-link'>Previous</a>
           </li>
           {PageNumbers.map(num =>(
           <li className='page-item' key={num}>
               <a onClick={() => props.paginate(num)} className='page-link'>{num}</a>
           </li>
           ))}
           <li className='page-item'>
               <a className='page-link'>Next</a>
           </li>
       </ul>
   </nav>
  );
};

export default Pagination;
