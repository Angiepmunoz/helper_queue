import React, { useEffect } from 'react';
import { fetchAllPairLists, selectPairLists } from './pairsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  CustomNavLink as NavLink,
  CustomLink as Link,
} from "../../util/customLinks";

export default function Pairs() {
    const dispatch = useDispatch();

    const pairLists = useSelector(selectPairLists);

    useEffect(() => {
        dispatch(fetchAllPairLists())
    }, [])
    
    return (
      <div className="adminContainer">
        <h1>Pairs</h1>
        <Link to="/pairs/create">Create A New Pair List</Link>
        <ul>
            {pairLists.map(pair => {
                return (<li key={pair.id}>
                    <Link to={"/pairs/view/" + pair.id}>{pair.title }</Link>
                </li>
                );
            })}
        </ul>
      </div>
    );
};
