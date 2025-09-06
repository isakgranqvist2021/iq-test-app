'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

export default function NavDropdown() {
  const { user } = useUser();

  if (!user) {
    return (
      <li>
        <Link href="/auth/login">Log In</Link>
      </li>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        {user.picture ? (
          <div className="w-8 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user.picture} />
          </div>
        ) : (
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
              <span className="text-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          </div>
        )}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/auth/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
