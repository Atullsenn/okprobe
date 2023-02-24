import clsx from "clsx";
import useStyles from './style';
import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
 const Copyright = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={clsx('d-flex f-align-center f-justify-between', classes.copyhide111)}>
      <Typography variant="body1" className={clsx('', classes.copyhide)}> 
        {`Copyright ©  2014-${new Date().getFullYear()}`}{" "}
        <Link
          className="color-text-link text-bold"
          onClick={() => history.push("/summary")}
        >
          OKProbe
        </Link>
        {". "}
        All right reserved.
      </Typography>
      <Typography variant="body1" className={clsx('', classes.copyhide)}>Version: 3.0.2</Typography>
    </div>
  );
};

export default Copyright;
