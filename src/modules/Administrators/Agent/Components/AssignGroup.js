import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import "../view/AgentStyle.css";
import DepartmentSearch from "./DepartmentSearch";
import "../../../../shared/Shared.css";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Service from '../../service'

const SecondTableData = [
    {
        id: 1,
        deptName: ['Dept-1', 'Dept-2']
    },
    {
        id: 2,
        deptName: ['Dept-1']
    },
    {
        id: 3,
        deptName: ['Dept-1', 'Dept-2', 'Dept-3']
    },
    {
        id: 4,
        deptName: ['Dept-1', 'Dept-2', 'Dept-3', 'Dept-4', 'Dept-5', 'Dept-6']
    },
    {
        id: 5,
        deptName: ['Dept-1']
    },
]


const AssignGroup = () => {
    const [popUp, setPopUp] = useState(false);
    const [onSelectRowid, setOnSelectRowId] = useState();
    const [departmentList, setDepartmentList] = useState(null);
    const [rightTableData, setRightTableData] = useState(SecondTableData);
    const { t } = useTranslation();

    const [leftTableData, setLeftTableData] = useState([])
    // api
    const getAgentData = async () => {
        await Service.getAgentData().then((res) => {
            setLeftTableData(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAgentData()
    }, [])

    //api
    const SendDateTosecond = async (passingId) => {
        await Service.getAssignmentDataByAgentId(passingId).then((res) => {
        }).catch((error) => {
            console.log(error)
        })
        rightTableData.filter((item) => {
            if (item.id === passingId) {
                setDepartmentList([item])
            }
        })
    }

    const SelectedRow = (passingId) => {
        if (onSelectRowid === passingId) {
            setOnSelectRowId()
        }
        else {
            setOnSelectRowId(passingId)
        }
    }

    return (
        <>
            <Paper elevation={4}>
                <div className="divideParentDiv">
                    <div className="divideDiv1">
                        <div className="innerDivs">
                            <BackupTableIcon />
                            <p className="ml-2">{t("Agent")}</p>
                        </div>
                        <div class="agent-table-main-area">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("Name")}</th>
                                        <th class="ip-border-main-area">IP</th>
                                        <th>{t("processHostName")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leftTableData.map((item) => {
                                        return (
                                            <tr className={`${item.agentInfoId === onSelectRowid ? 'activeSelectColor' : ''}`} onClick={() => { SelectedRow(item.agentInfoId, item.displayName); SendDateTosecond(item.agentInfoId) }}>
                                                <td>{item.displayName}</td>
                                                <td>{item.ipAddress}</td>
                                                <td>{item.hostname}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="divideDiv2">
                        <div className="innerDivs">
                            <BackupTableIcon />
                            <p className="ml-2">{t("Assigned Department")}</p>
                            <Tooltip title={t("usersAdd")} placement='top-start'>
                                <Button
                                    className={`AgentAddDiv AgentButtonSimilarWidth ${onSelectRowid ? 'Btn-Color' : ''}`}
                                    variant="contained"
                                    disabled={onSelectRowid ? false : true}
                                    onClick={() => { setPopUp(!popUp) }}
                                >
                                    <AddIcon />
                                    {t("usersAdd")}
                                </Button>
                            </Tooltip>
                        </div>
                        <div class="agent-table-main-area SecondDiv">
                            <table>
                                <thead>
                                    {onSelectRowid ?
                                        <tr>
                                            <th>{t("ID")}</th>
                                            <th class="ip-border-main-area-2">{t("Name")}</th>
                                            <th style={{ textAlign: 'center' }}>{t("Action")}</th>
                                        </tr> :
                                        ''}
                                </thead>
                                <tbody>
                                    {onSelectRowid ? departmentList && departmentList.map((items) => {
                                        return (
                                            items.deptName.map((departs, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{departs}</td>
                                                        <td className="btntd">
                                                            <Tooltip title={t('newPrinterdelete')} placement='top-start'>
                                                                <Button
                                                                    variant="contained"
                                                                    className="deleteBtn"
                                                                >
                                                                    <DeleteForeverIcon />
                                                                </Button>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }) : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Paper>
            {popUp ? <DepartmentSearch setClosePopUp={setPopUp} /> : ''}
        </>
    );
};

export default AssignGroup;