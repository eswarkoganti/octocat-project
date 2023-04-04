import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import '../../scss/AssessmentList.scss';
import { useFilters, useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import { COLUMNS } from './Columns';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  const fetchAssessments = async () => {
    let dateFormat;
    setLoading(true);
    await AssessmentService.getList().then(response =>
      dateFormat = response.data.assessments);
    dateFormat.forEach(x => {
      x.createdAt = moment(x.createdAt).format(`YYYY-MM-DD`);
      x.updatedAt = moment(x.updatedAt).format(`YYYY-MM-DD`);
      x.deletedAt = moment(x.deletedAt).format(`YYYY-MM-DD`);
      x.catDateOfBirth = moment(x.catDateOfBirth).format(`YYYY-MM-DD`);
    });
    setAssessments(dateFormat);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = assessments;

  const handleDelete = (id) => {
    const text = `Are you sure you want to delete the assessment?`;
    if (window.confirm(text) === true) {
      AssessmentService.deleteAssessment(id).then(response => {
        if (response.status === 200) {
          const newLists = assessments.filter(x => x.id !== id);
          setAssessments(newLists);
          // fetchAssessments();
        }
      });
    }
  };

  const assessmentTable = useTable({
    columns,
    data,
  }, useFilters, useSortBy);

  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } = assessmentTable;

  return (
    <>
      {
        loading ?
          <div>Data is loading.....</div> :
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) =>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) =>
                    <th>
                      <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render(`Header`)}
                        <span>{column.isSorted ? column.isSortedDesc ? `🔼` : `🔽` : ``}</span>
                      </div>
                      {column.canFilter ? column.render(`Filter`) : null }
                    </th>)}
                  <th>Actions</th>
                </tr>)}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(row.values.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ); })}
            </tbody>
          </table>
      }
    </>
  );
};
