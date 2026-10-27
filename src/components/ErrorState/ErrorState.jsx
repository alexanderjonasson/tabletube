import "./ErrorState.css";

const ErrorState = ({ title, message }) => {
  return (
    <div className="error-state">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorState;
