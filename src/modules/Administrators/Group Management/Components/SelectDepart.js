import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { DialogActions, DialogContent, IconButton } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import "../../Agent/view/AgentStyle.css";
import { Add, Remove } from "@material-ui/icons";
import "../../../../shared/Shared.css";
import FolderIcon from '@mui/icons-material/Folder';

const SelectDepart = ({ setCloseSelectDepartPopUp, setSelectedDepartmentName }) => {
    const { t } = useTranslation();
    const [icon, setIcons] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    var selectItem;

    const data = [
        { id: 1, name: 'Depat-1' },
        {
            id: 2, name: 'Depat-2', list: [
                { id: 3, name: 'Depat-2.1' },
                { id: 4, name: 'Depat-2.2' },
                { id: 5, name: 'Depat-2.3' },
                {
                    id: 6, name: 'Depat-2.4', list: [
                        { id: 7, name: 'Depat-2.4.1' },
                        {
                            id: 8, name: 'Depat-2.4.2', list: [
                                { id: 9, name: 'Depat-2.4.2.1' },
                                { id: 10, name: 'Depat-2.4.2.2' },
                            ]
                        },
                        { id: 11, name: 'Depat-2.4.3' },
                    ]
                },
                { id: 12, name: 'Depat-2.5' },
            ]
        },
        { id: 13, name: 'Depat-3' },
    ]

    function removeClass() {
        var allElements = document.querySelectorAll(".commonClass");
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].classList.remove('selectDepartmentActive');
        }
    }

    const selectionDepartment = (name, id) => {
        removeClass()
        document.querySelector('.sn' + id).classList.add('selectDepartmentActive');
        selectItem = name;
    }

    const CustomizedListItem = (props) => {
        const [Dragopen, setDragOpen] = useState(false);
        const { doc } = props;
        const handleClick = () => {
            setDragOpen(!Dragopen);
        }
        return (
            <div>
                <ListItem className={`sn${doc.id} commonClass`} button key={doc.id} onClick={() => { handleClick(); selectionDepartment(doc.name, doc.id) }}>
                    <FolderIcon style={{ color: 'gray' }} />
                    <ListItemText style={{ paddingLeft: '4px' }} primary={doc.name} />
                    {doc.list && (Dragopen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem >
                {doc.list && <Collapse
                    key={doc.id}
                    in={Dragopen}
                    timeout="auto"
                    unmountOnExit
                    style={{ paddingLeft: '26px' }}
                >
                    <List component="li" disablePadding key={doc.id}>
                        {doc.list.map((subDoc) => {
                            return (
                                subDoc.list ? <CustomizedListItemChild subDoc={subDoc} /> :
                                    <ListItem className={`sn${subDoc.id} commonClass`} onClick={() => { selectionDepartment(subDoc.name, subDoc.id) }} button key={subDoc.id}>
                                        <FolderIcon style={{ color: 'gray' }} />
                                        <ListItemText style={{ paddingLeft: '4px' }} key={subDoc.id} primary={subDoc.name} />
                                    </ListItem>
                            );
                        })}
                    </List>
                </Collapse>}
                <Divider />
            </div>
        )
    }

    const CustomizedListItemChild = (props) => {
        const [Dragopen, setDragOpen] = useState(false);
        const { subDoc } = props;
        const handleClick = () => {
            setDragOpen(!Dragopen);
        }
        return (
            <div>
                <ListItem className={`sn${subDoc.id} commonClass`} button key={subDoc.id} onClick={() => { handleClick(); selectionDepartment(subDoc.name, subDoc.id); }}>
                    <FolderIcon style={{ color: 'gray' }} />
                    <ListItemText style={{ paddingLeft: '4px' }} primary={subDoc.name} />
                    {subDoc.list && (Dragopen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                {subDoc.list && <Collapse
                    key={subDoc.id}
                    in={Dragopen}
                    timeout="auto"
                    unmountOnExit
                    style={{ paddingLeft: '26px' }}
                >
                    <List component="li" disablePadding key={subDoc.id}>
                        {subDoc.list.map((item) => {
                            return (
                                item.list ? <CustomizedListItem doc={item} /> : <ListItem className={`sn${item.id} commonClass`} onClick={() => { selectionDepartment(item.name, item.id) }} button key={item.id}>
                                    <FolderIcon style={{ color: 'gray' }} />
                                    <ListItemText style={{ paddingLeft: '4px' }} key={item.id} primary={item.name} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>}
                <Divider />
            </div>
        )
    }

    return (
        <>
            <Paper>
                <div style={{ position: 'fixed', zIndex: '1300', inset: '0px' }}>
                    <div className="MuiBackdrop-root">
                        <div className="MuiDialog-container MuiDialog-scrollPaper" style={{ width: '100%', height: '100%', backgroundColor: '' }}>
                            <div style={{ height: '560px' }} className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded setWidth">
                                <DialogTitle>
                                    <div className="d-flex f-align-center f-justify-between">
                                        <Typography variant="h5">
                                            {t("SelectDepartment")}
                                        </Typography>
                                        <IconButton>
                                            <CloseIcon onClick={() => { setCloseSelectDepartPopUp(false) }} />
                                        </IconButton>
                                    </div>
                                </DialogTitle>
                                <Divider />
                                <DialogContent className="mt-4">
                                    <Paper elevation={4} className="p-4">
                                        <div className="MainTreeDiv">
                                            <div className="MainInnerDivpopup">{icon ? <Add onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }} /> : <Remove onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }} />}
                                                <div className="DepartmentList" onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }}>{t("SelectDepartment")}</div>
                                            </div>
                                            {!isOpen ? <div className="OpenDepartmentList">
                                                <List style={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                                                    {data.map(el => {
                                                        return <CustomizedListItem doc={el} />
                                                    })}
                                                </List>
                                            </div> : ''}
                                        </div>
                                    </Paper>
                                </DialogContent>
                                <DialogActions>
                                    <div className="p-4">
                                        <Button className="mr-4" style={{ width: '80px' }} variant="contained" onClick={() => { setCloseSelectDepartPopUp(false) }}>
                                            {t('settingsCancel')}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="Btn-Color ButtonSimilarWidth"
                                            disabled={false}
                                            onClick={() => { setCloseSelectDepartPopUp(false); setSelectedDepartmentName(selectItem) }}
                                        >
                                            {t('summarySave')}
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
}

export default SelectDepart;