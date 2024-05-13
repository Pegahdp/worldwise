import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCities } from "./CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  // if (!cities.length)
  //   return (
  //     <Message message="Add your firt city by clicking a city on the map" />
  //   );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.countries).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}
