import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import "../view/Licensestyle.css";
import { useTranslation } from "react-i18next";
import { DialogActions, DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IconButton, Divider } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from "@material-ui/core/Paper";
import "../../../../shared/Shared.css";

const ImportKeypopUp = ({ setClosePopUp, setImportKeybtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <Paper>
                <div style={{ position: 'fixed', zIndex: '1300', inset: '0px' }}>
                    <div className="MuiBackdrop-root">
                        <div className="MuiDialog-container MuiDialog-scrollPaper" style={{ width: '100%', height: '100%' }}>
                            <div style={{ height: '560px' }} className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded setWidth">
                                <DialogTitle>
                                    <div className="d-flex f-align-center f-justify-between">
                                        <Typography variant="h5">
                                            {t("importBtn")}
                                        </Typography>
                                        <IconButton>
                                            <CloseIcon onClick={() => { setClosePopUp(false) }} />
                                        </IconButton>
                                    </div>
                                </DialogTitle>
                                <Divider />
                                <DialogContent className="mt-4">
                                    <TextField
                                        style={{ marginBottom: '24px' }}
                                        fullWidth
                                        label={t('LicenseKey')}
                                        name="email"
                                        variant="outlined"
                                        InputProps={{ endAdornment: <SearchIcon /> }}
                                    />
                                    <TextField
                                        fullWidth
                                        label={t('LicenseKey')}
                                        name="email"
                                        variant="outlined"
                                        InputProps={{ endAdornment: <SearchIcon /> }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <div className="p-4" >
                                        <Button variant='contained' style={{ width: '80px' }} onClick={() => { setClosePopUp(false) }} className="mr-4 ImportButtonSimilarWidth">
                                            {t('closeBtn')}
                                        </Button>
                                        <Button
                                            onClick={() => { setImportKeybtn(true); setClosePopUp(false) }}
                                            variant="contained"
                                            className='Btn-Color ImportButtonSimilarWidth'
                                            disabled={false}
                                        >
                                            {t('importBtn')}
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

export default ImportKeypopUp;