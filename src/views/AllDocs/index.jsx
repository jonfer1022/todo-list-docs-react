import { useEffect, useRef, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import {
  AddButton,
  NeutralButton,
  TableDocs,
  UpdateFile,
} from "../../components";
import "./style.css";
import {
  CREATE_DOCUMENT,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT,
} from "../../graphql/mutations/documents";
import {
  useGetAllDocument,
  useGetDocSignedToPut,
} from "../../graphql/queries/document.query";

const initialsColumns = [
  {
    name: "Name",
    key: "name",
    // width: '40%'
  },
  {
    name: "Extension",
    key: "extension",
  },
  {
    name: "Author",
    key: "author",
  },
  {
    name: "Description",
    key: "description",
  },
  {
    name: "Upload Date",
    key: "uploadDate",
  },
  {
    name: "Actions",
    key: "action",
    // width: '10%'
  },
];

const AllDocs = () => {
  const inputRef = useRef(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [allDocuments, setAllDocuments] = useState([]);
  const [docChoose, setDocChoose] = useState(null);
  const [newDoc, setNewDoc] = useState(null);

  const {
    data: dataAllDocs,
    loading: allDocumentLoading,
    refetch: refetchAllDocs,
  } = useGetAllDocument();

  const [getDocSignetLazy, { loading: docSignedLoading }] =
    useGetDocSignedToPut();

  const [createDocumentMutation, { loading: createDocLoading }] =
    useMutation(CREATE_DOCUMENT);

  const [removeDocumentMutation, { loading: removeDocLoading }] =
    useMutation(REMOVE_DOCUMENT);

  const [editDocumentMutation, { loading: editDocLoading }] =
    useMutation(EDIT_DOCUMENT);

  useEffect(() => {
    if (dataAllDocs?.getAllDocuments) {
      setAllDocuments(dataAllDocs?.getAllDocuments);
    }
  }, [dataAllDocs]);

  const getSignedDoc = async () => {
    const result = await getDocSignetLazy({
      variables: {
        name: file.name,
        type: file.type,
      },
    });
    if (result?.data?.getFileSignedtoPut) {
      await loadDocument(result?.data?.getFileSignedtoPut);
    }
  };

  const submitFile = async (url) => {
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
  };

  const loadDocument = async (path) => {
    try {
      const ext = file.name.split(".")[file.name.split(".").length - 1];
      setShowModalCreate(false);
      await submitFile(path);
      await createDocumentMutation({
        variables: {
          documentInput: {
            name: file.name.replace(`.${ext}`,''),
            extension: ext,
            author: newDoc?.author || null,
            description: newDoc?.description || null,
            path: path,
          },
        },
      });
      refetchAllDocs();
      setFile(null);
    } catch (error) {
      console.log("-----> ~ loadDocument ~ error", error);
      setFile(null);
    }
  };

  const removeDoc = async () => {
    setShowModalRemove(false);
    await removeDocumentMutation({
      variables: {
        documentInput: {
          id: docChoose.id,
          name: docChoose.name,
          extension: docChoose.extension,
        },
      },
    });
    refetchAllDocs();
  };

  const editDoc = async () => {
    setShowModalEdit(false);
    await editDocumentMutation({
      variables: {
        documentInput: {
          id: docChoose.id,
          name: docChoose.name,
          author: docChoose.author,
          description: docChoose.description,
          extension: docChoose.extension,
        },
      },
    });
    refetchAllDocs();
  };

  return (
    <>
      <TableDocs
        columns={initialsColumns}
        dataSource={allDocuments}
        loading={
          createDocLoading ||
          allDocumentLoading ||
          removeDocLoading ||
          editDocLoading ||
          docSignedLoading
        }
        onEdit={(item) => {
          setShowModalEdit(true);
          setDocChoose(item);
        }}
        onRemove={(item) => {
          setShowModalRemove(true);
          setDocChoose(item);
        }}
        header={
          <div className="header-docs">
            <AddButton
              text="Add document"
              onClick={() => setShowModalCreate(true)}
            />
          </div>
        }
      />

      {/* Modal Create Document */}
      <Modal
        show={showModalCreate}
        className="modalCreate"
        onHide={() => {
          setFile(null);
          setNewDoc(null);
          setShowModalCreate(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add the document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              value={file?.name || ""}
              placeholder="Name"
              disabled={true}
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              placeholder="Author"
              onChange={(e) =>
                setNewDoc((item) => ({ ...item, author: e.target.value }))
              }
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              placeholder="Description"
              onChange={(e) =>
                setNewDoc((item) => ({ ...item, description: e.target.value }))
              }
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <UpdateFile
            inputRef={inputRef}
            onChoose={(file) => setFile(file)}
          >
            <NeutralButton
              text="Choose Document"
              onClick={() => inputRef.current?.click() || null}
            />
          </UpdateFile>
          <AddButton
            text="Load Document"
            onClick={() => getSignedDoc()}
            disabled={!file}
          />
        </Modal.Footer>
      </Modal>

      {/* Modal Remove Document */}
      <Modal
        show={showModalRemove}
        className="modalCreate"
        onHide={() => {
          setShowModalRemove(false);
          setDocChoose(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Are you sure to remove the document?</span>
        </Modal.Body>
        <Modal.Footer>
          <AddButton
            text="Remove Document"
            onClick={(item) => removeDoc(item)}
          />
        </Modal.Footer>
      </Modal>

      {/* Modal Edit Document */}
      <Modal
        show={showModalEdit}
        className="modalCreate"
        onHide={() => {
          setFile(null);
          setShowModalEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit the document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              value={docChoose?.name || ""}
              placeholder="Name"
              disabled={true}
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              value={docChoose?.author || ""}
              placeholder="Author"
              onChange={(e) =>
                setDocChoose((item) => ({ ...item, author: e.target.value }))
              }
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              value={docChoose?.description || ""}
              placeholder="Description"
              onChange={(e) =>
                setDocChoose((item) => ({
                  ...item,
                  description: e.target.value,
                }))
              }
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <AddButton text="Update Document" onClick={() => editDoc()} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllDocs;
