import React, { useState,useEffect } from "react";
import ".././../Group Management/view/Groupstyle.css";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { Divider } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { DialogActions, DialogContent, IconButton } from '@material-ui/core';
import "../../../../shared/Shared.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Service from '../../service';
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const SMTPSettings = ({ setClosePopUp }) => {
    const { t } = useTranslation();
    const [authAlgorithm, setAuthAlgorithm] = useState(1);
    const [privacyAlgorithm, setPrivacyAlgorithm] = useState(1);
    const [checkedVersion3, setCheckedVersion3] = useState(false);

    const updateAuthAlgorithm = (event) => {
        setAuthAlgorithm(event.target.value);
    };

    const updatePrivacyAlgorithm = (event) => {
        setPrivacyAlgorithm(event.target.value);
    }

    const CheckedEventVersion = (event) => {
        if (event.target.checked) {
            setCheckedVersion3(true)
        }
    }


    // New Api Integration
    const [state,setState] = useState([])
    const getAgentData = async () => {
        await Service.getAgentData().then((res) => {
             console.log("Response for smtp")
        //    console.log(res)
           setState(res.data)
           console.log(state)
        console.log("Response for smtp")

           
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAgentData()
    }, [])


    //New Api Integration

    return (
        <>
            <Paper>
                <div style={{ position: 'fixed', zIndex: '1300', inset: '0px' }}>
                    <div className="MuiBackdrop-root">
                        <div className="MuiDialog-container MuiDialog-scrollPaper">
                            <div style={{ height: '560px' }} className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded setWidth">
                                <DialogTitle>
                                    <div className="d-flex f-align-center f-justify-between">
                                        <Typography variant="h5">
                                            {t("SNMP Settings")}
                                        </Typography>
                                        <IconButton>
                                            <CloseIcon onClick={() => { setClosePopUp(prevState => ({ ...prevState, popUp: false })) }} />
                                        </IconButton>
                                    </div>
                                </DialogTitle>
                                <Divider />
                                <DialogContent className="mt-2">
                                    <div className="SNMPVersionDiv">
                                        <p >{t('SNMP Version')}</p>
                                        <form>
                                            <input type="radio" id="version-2" name="version" value="version-2" defaultChecked onClick={() => { setCheckedVersion3(false) }} />
                                            <label style={{ fontSize: '16px' }} for="version">SNMPv1/v2</label>
                                            <input style={{ marginLeft: '20px' }} type="radio" id="version-3" name="version" value="version-3" onChange={(e) => { CheckedEventVersion(e) }} />
                                            <label style={{ fontSize: '16px' }} for="version">SNMPv3</label>
                                        </form>
                                    </div>
                                    <TextField
                                        className="mt-4"
                                        fullWidth
                                        label={t('SNMP Port')}
                                        name="email"
                                        defaultValue={state.snmpPort}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className="mt-4"
                                        fullWidth
                                        label={t('SNMP Community')}
                                        name="email"
                                        defaultValue={state.snmpCommunityName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className="mt-4"
                                        fullWidth
                                        label={t('SNMP Collecting Retries')}
                                        name="email"
                                        defaultValue={state.snmpCollectionRetry}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className="mt-4"
                                        fullWidth
                                        label={t('SNMP Collecting Timeout')}
                                        name="email"
                                        defaultValue={state.snmpCollectionTimeout}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={`mt-4 ${checkedVersion3 ? ' ' : 'disableColor'}`}
                                        disabled={checkedVersion3 ? '' : true}
                                        fullWidth
                                        label={t('USM User')}
                                        name="email"
                                        defaultValue={'epsoft'}
                                        variant="outlined"
                                    />
                                    <Box sx={{ minWidth: 120 }} className="mt-4">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Auth Algorithm</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={authAlgorithm}
                                                label="Auth Algorithm"
                                                variant="outlined"
                                                onChange={updateAuthAlgorithm}
                                                disabled={checkedVersion3 ? '' : true}
                                                className={`${checkedVersion3 ? ' ' : 'disableColor'}`}
                                            >
                                                <MenuItem value={1}>MD5</MenuItem>
                                                <MenuItem value={2}>SHA</MenuItem>
                                                <MenuItem value={3}>SHA224</MenuItem>
                                                <MenuItem value={4}>SHA256</MenuItem>
                                                <MenuItem value={5}>SHA384</MenuItem>
                                                <MenuItem value={6}>SHA512</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <TextField
                                        className={`mt-4 ${checkedVersion3 ? ' ' : 'disableColor'}`}
                                        fullWidth
                                        label={t('Auth Password')}
                                        disabled={checkedVersion3 ? '' : true}
                                        name="email"
                                        type="password"
                                        defaultValue={'HimanshuSuratiya'}
                                        variant="outlined"
                                    />
                                    <Box sx={{ minWidth: 120 }} className="mt-4">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Privacy Algorithm</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={privacyAlgorithm}
                                                label="Privacy Algorithm"
                                                variant="outlined"
                                                onChange={updatePrivacyAlgorithm}
                                                disabled={checkedVersion3 ? '' : true}
                                                className={`${checkedVersion3 ? ' ' : 'disableColor'}`}
                                            >
                                                <MenuItem value={0}>DES</MenuItem>
                                                <MenuItem value={1}>AES</MenuItem>
                                                <MenuItem value={2}>AES192</MenuItem>
                                                <MenuItem value={3}>AES256</MenuItem>
                                                <MenuItem value={4}>3DES</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <TextField
                                        className={`mt-4 ${checkedVersion3 ? ' ' : 'disableColor'}`}
                                        fullWidth
                                        label={t('Privacy Password')}
                                        disabled={checkedVersion3 ? '' : true}
                                        name="email"
                                        type="password"
                                        defaultValue={'HimanshuSuratiya'}
                                        variant="outlined"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <div className="p-4 mr-4">
                                        <Button variant="contained" className="mr-4" style={{ width: '80px' }} onClick={() => { setClosePopUp(prevState => ({ ...prevState, popUp: false })) }}>
                                            {t('settingsCancel')}
                                        </Button>
                                        <Button
                                            className="Btn-Color DepartmentButtonSimilarWidth"
                                            variant="contained"
                                            disabled={false}
                                            onClick={() => { setClosePopUp(prevState => ({ ...prevState, popUp: false })) }}
                                        >
                                            {t('Save')}
                                        </Button>
                                    </div>
                                </DialogActions>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default SMTPSettings;