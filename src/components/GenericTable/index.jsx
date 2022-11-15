import { Spinner } from 'react-bootstrap';
import './style.css';

const GenericTable = ({
  data = [],
  columns = [],
  loading,
  component,
  checkbox,
  sort,
  selectAll = false,
  setSelectAll,
  dataSource,
  dataSelected = [],
  setDataSelected,
  attributesSelected = [],
  setSortState,
  redirectEdit,
  setSortAscDesc,
  onClick
}) => {
  // const [sortChoice, setSortChoice] = useState(true);
  // const onHandleAll = () => {
  //   if (selectAll) {
  //     setSelectAll(false);
  //     setDataSelected([]);
  //   } else {
  //     setSelectAll(true);
  //     const allData = dataSource.map(item => {
  //       const newObj = {};
  //       attributesSelected.forEach(el => {
  //         newObj[el] = item[el];
  //       });
  //       return newObj;
  //     });
  //     setDataSelected(allData);
  //   }
  // };

  // const onHandleChange = id => {
  //   const _dataSelected = dataSelected.slice();

  //   if (dataSelected.find(el => el.id === id)) {
  //     setDataSelected(_dataSelected.filter(el => el.id !== id));
  //   } else {
  //     const newSelected = {};
  //     dataSource.forEach(item => {
  //       if (item.id === id) {
  //         attributesSelected.forEach(el => {
  //           newSelected[el] = item[el];
  //         });
  //       }
  //     });
  //     _dataSelected.push(newSelected);
  //     setDataSelected(_dataSelected);
  //   }
  // };

  // const handleSort = item => {
  //   setSortState(item.key);
  //   setSortChoice(!sortChoice);
  //   setSortAscDesc(sortChoice ? 'ASC' : 'DESC');
  // };

  return (
    <div className="contentTable">
      <table>
        <thead>
          <tr>
            {/* {checkbox ? (
              <th
                style={{
                  width: '3%'
                }}
              >
                <div className="custom-control custom-checkbox">
                  <Checkbox
                    id="select-all-items"
                    value={selectAll}
                    onChange={() => onHandleAll()}
                  />
                </div>
              </th>
            ) : null} */}

            {columns.length
              ? columns.map((item, i) => {
                  return (
                    <th
                      key={`column-table-${i}`}
                      className="text-bold"
                      style={{
                        width: item.width
                      }}
                    >
                      {/* <div> */}
                        <span>{item.name}</span>
                        {/* {sort ? (
                          <div className="arrowSort">
                            <button
                              className="buttonSort"
                              onClick={() => {
                                handleSort(item);
                              }}
                            >
                              <ArrowSort />
                            </button>
                          </div>
                        ) : null} */}
                      {/* </div> */}
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {
          !loading ? (
            data.length ? (
              data.map((item, i) => {
                const rowId = item?.dataRow.find(el => el.key === 'id');
                const checked = dataSelected.find(el => el.id === rowId.value);

                return (
                  <tr
                    key={`row-table-${i}`}
                    className={'row-data'}
                    // className={
                    //   i === data.length - 1
                    //     ? 'row-data'
                    //     : 'row-data lowerBorder'
                    // }
                  >
                    {/* {checkbox && (
                      <td>
                        <Checkbox
                          id={`select-item-${rowId.value}`}
                          value={Object.keys(checked || {}).length}
                          onChange={() => onHandleChange(rowId)}
                        />
                      </td>
                    )} */}
                    {item.dataRow.map(data => {
                      if (columns.find(el => el.key === data.key)) {
                        return (
                          <td
                            key={`row-data-${data.key}`}
                            // className={'classSalaryDate'}
                          >
                            {data.value}
                            {/* {data.key === 'teamName' ||
                            data.key === 'groupName' ? (
                              <button
                                className="noButtonStyle"
                                onClick={() => onClick(rowId)}
                              >
                                {data.value}
                              </button>
                            ) : (
                              data.value
                            )} */}
                          </td>
                        );
                      } else return null;
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td 
                  // colSpan={columns.length + 1 || '1'}
                >
                  {component || <div>No data</div>}
                </td>
              </tr>
            )
          ) 
          : (
            <tr>
              <td colSpan={columns.length + 1 || '1'}>
                <div style={{ textAlign: 'center', padding: '100px' }}>
                  <Spinner animation="border"/>
                </div>
              </td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
