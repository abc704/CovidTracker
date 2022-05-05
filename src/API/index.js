import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';


export const fetchData = async (country) => {
    let changeableUrl = url
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data } = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed: data.confirmed,
            // recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData;
    } catch (error) {
        console.log("Error fetching data from API")
    }
}


export const fetchDailyData = async () => {

    try {
        const { data } = await axios.get('https://covid19.mathdro.id/api/daily');
        const modifiedData = data.map(({ confirmed, deaths, reportDate: date }) => ({
            confirmed: confirmed.total,
            deaths: deaths.total,
            date,
        }))


        return modifiedData;
    } catch (error) {
        console.log("Error fetching data from API")
    }
}


export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get('https://covid19.mathdro.id/api/countries')
        const modifiedData = countries.map((country) => country.name)
        console.log(modifiedData)
        return modifiedData

    } catch (error) {
        console.log("Error fetching data from API")
    }
}