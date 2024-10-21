import { Link } from "react-router-dom";

export default function Button() {
  return (
    <>
      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      &nbsp; &nbsp;
      <Link to="/user" className="btn btn-light" href="">
        Cancel
      </Link>
    </>
  );
}
