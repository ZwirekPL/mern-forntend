import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModel";
import { User } from "./models/user";
import styles from "./styles/NotesPage.module.css";

import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginUpModal, setShowLoginUpModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginUpModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccesful={() => setLoggedInUser(null)}
      />
      <Container className={styles.NotesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
        {showSignUpModal && (
          <SignUpModel
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginUpModal && (
          <LoginModel
            onDismiss={() => setShowLoginUpModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginUpModal(false);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
