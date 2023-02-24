import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Loader = ({ pageSize = 5, columns: columnsLength = 0 }) => {
  const columns = new Array(columnsLength).fill('Column Loading');
  const rows = new Array(pageSize).fill('Row Loading');
  
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow key='head-row-loader'>
            {columns.map((column, columnIndex) => (
              <TableCell
                key={`head-col-loader-${columnIndex}`}
                className='loading'

              >
                <span className='v-hidden'>{column}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={`body-row-loader-${rowIndex}`}>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`row-loader-${rowIndex}-${columnIndex}`}
                  className='no-border'
                >
                  <div
                    className='loading'
                    style={{ width: rowIndex % 2 === 0 ? '100px' : columnIndex % 2 === 0 ? '50px' : 'auto' }}
                  >
                    <span className='v-hidden'>{column}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default Loader;