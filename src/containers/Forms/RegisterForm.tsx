import { useState, useEffect } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ setNotification }) {
  /* const result = useRegisterUser();
    const isLoading = result.isLoading;
    const isError = result.isError;
    const user = result.user;
    const tryRegisterUser = result.tryRegisterUser */
  const navigate = useNavigate();

  // le Hook nous renvoi ici tryRegisterUser
  const { isLoading, isError, statusCode, tryRegisterUser } = useRegisterUser();
  /* console.log("isLoading", isLoading);
    console.log("userStatus", userStatus);
    console.log("isError", isError); */

  const [email, setEmail] = useState<string>("abc@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [firstName, setFirstName] = useState<string>("a");
  const [lastName, setLastName] = useState<string>("b");
  const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
  // ce state permet de faire apparaitre la popup de message
  const [warnMode, setWarnMode] = useState<boolean>(true);

  const checkFields = () => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      setIsEmptyField(false);
      //return true;
    } else {
      setIsEmptyField(true);
      setWarnMode(false);
      //return false;
    }
  };

  useEffect(() => {
    if (!warnMode) checkFields();
  }, [email, password, lastName, firstName]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkFields();

    // si isFormvalid === true
    //if (isFormValid) tryRegisterUser(datas);
    if (!isEmptyField) {
      const datas = { email, password, firstName, lastName }; //stockage dans un objet des data des state input
      console.log("datas", datas);
      tryRegisterUser(datas);
    }
  };

  if (statusCode === 200) {
    setNotification("Votre compte à bien été créé!");
    navigate("/login");
  }

  /* let message;
  switch(statusCode) {
    case 401:
    message = "Cet email est déjà pris"
    break;
  } */

  return (
    <>
      <h1>REGISTER</h1>
      <form onSubmit={(e) => onSubmitForm(e)}>
        <input
          defaultValue={email}
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          defaultValue={password}
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          defaultValue={firstName}
          name="firstName"
          placeholder="firstName"
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <input
          defaultValue={lastName}
          name="lastName"
          placeholder="lastName"
          onChange={(e) => setLastName(e.currentTarget.value)}
        />

        {isError && <p style={{ color: "red" }}>Serveur indisponible</p>}

        {!isError && isEmptyField && (
          <p style={{ color: "red" }}>Les champs sont vide</p>
        )}

        {statusCode === 401 && (
          <p style={{ color: "red" }}>Cet email est déjà pris</p>
        )}

        {statusCode === 500 && (
          <p style={{ color: "red" }}>Problème lors de la creation du compte</p>
        )}

        <button disabled={isLoading} type="submit">
          Enregistrer
        </button>
      </form>
    </>
  );
}
