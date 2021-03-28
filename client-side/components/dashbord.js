import React, {useEffect, useState, useContext} from 'react';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { TableUser } from './utils/table-user';
import { list, remove } from '../api/user.api';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { AppContext } from '../AppContext';

export const Dashbord = () => {

const [userList, setUserList] = useState([])
const [error, setError] = useState({
    delete : '',
})
const {hasLogger} = useContext(AppContext)
const [searchWords, setSearchWords] = useState('')
const [hasChange, setHasChange] = useState(false)
const [byGrid, setToGrid] = useState(false);

useEffect(() => {
    const abortController = new AbortController()
    list(abortController.signal).then(data => {
        setUserList(data)
    })
    return () => abortController.abort();
}, [hasChange, hasLogger])


const ListAllUser = () => {
    return userList.filter(useFilter).map((user, index) => {
        return (
            <TableUser user={user} key={index} index={index + 1} remove={removeUser}/>
        )
    } )
}
const removeUser = user => {
    remove(user).then(data => {
        if (data.error) setError({...error, delete : data.error})
        setHasChange(!hasChange)
    })    
}
const useFilter = user => {
    const byFName = user.firstname.toLowerCase().includes(searchWords.toLowerCase());
    const byLName = user.lastname.toLowerCase().includes(searchWords.toLowerCase());
    return byFName || byLName;
}
const handleSearch = event => {
    event.preventDefault();
    setSearchWords(event.target.value)
}
const renderByList = event => {
    event.preventDefault();
    setToGrid(false);
}
const renderByGrid = event => {
    event.preventDefault();
    setToGrid(true);
}
const renderBy = () => {
    if (!byGrid) {
        return (
            <ul className='listes-users'>
                {ListAllUser()}
            </ul>
        )
    } else {
        return (
        <ul className='grid-users'>
            {ListAllUser()}
        </ul>)
    }
}
return (
<>
<section className='section'>
    <div className='dashbord-top'>
        <div className='app-container'>
            <div className='top-utils'>
                <div className='icons-container'>
                    <div className={`icone ${byGrid ? '' : 'active'}`} onClick={renderByList}>
                        <AppsIcon/>
                    </div>
                    <div className={`icone ${byGrid ? 'active' : ''}`} onClick={renderByGrid}>
                        <FormatListBulletedIcon/>
                    </div>
                    <p>Affichage gride/ liste</p>                    
                </div>
                <div className='research'>
                    <div className='input-container'>
                        <div className='icons-search'>
                        <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Rechercher…"
                            onChange={handleSearch}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className='section user-section'>
    <div className='inner-section' style={{background : 'url(/bg-home.png)'}}>
        <div className='app-container'>
            {
                renderBy()
            }
        </div>
    </div>
</section>
</>
)
}