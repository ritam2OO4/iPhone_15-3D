import { appleImg, bagImg, searchImg } from "../utils";
import {navLists} from '../Constants/index'
export default function Navbar() {
    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-center items-center">
            <nav className="w-full flex screen-max-width">
                <img src={appleImg} alt="apple" width={16} height={18}/>
                <div className="flex flex-1 justify-center max-sm:hidden items-center">
                    {navLists.map((nav) => (
                        <div
                            key={nav}
                            className="px-5 text-gray cursor-pointer text-sm hover:text-white transition-all"
                        >
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex cursor-pointer items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="search" width={18} height={18}/>
                    <img src={bagImg} alt="bag" width={18} height={18}/>
                </div>
            </nav>
        </header>
    )
}
