import { gql } from "@apollo/client";

export const GET_ALL_DOCUMENTS = gql`
  query GET_ALL_DOCUMENTS {
    getAllDocuments {
      id
      name
      extension
      description
      author
      path
      updatedAt
    }
  }
`;

export const GET_FILE_SIGNED_TO_PUT = gql`
  query Query($type: String!, $name: String!) {
    getFileSignedtoPut(type: $type, name: $name)
  }
`;
