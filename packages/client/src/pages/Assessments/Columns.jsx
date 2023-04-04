import { FilterColumns } from './FilterColumns';

export const COLUMNS = [
  {
    Filter: FilterColumns,
    Header: `Id`,
    accessor: `id`,
  },
  {
    Filter: FilterColumns,
    Header: `Instrument Type`,
    accessor: `instrumentType`,
  },
  {
    Filter: FilterColumns,
    Header: `Score`,
    accessor: `score`,
  },
  {
    Filter: FilterColumns,
    Header: `Risk Level`,
    accessor: `riskLevel`,
  },
  {
    Filter: FilterColumns,
    Header: `Cat Name`,
    accessor: `catName`,
  },
  {
    Filter: FilterColumns,
    Header: `Cat Date of Birth`,
    accessor: `catDateOfBirth`,
  },
  {
    Filter: FilterColumns,
    Header: `Created At`,
    accessor: `createdAt`,
  },
  {
    Filter: FilterColumns,
    Header: `Updated At`,
    accessor: `updatedAt`,
  },
];
