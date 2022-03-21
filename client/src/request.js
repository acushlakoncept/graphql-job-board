const endpointURL = 'http://localhost:9000/graphql';

export const graphqlRequest = async (query, variables={}) => {

  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables}),
  });
  const responseBody = await response.json();
  if(responseBody.errors) {
    const message = responseBody.errors.map(error => error.message).join('\n');
    throw new Error(message)
  }

  return responseBody.data;
}


export const loadJobs = async () => {
  const query = `
     {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export const loadJob = async (id) => {
  const query = `
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;

  const { job } = await graphqlRequest(query, {id});
  return job;
}


