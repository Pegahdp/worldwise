import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map: {lat} {lng}
    </div>
  );
}
