import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
	query GetClients {
		clients {
			id
			name
			email
			phone
		}
	}
`;

export { GET_CLIENTS };
