import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React from 'react';

const PaginationCustom = ({maxItemsPerPage, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage}) => {
    return <Stack spacing={2} style={{ position: 'absolute', right: "16%", marginTop: "1%" }}>
    <Pagination
      siblingCount={0}
      count={maxItemsPerPage}
      rowsPerPage={rowsPerPage}
      page={page}
      onChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      color="primary" />
  </Stack>;
}

export default PaginationCustom