import { Link } from "react-router";

function Nav() {
  return (
    <nav>
      <div className="navContainer">
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/calendar">Calender</Link>
        &nbsp; | &nbsp;
        <Link to="/todos">To Do List</Link>
        &nbsp; | &nbsp;
        <Link to="/braindump">Brain Dump</Link>
      </div>
      <div>Sign Out</div>
    </nav>
  );
}
export default Nav;
