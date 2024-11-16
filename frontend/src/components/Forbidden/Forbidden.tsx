import { Typography } from "antd";

import styles from "./Forbidden.module.scss";

export const Forbidden = () => {
  return (
    <div className={styles.forbiddenWrapper}>
      <Typography.Title>
        Недостаточно прав для просмотра страницы
      </Typography.Title>
    </div>
  );
};
