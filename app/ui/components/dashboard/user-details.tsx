'use client';

import { useState } from 'react';
import Image from "next/image";
import UserDropdown from "./user-dropdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import { User } from '@/lib/api';

export default function UserDetails({ user }: { user: User | null }) {
    const [isOpen, setIsOpen] = useState(false);

    //Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="flex items-center gap-3 hover:bg-accent2 rounded-lg transition-all duration-200 ease-in-out p-2">
            {user?.firstName ? (
                <div className="flex items-center gap-2">
                    <Image
                        src='/image-avatar.png'
                        alt="Admin Avatar"
                        height={90}
                        width={90}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex gap-1.5">
                        <h2 className="text-label font-semibold text-primary">
                            {user.firstName}
                        </h2>
                        {user.lastName && (
                            <p className="text-label text-gray-500">
                                {user.lastName}
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Image
                        src="/image-avatar.png"
                        alt="Default Avatar"
                        height={80}
                        width={80}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-label font-semibold text-primary">
                            {user ? 'User' : 'Guest User'}
                        </h2>
                    </div>
                </div>
            )}

            {isOpen ? (
                <ChevronUp
                    className="text-primary cursor-pointer"
                    onClick={toggleDropdown}
                />
            ) : (
                <ChevronDown
                    className="text-primary cursor-pointer"
                    onClick={toggleDropdown}
                />
            )}

            {isOpen && <UserDropdown />}
        </div>
    )
}