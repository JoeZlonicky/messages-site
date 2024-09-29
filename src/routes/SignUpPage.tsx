import { signUp } from '../api/calls/signUp';
import { useUser } from '../hooks/useUser';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    signUpSecret: '',
  });
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { userDispatch } = useUser();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  async function attemptSignUp(event: FormEvent) {
    event.preventDefault();
    setErrorMessages([]);
    setInfoMessage('Signing up...');

    const result = await signUp(
      formData.username,
      formData.displayName || formData.username,
      formData.password,
      formData.confirmPassword,
      formData.signUpSecret,
    );

    if (result.success && result.user) {
      userDispatch({ type: 'logIn', user: result.user });
      navigate('/');
    }

    setInfoMessage('');
    if (result.messages) {
      setErrorMessages(result.messages);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 text-6xl text-primary">Messages</h1>
      <div className="card mx-auto w-full max-w-sm bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Sign up</h2>

          <form
            className="text-accent"
            onSubmit={(event: FormEvent) => {
              void attemptSignUp(event);
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
                autoComplete="username"
                required
              ></input>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Display Name</span>
              </div>
              <input
                className="input input-sm input-bordered w-full bg-neutral"
                value={formData.displayName}
                onChange={handleFormChange}
                placeholder={formData.username}
                autoComplete="username"
                name="displayName"
                type="text"
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
                autoComplete="new-password"
                required
              ></input>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirm Password</span>
              </div>
              <input
                className="input input-sm input-bordered w-full bg-neutral"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
              ></input>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Secret Code (may be required)
                </span>
              </div>
              <input
                className="input input-sm input-bordered w-full bg-neutral"
                value={formData.signUpSecret}
                onChange={handleFormChange}
                name="signUpSecret"
                type="password"
                autoComplete="off"
              ></input>
            </label>

            {infoMessage && (
              <div className="mt-4 text-center text-info">{infoMessage}</div>
            )}
            {errorMessages.map((msg) => {
              return (
                <div className="mt-4 text-center text-error" key={msg}>
                  {msg}
                </div>
              );
            })}

            <div className="card-actions justify-center">
              <button className="btn btn-primary mt-4" type="submit">
                Sign up
              </button>
            </div>

            <div className="mt-8 text-center text-neutral-content">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { SignUpPage };
