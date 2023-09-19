'use client';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react'

function Logout() {
    const router = useRouter();
    const [error, setError] = React.useState('');
    const onLogout = async () => {
        try {
            deleteCookie('pb_auth');
            localStorage.clear();
            router.push('/auth/login');
        } catch (err) {
            setError('Failed to log out');
        }
    };
    return (
        <div>
            <button className='btn-danger' onClick={onLogout}>Log out</button>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default Logout