import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Students from "./pages/Students";
import Marks from "./pages/Marks";
import Results from "./pages/Results";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Layout />}>

                <Route index element={<Navigate to="/students" />} />

                <Route path="students" element={<Students />} />

                <Route path="marks" element={<Marks />} />

                <Route path="results" element={<Results />} />

            </Route>

        </Routes>

    );

}

export default App;