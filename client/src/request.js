const endpointURL = 'http://localhost:9000/graphql';


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
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query}),
  });
  const {data} = await response.json();
  return data.jobs;
}


