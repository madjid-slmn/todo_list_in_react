const API_URL = 'http://graphql.unicaen.fr:4000';

const SIGN_UP = `
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password)
  }
`;

const SIGN_IN = `
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export function signUp(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: { username, password }
    })
  })
  .then(response => response.json())
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0];
    }
    return jsonResponse.data.signUp; // Retourne le jeton JWT
  })
  .catch(error => {
    throw new Error(error.message);
  });
}

export function signIn(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: { username, password }
    })
  })
  .then(response => response.json())
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0];
    }
    return jsonResponse.data.signIn; // Retourne le jeton JWT
  })
  .catch(error => {
    throw new Error(error.message);
  });
}
