import { useNavigate, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  return (
    <div className="my-8 text-center">
      <h1 className="text-6xl text-accent">Oops!</h1>
      <p className="my-2">Sorry, an unexpected error has occcurred.</p>
      <p className="">
        Return to the{' '}
        <span className="link text-accent" onClick={() => navigate('/')}>
          main page
        </span>
        .
      </p>
    </div>
  );
}

export { ErrorPage };
