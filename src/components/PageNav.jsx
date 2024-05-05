import { NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/product">
          <li>Product</li>
        </NavLink>
        <NavLink to="/pricing">
          <li>Pricing</li>
        </NavLink>
      </ul>
    </nav>
  );
}
