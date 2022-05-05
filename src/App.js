import React from 'react';

import styles from './App.module.css'

import Cards from './Components/Cards/Cards'
import Chart from './Components/Chart/Chart'
import CoutryPicker from './Components/CountryPicker/CountryPicker'

import { fetchData } from './API/index'

import image from './Images/image.png'

class App extends React.Component{

    state = {
        data: {},
        country: '',
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country)

        this.setState({data, country: country})
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData })
    }

    render(){
        return(
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19"/>
                <Cards data={this.state.data}/>
                <CoutryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={this.state.data} country={this.state.country} />
            </div>
        )
    }
}

export default App