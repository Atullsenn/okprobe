import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import "./Licensestyle.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import ImportKeypopUp from "../Components/ImportKeypopup";
import DeleteKey from "../Components/DeleteKey";
import { Divider } from '@material-ui/core';
import "../../../../shared/Shared.css";

const defaultState = {
    status: 'License Activated',
    key: '',
    setActivation: 'none',
    createDownload: true,
}

const License = () => {
    const [state, setState] = useState(defaultState)
    const [popUp, setPopUp] = useState(false)
    const [importKey, setImportKey] = useState(false)
    const [deleteKeyPopUp, setDeleteKeyPopUp] = useState(false)
    const { t } = useTranslation();
    const Data = {
        status: `${state.status}`,
        ApplicationKey: `${state.key}`,
        ExpireDate: '2023-12-24',
        CustomerDisplayName: 'TEST11',
        Email: 'yoon20@myepsoft.com',
        Contact: 'TEST11',
        NoofDevices: '555',
    }
    const createKey = () => {
        setState(prevState => ({
            ...prevState,
            key: 'MPYB6-Y2PG2-KJJB7-8MMRJ-PQR6Y-JHJTM-JHJTM',
            setActivation: 'block',
            createDownload: false,
            status: 'Demo License',
        }));
    }

    return (
        <>
            <div className='d-flex f-align-center f-justify-between mb-8'>
                <Typography variant='h4'>
                    {t('License')}
                </Typography>
            </div>
            <Paper elevation={4} className='p-4'>
                <div className='wraplayout'>
                    <div style={{ height: 'auto', width: '100%' }}>
                        <TextField
                            name='noticeNoUse'
                            style={{ width: '70%' }}
                            variant='outlined'
                            className="disableColor"
                            size='small'
                            label={t('dashboardStatus')}
                            value={Data.status}
                            disabled={true}
                        />
                        {importKey ? <Button onClick={() => { setDeleteKeyPopUp(true) }} variant="contained" className="LicenseBtn Btn-Color" style={{ display: `${state.setActivation}` }}
                        >{t('returnBtn')} </Button> : <Button variant="contained" className="LicenseBtn Btn-Color" onClick={() => { setPopUp(true) }} style={{ display: `${state.setActivation}` }}
                        >{t('activateBtn')} </Button>}
                        <TextField
                            name='noticeNoUse'
                            variant='outlined'
                            className='mt-6 disableColor'
                            style={{ width: '70%' }}
                            size='small'
                            label={t('ApplicationKey')}
                            value={Data.ApplicationKey}
                            disabled={true}
                        />
                        {importKey ? '' : (state.createDownload ? <Button variant="contained" className="mt-6 LicenseBtn Btn-Color" onClick={() => createKey()}
                        >{t('createBtn')} </Button> : <Button variant="contained" className="mt-6 LicenseBtn Btn-Color" onClick={() => createKey()}
                        >{t('downloadBtn')} </Button>)
                        }
                    </div>
                    <TextField
                        name='noticeNoUse'
                        className='mt-6 disableColor'
                        fullWidth
                        variant='outlined'
                        size='small'
                        label={t('ExpireDate')}
                        value={Data.ExpireDate}
                        disabled={true}
                    />
                    <TextField
                        name="noticeNoUse"
                        className='mt-6 disableColor'
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={Data.CustomerDisplayName}
                        label={t("CustomerDisplayName")}
                        disabled={true}
                    />
                    <TextField
                        name="noticeNoUse"
                        className='mt-6 disableColor'
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={Data.Email}
                        label={t("usersemail")}
                        disabled={true}
                    />
                    <TextField
                        name="noticeNoUse"
                        className='mt-6 disableColor'
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={Data.Contact}
                        label={t("processContract")}
                        disabled={true}
                    />
                    <br />
                    <br />
                    <Divider />
                    <h5 style={{ fontSize: '15px', margin: '8px 0px' }}>{t("FunctionsOptionsSubjects")}</h5>
                    <TextField
                        name="noticeNoUse"
                        className='mt-4 disableColor'
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={Data.NoofDevices}
                        label={t("noofDevice")}
                        disabled={true}
                    />
                </div>
            </Paper>
            {popUp ? <ImportKeypopUp setClosePopUp={setPopUp} setImportKeybtn={setImportKey} /> : ''}
            {deleteKeyPopUp ? <DeleteKey removeDeleteKeyPopUp={setDeleteKeyPopUp} /> : ''}
        </>
    );
};

export default License;