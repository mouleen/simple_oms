import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        /* footer sticky */
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop>
                <Navbar />
                    <Outlet />  
                <Footer />
            </ScrollToTop>
        </div>
    )
}