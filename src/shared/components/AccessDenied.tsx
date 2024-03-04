import "./AccessDenied.css";

function AccessDenied() {



  return (
    <div className="access-denied">
      <h1 className="access-denied__title">Access Denied</h1>
      <p className="access-denied__message">Sorry, you do not have permission to access this page.</p>
      <p className="access-denied__message">Please contact your administrator for further assistance.</p>
      <p className="access-denied__message">If you believe this is a mistake, you can <a href="/login" className="access-denied__link">login</a> to gain access.</p>
    </div>
  );
}

export default AccessDenied;
