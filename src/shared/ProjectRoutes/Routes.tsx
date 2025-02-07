import {Route, Routes} from "react-router-dom";
import SiteLayout from "../Layout/index.ts";
import {LoginPage} from "../../pages/Login/LoginPage.tsx";
import {MainPage} from "../../pages/Main/MainPage.tsx";
import NoMatch from "../../pages/NoMatch/NoMatch.tsx";

export const ProjectRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SiteLayout/>}>
                <Route index element={<LoginPage/>} />
                <Route path='main' element={<MainPage/>}> </Route>
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes >
    )
}
