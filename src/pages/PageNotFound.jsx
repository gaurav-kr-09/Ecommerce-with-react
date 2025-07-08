import { Header } from "../components/Header";
import ErrorImage from '../assets/error404.png';
import { Link } from "react-router";
import './PageNotFound.css';

export function PageNotFound() {
  return (
    <>
      <title>Page Not Found</title>
      <link rel="shortcut icon" href="error-favicon.png" type="image/x-icon" />

      <Header />

      <div className="page-not">
        <div className="image-div">
          <img src={ErrorImage} alt="Page Not Found" className="error-div" />
        </div>

        <div className="pages-link-div">
          <Link to="/" className="pages-link">
            Click here to go to homepage
          </Link>
        </div>

        <div className="pages-link-div">
          <Link to="/checkout" className="pages-link">
            Click here to go to Checkout / Cart Page
          </Link>
        </div>

        <div className="pages-link-div">
          <Link to="/orders" className="pages-link">
            Click here to go to Orders Page
          </Link>
        </div>

      </div>

    </>
  );
}