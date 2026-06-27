import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>Student Result</h2>

            <nav>

                <NavLink to="/students">
                    Students
                </NavLink>

                <NavLink to="/marks">
                    Marks
                </NavLink>

                <NavLink to="/results">
                    Results
                </NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;