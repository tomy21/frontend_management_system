import React, { useEffect, useState } from 'react';
import { MdNotes } from 'react-icons/md';
import { Users } from '../Utils/ApiUsers';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [name, setName] = useState(" ");
    const [role, setRole] = useState(null);
    const [initial, setInitial] = useState(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await Users.getById();
            console.log(response)
            setName(response.data.user.UserName);
            setRole(response.data.user.Role);
            setInitial(response.data.user.Initial);

        };

        fetchUser();
    }, []);

    return (
        <>
            <header className="bg-white border border-gray-200 -mt-2 rounded-md shadow-md mb-3 w-full">
                <nav
                    aria-label="Global"
                    className="mx-auto flex max-w-7xl items-center justify-between p-3 h-14"
                >
                    <div className="flex lg:flex-1">
                        <MdNotes size={30} />
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-2">
                        <div className="flex flex-col justify-end items-end">
                            <h1 className="text-xs font-semibold">{name}</h1>
                            <p className="text-xs font-light">{role}</p>
                        </div>
                        <div className="flex justify-center items-center p-2 rounded-full bg-red-100">
                            {initial}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
