import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }

      results {
        id
        name
        image
        species
        gender
        location {
          name
        }
        episode {
          id
          name
          episode
        }
      }
    }
  }
`;

export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        species
        gender
        location {
          name
        }
        episode {
          id
          name
          air_date
          episode
        }
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      location {
        name
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;
