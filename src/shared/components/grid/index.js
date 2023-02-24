import { useState } from 'react';
import clsx from 'clsx';
import Loader from './loader';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import NoRecords from 'assets/images/no-data.svg';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const noop = () => {
};

const defaultState = {
  selectedRows: [],
};

const mapSortDirection = {
  'A': 'asc',
  'D': 'ddesccs'
};

const Grid = ({
  columns = [],
  rows = [],
  order = [],
  orderBy = [],
  pageSize = 5,
  pageNumber = 1,
  totalRows = 0,
  hasSelection = true,
  filterConfig = {},
  isLoading = false,
  hidePagination = false,
  hideNoRecordImage = false,
  onPageSizeChange = noop,
  onPageNumberChange = noop,
  onSortChange = noop,
  onSelectionChange = noop,
  onReady = noop,
  hasSecondLabel = false,
  tableId = '',
  passedClasses = {},
  clickEvent = noop
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

  if (state.selectedRows.length === 0) {
    localStorage.removeItem('SelectRow');
  }

  const handleSelectAllChange = evt => {
    const { checked } = evt.currentTarget;
    const selectedRows = checked ? rows.map(row => row.id) : [];
    console.log('selectedAllRows')
    console.log(selectedRows)
    localStorage.setItem('SelectRow', JSON.stringify(selectedRows))
    onSelectionChange(selectedRows);
    setState(prevState => ({
      ...prevState,
      selectedRows,
    }))
  };

  const handleSelection = rowId => {
    setState(prevState => {
      const existingSelectionIndex = prevState.selectedRows.indexOf(rowId);
      let selectedRows = prevState.selectedRows.slice();
      existingSelectionIndex === -1 ? selectedRows.push(rowId) : selectedRows.splice(existingSelectionIndex, 1);
      console.log('selectedRows')
      console.log(selectedRows)
      localStorage.setItem('SelectRow', JSON.stringify(selectedRows))
      onSelectionChange(selectedRows);
      return {
        ...prevState,
        selectedRows,
      };
    });
  };

  const handleSortClick = columnId => {
    const newOrder = order === 'A' ? 'D' : 'A';
    const column = columns.find(column => column.id === columnId);
    // (column.id=="insertDt")?alert("test"):alert('fales');
    onSortChange(column, newOrder);
  };

  const handlePageChange = (evt, pageNumber) => {
    evt.stopPropagation();
    onPageNumberChange(pageNumber + 1);
  };

  const handlePageSizeChange = evt => {
    onPageSizeChange(evt.target.value);
  };

  const createSelectionHandler = rowId => evt => handleSelection(rowId, evt);

  if (isLoading) {
    return <Loader columns={columns.length} />
  }

  onReady({
    resetSelection: () => setState(prevState => ({ ...prevState, selectedRows: [] })),
    setSelection: selectedRows => setState(prevState => ({ ...prevState, selectedRows })),
    getSelection: state.selectedRows,
  })

  const SelectedColoumClickEvent = (label) => {
    if (label === t('Name') || label === t('Polling Interval (Minutes)') || label === t('Action')) {
    } else {
      clickEvent()
    }
  }

  return (
    <div className={classes.root}>
      <TableContainer className={clsx(classes.container, passedClasses.container)}>
        <Table id={tableId} stickyHeader>
          <TableHead>
            <TableRow className={classes.row}>
              {hasSelection && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    indeterminate={state.selectedRows.length && state.selectedRows.length < rows.length}
                    checked={rows.length && state.selectedRows.length === rows.length}
                    onChange={handleSelectAllChange}
                    inputProps={{ 'aria-label': 'slect all' }}
                  />
                </TableCell>
              )}
              {columns.map(column => {
                const content = column.canSort
                  ? (
                    <TableSortLabel
                      classes={{
                        root: classes.sortLabel
                      }}
                      key={column.id}
                      //active={orderBy === column.id}
                      //direction={orderBy === column.id ? mapSortDirection[order] : 'asc'}
                      onClick={() => handleSortClick(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <span className='ml-2'>
                          <i className={`fas fa-caret-${order === 'D' ? 'down' : 'up'}`} style={{ fontSize: 14 }}></i>
                        </span>
                      ) :
                        <span className='ml-2'><i className="fas fa-sort" style={{ fontSize: 14 }}></i></span>
                      }
                    </TableSortLabel>
                  ) : <span>{column.label}</span>;

                return (
                  <TableCell
                    key={column.id}
                    align={'center'}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                    className={clsx(classes.tableCell, passedClasses.tableCell, column.headerClasss)}
                    style={{ width: `${column.label === t('newPrinterAction') ? '169px' : ''}`, textAlign: `${column.label === t('newPrinterAction') ? '-webkit-center' : ''}` }}
                  >
                    <Tooltip title={column.tooltip || column.label} placement='top-start'>
                      <Typography variant='body1'
                        className={`text-bold ${clsx('', classes.fontboldsize)}`}>{content}</Typography>
                    </Tooltip>
                  </TableCell>
                )
              })}
            </TableRow>
            {hasSecondLabel && (
              <TableRow className={classes.row}>
                {columns.map(column => {
                  const content = <span>{column.secondLabel || '0'}</span>;
                  return (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? 'right' : 'left'}
                      padding={column.disablePadding ? 'none' : 'default'}
                      className={clsx(classes.tableCell)}
                    >
                      <Tooltip title={column.tooltip || column.label} placement='top-start'>
                        <Typography variant='body1' className='text-bold '> {content}</Typography>
                      </Tooltip>
                    </TableCell>
                  )
                })}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            <>
              {(!isLoading && rows.length === 0 && !hideNoRecordImage) && (
                <TableCell colSpan={columns.length + 1} className='align-center'>
                  {/* <img alt='No Records Found' src={NoRecords} height={400} /> */}
                  <Typography variant='body1' className='text-bold'>
                    {t('noDataFound')}!
                  </Typography>
                </TableCell>
              )}
              {rows.map((row, rowIndex) => {
                const selectionHandler = createSelectionHandler(row.id)
                let content = <></>;
                if (rows.render) {
                  content = rows.render();
                } else {
                  const labelId = `table-checkbox-${rowIndex}`;
                  content = (
                    <>
                      {hasSelection && (
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={state.selectedRows.indexOf(row.id) !== -1}
                            onChange={selectionHandler}
                            inputProps={{ 'aria-label': labelId }}
                          />
                        </TableCell>
                      )}
                      {columns.map((column, columnIndex) => {
                        let content = <span>{row[column.field]?.toString() || ''}</span>;
                        if (column.render) {
                          content = column.render(row)
                        }
                        return (
                          <TableCell
                            key={`${column.label || 'grid-column'}-${columnIndex}${row.id}`}
                            className={clsx(classes.tableCell, passedClasses.tableCell, column.headerClasss)}
                            onClick={() => { SelectedColoumClickEvent(column.label) }}
                          >
                            <Tooltip title={row[column.field] || ''} placement='top-start'>
                              <Typography variant='body1' className={clsx('', classes.fontsin)}>{content} </Typography>
                            </Tooltip>
                          </TableCell>
                        )
                      })}
                    </>
                  )
                }
                return (
                  <TableRow
                    hover
                    key={row.id}
                    className={clsx(classes.row, `${rows.length === 1 ? classes.removeHoverEffect : ''}`)}
                  >
                    {content}
                  </TableRow>
                )
              })}
            </>
          </TableBody>
        </Table>
      </TableContainer>
      {!hidePagination && (
        <TablePagination
          className='mt-4 setPagination'
          component='div'
          rowsPerPageOptions={[5, 10, 50, 100, 200, 300]}
          count={totalRows}
          rowsPerPage={pageSize}
          colSpan={3}
          page={pageNumber - 1}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default Grid;
