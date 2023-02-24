import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from '@material-ui/core';
import { Button } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { DialogActions, DialogContent, IconButton } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import "../view/AgentStyle.css";
import { Add, Remove } from "@material-ui/icons";
import "../../../../shared/Shared.css";
import { Checkbox } from "@material-ui/core";
import FolderIcon from '@mui/icons-material/Folder';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const DepartmentSearch = ({ setClosePopUp }) => {
  const { t } = useTranslation();
  const [icon, setIcons] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const selectionDepartment = (name, id) => {
    document.querySelector('.sn' + id).classList.add('selectDepartmentActive');
  };

  const checkBoxEvent = (e, id, name) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      selectionDepartment(name, id)
    } else {
      document.querySelector('.sn' + id).classList.remove('selectDepartmentActive');
    }
  }

  const CustomizedListItem = (props) => {
    const [Dragopen, setDragOpen] = useState(false);
    const { doc } = props;
    const handleClick = () => {
      setDragOpen(!Dragopen);
    };
    return (
      <div>
        <ListItem className={`sn${doc.id} commonClass`} button key={doc.id} onClick={() => { handleClick() }}>
          <Checkbox color="primary" onChange={(e) => { checkBoxEvent(e, doc.id, doc.name) }} />
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
                  <ListItem className={`sn${subDoc.id} commonClass`} button key={subDoc.id}>
                    <Checkbox color="primary" onChange={(e) => { checkBoxEvent(e, subDoc.id, subDoc.name) }} />
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
        <ListItem className={`sn${subDoc.id} commonClass`} button key={subDoc.id} onClick={() => { handleClick(); }}>
          <Checkbox color="primary" onChange={(e) => { checkBoxEvent(e, subDoc.id, subDoc.name) }} />
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
                item.list ? <CustomizedListItem doc={item} /> : <ListItem className={`sn${item.id} commonClass`} button key={item.id}>
                  <Checkbox color="primary" onChange={(e) => { checkBoxEvent(e, item.id, item.name) }} />
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
            <div className="MuiDialog-container MuiDialog-scrollPaper" style={{ width: '100%', height: '100%' }}>
              <div style={{ height: '560px' }} className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded setWidth">
                <DialogTitle>
                  <div className="d-flex f-align-center f-justify-between">
                    <Typography variant="h5">
                      {t("DepartmentSearch")}
                    </Typography>
                    <IconButton>
                      <CloseIcon onClick={() => { setClosePopUp(false) }} />
                    </IconButton>
                  </div>
                </DialogTitle>
                <Divider />
                <DialogContent className="mt-4">
                  <Paper elevation={4} className="p-4">
                    <div className="MainTreeDiv">
                      <div className="MainInnerDivpopup">{icon ? <Add onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }} /> : <Remove onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }} />}
                        <div className="DepartmentList" onClick={() => { setIsOpen(!isOpen); setIcons(!icon); }}>{t("DepartmentList")}</div>
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
                    <Button variant="contained" className="mr-4" style={{ width: '80px' }} onClick={() => { setClosePopUp(false) }}>
                      {t('settingsCancel')}
                    </Button>
                    <Button
                      variant="contained"
                      className="Btn-Color DepartmentButtonSimilarWidth"
                      disabled={false}
                      onClick={() => { setClosePopUp(false) }}
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
};

export default DepartmentSearch;