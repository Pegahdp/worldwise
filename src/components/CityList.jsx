import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your firt city by clicking a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} />
      ))}
    </ul>
  );
}
