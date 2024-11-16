import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./NotAuthorized.module.scss";

export const NotAuthorized = () => {
  const { authUserData, isUserDataLoading } = useGetAuthUser();

  if (!isUserDataLoading && authUserData) {
    return <Navigate to={RouterPath.wells} />;
  }

  return (
    <div className={styles.notAuthorizedWrapper}>
      <p className={styles.notAuthorizedTitle}>
        Вы не авторизованы.
        <br />
        Пожалуйста, пройдите авторизацию, нажав на кнопку "Войти" в левой части
        экрана.
        <br />
      </p>
    </div>
  );
};
