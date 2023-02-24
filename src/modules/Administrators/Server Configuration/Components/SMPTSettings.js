import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "../view/ServerStyle.css";
import Select from "@material-ui/core/Select";
import { Button, MenuItem } from "@material-ui/core";
import "../../../../shared/Shared.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import InfoIcon from "@material-ui/icons/Info";


const SMPTSettings = () => {
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
    const { t } = useTranslation();
    const [secure, setSecure] = useState(25);
    const [emailSeverError, setEmailServerError] = useState(false);
    const [serverEmail, setServerEmail] = useState('yoon20@myepsoft.com');
    const [password, setPassword] = useState({ password: '', confirmPassword: '', })
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [defaultSenderEmail, setDafultSenderEmail] = useState('developer7@myepsoft.com');
    const [defaultSenderEmailError, setDafultSenderEmailError] = useState(false);
    const [portNumber, setPortNumber] = useState(25)

    const updateSecure = (event) => {
        setSecure(event.target.value);
        setPortNumber(event.target.value)
    };

    const onCheckPassword = (e) => {
        const { name, value } = e.target;
        setPassword((prevState) => {
            let password = value
            return {
                ...prevState,
                [name]: password,
            }
        })
    }

    const setPortNumberValidation = (e) => {
        let ValidatePortNumber = e.target.value;
        if (ValidatePortNumber > 65535) ValidatePortNumber = 65535;
        if (ValidatePortNumber < 0) ValidatePortNumber = 0;
        setPortNumber(ValidatePortNumber);
    }

    return (
        <>
            <Paper elevation={4} >
                <div className="SMPTServerMainDiv">
                    <div className="SMPTInnerDivs mt-3">
                        <p className={`${emailSeverError ? 'errorlabelcenter' : ''}`}>{t('EmailServer')}</p>
                        <TextField
                            error={emailSeverError}
                            variant="outlined"
                            className="textfield"
                            size="small"
                            value={serverEmail}
                            helperText={emailSeverError ? 'Please Enter a valid Email.' : ''}
                            onChange={(e) => {
                                setServerEmail(e.target.value);
                                const isEmailCorrect = emailRegex.test(e.target.value);
                                setEmailServerError(e.target.value != '' && !isEmailCorrect)
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <div
                                            style={{
                                                width: 15,
                                                height: 22,
                                                color: emailSeverError ? "red" : "#007bff",
                                            }}
                                        >
                                            {emailSeverError ? <InfoIcon /> : (serverEmail != '' ? <CheckCircleOutlineIcon /> : '')}
                                        </div>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p >{t('ID')}</p>
                        <TextField
                            className="textfield"
                            name="noticeUsageLevel"
                            variant="outlined"
                            size="small"
                            defaultValue={'Varun kumar'}
                        />
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p className={`${confirmPasswordError ? 'errorlabelcenter' : ''}`}>{t('Password')}</p>
                        <div className="passwordDiv">
                            <div className="passwordOneDiv">
                                <TextField
                                    error={confirmPasswordError}
                                    type="password"
                                    className="passwordTextField textfield"
                                    name="password"
                                    variant="outlined"
                                    size="small"
                                    value={password.password}
                                    helperText={confirmPasswordError ? '' : ''}
                                    onChange={onCheckPassword}
                                />
                                <TextField
                                    error={confirmPasswordError}
                                    type="password"
                                    variant="outlined"
                                    className="passwordTextField textfield"
                                    size="small"
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    helperText={confirmPasswordError ? 'Passwords do not match.? ' : ''}
                                    onChange={(e) => {
                                        onCheckPassword(e)
                                        const isPasswordCorrect = password.password === e.target.value;
                                        setConfirmPasswordError(e.target.value != '' && !isPasswordCorrect)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div
                                                    style={{
                                                        width: 15,
                                                        height: 22,
                                                        color: confirmPasswordError ? "red" : "#007bff",
                                                    }}
                                                >
                                                    {confirmPasswordError ? <InfoIcon /> : (password.confirmPassword != '' ? <CheckCircleOutlineIcon /> : '')}
                                                </div>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p className={`${defaultSenderEmailError ? 'errorlabelcenter' : ''}`}>{t('Defaultsenderemail')}</p>
                        <TextField
                            error={defaultSenderEmailError}
                            variant="outlined"
                            className="textfield"
                            size="small"
                            value={defaultSenderEmail}
                            helperText={defaultSenderEmailError ? 'Please Enter a valid Email.' : ''}
                            onChange={(e) => {
                                setDafultSenderEmail(e.target.value);
                                const isDefaultSenderEmailCorrect = emailRegex.test(e.target.value);
                                setDafultSenderEmailError(e.target.value != '' && !isDefaultSenderEmailCorrect)
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <div
                                            style={{
                                                width: 15,
                                                height: 22,
                                                color: defaultSenderEmailError ? "red" : "#007bff",
                                            }}
                                        >
                                            {defaultSenderEmailError ? <InfoIcon /> : (defaultSenderEmail != '' ? <CheckCircleOutlineIcon /> : '')}
                                        </div>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p >{t('SecureType')}</p>
                        <Select
                            className="textfield"
                            value={secure}
                            onChange={updateSecure}
                            displayEmpty
                            variant="outlined"
                            style={{ height: "45px" }}
                        >
                            <MenuItem value={25}>{t("None")}</MenuItem>
                            <MenuItem value={465}>SSL</MenuItem>
                            <MenuItem value={587}>TLS</MenuItem>
                        </Select>
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p >{t('PortNumber')}</p>
                        <TextField
                            type='number'
                            className="textfield"
                            name="noticeUsageLevel"
                            variant="outlined"
                            size="small"
                            value={portNumber}
                            onChange={(e) => { setPortNumberValidation(e) }}
                        />
                    </div>
                    <div className="SMPTInnerDivs mt-3 mb-3">
                        <p >{t('')}</p>
                        <div className="passwordDiv">
                            <Button variant="contained" className="SMPT-Btn Test-Color">{t("test")}</Button>
                            <Button variant="contained" className="SMPT-Btn Btn-Color">{t("summarySave")}</Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default SMPTSettings;