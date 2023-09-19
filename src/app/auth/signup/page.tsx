'use client';
import React from 'react'

function SignUpPage() {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const form = {email, password};
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                setError('Failed to register user');
                return;
            };
            const data = await response.json();
            console.log(data);
        } catch (err) {
            setEmail('Failed to register user');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value || '')}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value || '')}
                    />
                </div>

                <button type="submit">Sign Up</button>
                
                {error && <p className='error'>{error}</p>}
            </form>

            <div className="row">
                <div className="col-12">
                    <p>Already have an account? <a href="/auth/login">Log in</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage