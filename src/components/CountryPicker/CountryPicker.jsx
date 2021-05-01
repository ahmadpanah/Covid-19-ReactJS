import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = () => {

    const [fetchedCountries , setfetchedCountries] = useState([]);

    useEffect(()=> {
        const fetchAPI = async () => {
            setfetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setfetchedCountries]);


    return (
       <FormControl className={styles.FormControl}>
           <NativeSelect>
               <option value="global">World</option>
                {fetchedCountries.map((country , i) => <option key={i} value={country}>{country}</option> )};
           </NativeSelect>
       </FormControl>
    )
}

export default CountryPicker;