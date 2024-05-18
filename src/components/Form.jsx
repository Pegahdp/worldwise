import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [mapLat, mapLng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  useEffect(() => {
    async function fecthCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setErrorMsg("");
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "It doesn't seem to be a valid city. Click somewhere else 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fecthCityData();
  }, [mapLat, mapLng]);

  if (isLoadingGeoCoding) return <Spinner />;

  if (errorMsg) return <Message message={errorMsg} />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} selected={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
