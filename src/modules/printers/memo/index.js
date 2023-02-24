import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from "../service";
import { Typography } from "@material-ui/core";
import useStyle from "./style";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';
import MemoTalk from './memo-talk';

const noop = () => {};

const defaultState = {};

const MemoComponent = ({ broadcastMessage = noop, match }) => {
  const { t } = useTranslation();


  return (
    <>
      <MemoTalk broadcastMessage={broadcastMessage} deviceInfoId={match.params.deviceId} />
    </>
  );
};
export default MemoComponent;
