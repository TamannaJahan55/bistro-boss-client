import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/salad'>Order Food</Link></li>
        <li><Link to='/signUp'>SignUp</Link></li>
        
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        
        <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                    <FaShoppingCart className="mr-2 text-white"></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>

        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : <>
                <li><Link to='/login'>Login</Link></li>
            </>
        }
    </>
    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <div className="flex gap-2">
                            <div className="flex-col">
                                <label tabIndex={0} className="btn btn-ghost btn-circle normal-case avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} title={user.displayName} />
                                    </div>
                                </label>
                                <div>
                                    <p className="text-white text-center font-semibold normal-case">{user.displayName}</p>
                                </div>
                            </div>
                        </div>
                            :
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;