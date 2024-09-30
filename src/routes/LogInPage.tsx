import { logIn } from '../api/calls/logIn';
import { useUser } from '../hooks/useUser';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                Log In <FontAwesomeIcon icon={faRightToBracket} />
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
