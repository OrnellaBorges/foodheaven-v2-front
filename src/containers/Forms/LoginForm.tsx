import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//HOOK PERSO
import { useLoginUser } from "../../hooks/useLoginUser";

export function LoginForm() {
  //declaration des state qui vont acceuillir les data des formulaires
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
  // ce state permet de faire apparaitre la popup de message
  const [warnMode, setWarnMode] = useState<boolean>(true);

  const { isLoading, isError, statusCode, userId, tryLogUser } = useLoginUser();
  console.log("userId", userId);

  // creation d'une fonction qui permet de verifier les champs
  const checkFields = () => {
    if (email !== "" && password !== "") {
      setIsEmptyField(false);
    } else {
      setIsEmptyField(true);
      setWarnMode(false);
    }
  };

  useEffect(() => {
    if (!warnMode) checkFields();
  }, [email, password]);

  // fonction onSubmitForm
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkFields();

    if (!isEmptyField) {
      // creation de la datas a envoyer au server
      const datas = { email, password }; //stockage dans un objet des data des state input
      console.log("datas", datas);
      // on execute la fonction tryLoginUser qui vient du hook useLoginUser
      tryLogUser(datas);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmitForm(e)}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          name="password"
          placeholder="password"
        />

        <button type="submit">Se connecter</button>
      </form>
    </>
  );
}
