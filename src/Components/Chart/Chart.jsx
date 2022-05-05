import React from 'react'
import { useEffect, useState } from 'react'
import { fetchDailyData } from '../../API/index'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

// export default function Chart({data:{ confirmed, recovered, deaths }, country}) {
export default function Chart({ data: { confirmed, deaths }, country }) {

    const [dailydata, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData)
        }
        fetchAPI()
    }, [])

    const linechart = (
        dailydata.length !== 0
            ? (
                <Line
                    data={{
                        labels: dailydata.map(({ date }) => date),
                        datasets: [{
                            data: dailydata.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true
                        },
                        {
                            data: dailydata.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true
                        }]
                    }}

                />
            ) : null
    )

    const barchart = (
        confirmed
            ? (
                <Bar
                    data={{
                        // labels: ['Infected', 'Recovered', 'Deaths'],
                        labels: ['Infected', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            // data: [confirmed.value, recovered.value, deaths.value]
                            data: [confirmed.value, deaths.value]
                        }]

                    }}
                    options={{
                        legends: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barchart : linechart}
        </div>
    )
}
