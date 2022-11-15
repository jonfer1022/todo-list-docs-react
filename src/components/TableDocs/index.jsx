import GenericTable from "../GenericTable"
import moment from "moment";
import { Edit, Trash } from "../Icons";

const TableDocs = ({
  columns,
  dataSource = [],
  header,
  onEdit,
  onRemove,
  loading,
}) => {
  const data = [];

  dataSource.forEach((item, i) => {
    data[i] = { dataRow: [] };
    columns.forEach((col) => {
      switch (col.key) {
        case "name":
          data[i].dataRow.push({
            key: col.key,
            value: item.name,
          });
          break;
        case "extension":
          data[i].dataRow.push({
            key: col.key,
            value: item.extension,
          });
          break;
        case "author":
          data[i].dataRow.push({
            key: col.key,
            value: item.author,
          });
          break;
        case "description":
          data[i].dataRow.push({
            key: col.key,
            value: item.description,
          });
          break;
        case "uploadDate":
          data[i].dataRow.push({
            key: col.key,
            value: moment(item.updatedAt).format('YYYY-MM-DD'),
          });
          break;
        case "action":
          data[i].dataRow.push({
            key: col.key,
            value: (
              <div className="actionsTableDocs">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onEdit(item)}
                >
                  <Edit />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onRemove(item)}
                >
                  <Trash />
                </div>
              </div>
            ),
          });
          break;
        default:
          break;
      }
    });
    data[i].dataRow.push({
      key: "id",
      value: item.id,
    });
  });

  return (
    <>
      {header ?? header}
      <GenericTable
        data={data}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    </>
  );
};

export default TableDocs;
