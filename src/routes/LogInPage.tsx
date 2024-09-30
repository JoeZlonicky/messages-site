import { logIn } from '../api/calls/logIn';
import { useUser } from '../hooks/useUser';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogInPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { userDispatch } = useUser();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  async function attemptLogIn(event: FormEvent) {
    event.preventDefault();
    setErrorMessage('');
    setInfoMessage('Logging in...');

    const result = await logIn(formData.username, formData.password);

    if (result.success && result.user) {
      userDispatch({ type: 'logIn', user: result.user });
      navigate('/');
    }

    setFormData((previous) => ({ ...previous, password: '' }));
    setInfoMessage('');
    if (result.message) {
      setErrorMessage(result.message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 text-6xl text-accent">Messages</h1>
      <div className="card mx-auto w-full max-w-sm bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Log In</h2>

          <form
            className="text-accent"
            onSubmit={(event: FormEvent) => {
              void attemptLogIn(event);
            }}
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                className="input input-sm input-bordered w-full bg-neutral"
                value={formData.username}
                onChange={handleFormChange}
                name="username"
                required
              ></input>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                className="input input-sm input-bordered w-full bg-neutral"
                value={formData.password}
                onChange={handleFormChange}
                name="password"
                type="password"
                required
              ></input>
            </label>

            {infoMessage && (
              <div className="mt-4 text-center text-accent">{infoMessage}</div>
            )}
            {errorMessage && (
              <div className="mt-4 text-center text-error">{errorMessage}</div>
            )}

            <div className="card-actions justify-center">
              <button className="btn btn-accent mt-4" type="submit">
                Log In{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                </svg>
              </button>
            </div>

            <div className="mt-8 text-center text-neutral-content">
              Need an account?{' '}
              <Link to="/signup" className="link link-accent">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { LogInPage };
