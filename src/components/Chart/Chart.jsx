import React, {useState , useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: {confirmed , recovered, deaths} , country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {

        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();

    });
    
    const lineChart = (
     dailyData[0]
        ? (
            <Line
                data={{
                    labels:dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333FF',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255 ,0 , 0, 0.5)',
                        fill: true,
                    }],
                    }}
            />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected' , 'Recovered' , 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgb(65, 34, 139)',
                        'rgb(17, 143, 55)',
                        'rgb(211, 31, 31)',
                    ],
                data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: { display: true , text: `Current State in ${country}`}
            }}
            />
        ) : null
    )

    return (
       <div className={styles.container}>
         {country ? barChart : lineChart}
       </div>
    )
}

export default Chart;