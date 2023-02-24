import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import "../../Monthly-Device-Billing-Report/Components/MonthlyDeviceBillingReport.css"
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

const MonthlyCustomerDeaprtmentBillingReportTable = () => {
    const [sortDirection, setSortDirection] = useState("asc")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columnConfig = [
        { columnName: 'No' },
        { columnName: 'Customer' },
        { columnName: 'Department-1' },
        { columnName: 'Department-2' },
        { columnName: 'Department-3' },
        { columnName: 'Department-4' },
        { columnName: 'Department-5' },
        { columnName: 'Location' },
        { columnName: 'S/N' },
        { columnName: 'IP' },
        { columnName: 'Model' },
        { columnName: 'Host Name' },
        { columnName: 'Machine Count' },
        {
            columnName: 'Machine Count ~2021. 10', innerTable: [
                { columnName: 'Black' },
                { columnName: 'Color' }
            ]
        },
        {
            columnName: 'Usage Count Total {~2021. 10}', innerTable: [
                { columnName: 'Black' },
                { columnName: 'Color' }
            ]
        },
    ]

    const data = [
        {
            no: '1',
            customer: 'Himanshu',
            depart1: 'Depat-1',
            depart2: 'Depat-2',
            depart3: 'Depat-3',
            depart4: 'Depat-4',
            depart5: 'Depat-5',
            location: 'Location',
            sn: 'S/N',
            ip: 'IP',
            model: 'Model',
            hostName: 'Host Name',
            machineCount: 'Machine Count',
            machineCount202110: {
                black: '40%',
                color: '10%',
            },
            usageCountTotal202110: {
                black: '99%',
                color: '82%',
            },
        },
        {
            no: '2',
            customer: 'Vishal',
            depart1: 'Depat-1',
            depart2: 'None',
            depart3: 'Depat-3',
            depart4: 'None',
            depart5: 'Depat-5',
            location: 'Location',
            sn: 'S/N',
            ip: 'IP',
            model: 'Model',
            hostName: 'Host Name',
            machineCount: 'Machine Count',
            machineCount202110: {
                black: '05%',
                color: '65%',
            },
            usageCountTotal202110: {
                black: '15%',
                color: '29%',
            },
        },
        {
            no: '3',
            customer: 'Atul',
            depart1: 'Depat-1',
            depart2: 'None',
            depart3: 'Depat-3',
            depart4: 'None',
            depart5: 'Depat-5',
            location: 'Location',
            sn: 'S/N',
            ip: 'IP',
            model: 'Model',
            hostName: 'Host Name',
            machineCount: 'Machine Count',
            machineCount202110: {
                black: '45%',
                color: '24%',
            },
            usageCountTotal202110: {
                black: '0%',
                color: '0.9%',
            },
        },
    ];

    return (
        <>
            <Paper elevation={4} className="mt-4">
                <TableContainer>
                    <Table>
                        <TableHead align="right" >
                            {columnConfig.map((element) => {
                                return (
                                    <>
                                        <TableCell className="border columnFontWeight" style={{ padding: `${element.innerTable ? '0px' : ''}` }}>
                                            <Tooltip title={element.columnName} placement='top-start'>
                                                <Typography variant='body1' style={{ padding: `${(element.columnName === 'Machine Count ~2021. 10' || element.columnName === 'Usage Count Total {~2021. 10}') ? '8px' : ''}` }}>
                                                    {element.columnName} <TableSortLabel direction={sortDirection} onClick={() => { setSortDirection(sortDirection === "asc" ? "desc" : "asc") }} />
                                                </Typography>
                                            </Tooltip>
                                            {element.innerTable &&
                                                <Table >
                                                    <TableHead >
                                                        {element.innerTable.map((innerElement) => {
                                                            return (
                                                                <TableCell className="border columnFontWeight" style={{ padding: '0px 16px' }}>
                                                                    <Tooltip title={innerElement.columnName} placement='top-start'>
                                                                        <Typography variant='body1'>
                                                                            {innerElement.columnName}
                                                                        </Typography>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableHead>
                                                </Table>
                                            }
                                        </TableCell>
                                    </>
                                )
                            })}
                        </TableHead>
                        <TableBody align="right">
                            {data.map((element) => {
                                return (
                                    <>
                                        <TableRow>
                                            {Object.values(element).map((innerElement) => {
                                                if (typeof (innerElement) != 'object') {
                                                    return (
                                                        <TableCell className="border" >{innerElement}</TableCell>
                                                    )
                                                } else {
                                                    return (
                                                        <>
                                                            <TableCell style={{ padding: '0px' }}>
                                                                <Table>
                                                                    {Object.values(innerElement).map((innerMultiColumns) => {
                                                                        return (
                                                                            <TableCell className="border" style={{ margin: '0px' }}>{innerMultiColumns}</TableCell>
                                                                        )
                                                                    })}
                                                                </Table>
                                                            </TableCell>
                                                        </>
                                                    )
                                                }
                                            })}
                                        </TableRow>
                                    </>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default MonthlyCustomerDeaprtmentBillingReportTable;