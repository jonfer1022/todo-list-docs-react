import { gql } from "@apollo/client";

export const CREATE_DOCUMENT = gql`
  mutation CREATE_DOCUMENT($documentInput: DocumentInput!) {
    createDocument(documentInput: $documentInput)
  }
`;

export const REMOVE_DOCUMENT = gql`
  mutation REMOVE_DOCUMENT($documentInput: DocumentInput!) {
    removeDocument(documentInput: $documentInput)
  }
`;

export const EDIT_DOCUMENT = gql`
  mutation EDIT_DOCUMENT($documentInput: DocumentInput!) {
    editDocument(documentInput: $documentInput)
  }
`;