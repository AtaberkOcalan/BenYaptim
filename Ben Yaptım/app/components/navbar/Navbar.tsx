import { getCurrentUser } from "@/app/actions/getCurrentUser"
import Cart from "./Cart"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import Search from "./Search"
import User from "./User"



const Navbar = async () => {

    const currentUser = await getCurrentUser();

    return (
        <>
            <div className="flex justify-center h-20">
                <div style={{ width: "1200px" }} className="flex items-center gap-3 md:gap-10 px-3 text-xs">
                    <Logo />
                    <Search />
                    <User currentUser = {currentUser} />
                    <HamburgerMenu />
                    <Cart />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Navbar