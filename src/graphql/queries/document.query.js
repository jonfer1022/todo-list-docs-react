import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_DOCUMENTS, GET_FILE_SIGNED_TO_PUT } from "../content/document.gql";

export const useGetAllDocument = () =>
  useQuery(GET_ALL_DOCUMENTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

export const useGetDocSignedToPut = (name, type) => {
  return useLazyQuery(GET_FILE_SIGNED_TO_PUT, {
    variables: { name, type },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });
}
