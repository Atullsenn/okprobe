import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Grid } from "shared/components";
import Paper from "@material-ui/core/Paper";
import { Route } from 'react-router-dom';
import Service from '../../service';
import moment from "moment"

const TypographyWithClick = ({ children, onClick }) => {
    return <Typography variant="body1" style={{ textAlign: "center" }} onClick={onClick}>
        {children}
    </Typography>
}

const defaultState = {
    entries: [],
    status: null,
    order: null,
    orderBy: null,
    isFetching: false,
};

const noop = () => { };
const Tabel = ({ match, getUnassignDeviceCount = noop }) => {
    const { t } = useTranslation();
    const printerState = [
        { label: t('printerAll'), value: "A" },
        { label: t('printernormal'), value: "N" },
        { label: t('printercaution'), value: "C" },
        { label: t('printercheck'), value: "W" },
    ];
    const [state, setState] = useState({
        ...defaultState,
        status: match?.params?.status ? match?.params?.status : printerState[0].value
    });

    useEffect(() => {
        getSearchHistory()
    }, [])

    const addSerialNumber = (datass) => {
        const data = [];
        datass.map((item, index) => {
            data.push({
                sNo: index + 1,
                agentInfoId: item.agentInfoId,
                foundCnt: item.foundCnt,
                insertDt: item.insertDt,
                notFoundCnt: item.notFoundCnt,
                searchHistoryId: item.searchHistoryId,
                searchIpRange: item.searchIpRange,
                updateDt: item.updateDt,
            })
        })
        return data
    }

    const getSearchHistory = async () => {
        setState(prevState => ({ ...prevState, isFetching: true }));
        await Service.getAgentSearchHistory().then((res) => {
            console.log(res.data, 'rere')
            if (res.data != null) {
                setState(prevState => ({ ...prevState, entries: addSerialNumber(res.data.content), isFetching: false }));
            } else {
                setState(prevState => ({ ...prevState, entries: [], isFetching: false }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const columnConfig = [
        {
            id: "s_No",
            fieldName: "s_No",
            label: t("processNo"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {Rows.sNo}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "search_Date",
            fieldName: "search_Date",
            label: t("processSearchDate"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {moment(Rows.insertDt).format("DD-MM-YYYY hh:mm:ss A")}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "registration_Ip",
            field: "registration_Ip",
            label: t("processRegistration"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {Rows.searchIpRange}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "detected_No",
            field: "detected_No",
            label: t("processNormalDetected"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {Rows.foundCnt}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "notDetected_No",
            fieldName: "notDetected_No",
            label: t("processNotDetected"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {Rows.notFoundCnt}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "Status_Id",
            fieldName: "Status_Id",
            label: t("processStatus"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {'----'}
                    </TypographyWithClick>
                )} />
            ),
        },
        {
            id: "agent_name",
            field: "agent_name",
            label: t("Agent Name"),
            canSort: true,
            render: (Rows) => (
                <Route render={({ history }) => (
                    <TypographyWithClick onClick={() => { history.push(`${match.path}/search-result`) }}>
                        {'----'}
                    </TypographyWithClick>
                )} />
            ),
        },
    ];

    const handleSortChange = (fieldObj, order) => {
        const data = [...state.entries]
        data.sort((a, b) => {
            if (a[fieldObj.field] > b[fieldObj.field])
                return order === 'A' ? 1 : -1
            else return order === 'A' ? -1 : 1
        })
        setState((prevState) => ({
            ...prevState,
            orderBy: fieldObj.field || fieldObj.fieldName,
            order: order,
            entries: data,
        }));
    };

    return (
        <>
            <div className="d-flex f-align-center f-justify-between mb-8">
                <Typography variant="h4">{t("sidebarSearchHistory")}</Typography>
            </div>
            <Paper elevation={4}>
                <Grid
                    hasSelection={false}
                    columns={columnConfig}
                    rows={state.entries}
                    onSortChange={handleSortChange}
                    order={state.order}
                    isLoading={state.isFetching}
                    orderBy={state.orderBy}
                />
            </Paper>
        </>
    );
};

export default Tabel;