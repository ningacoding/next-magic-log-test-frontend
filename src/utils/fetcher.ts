const fetcher = async (...args: any[]) => {
  // alert(JSON.stringify(args));
  const [params] = args;
  let url, body;
  if (typeof params === 'string') {
    url = params;
  } else {
    const [urlParam, bodyParam] = params;
    url = urlParam;
    body = bodyParam;
  }
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const accessToken = localStorage.getItem('accessToken');
  if (!!accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  try {
    const res = await fetch(url, {
      mode: 'cors',
      method: !!body ? 'POST' : 'GET',
      body: JSON.stringify(body),
      headers,
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: e,
    };
  }
};
export default fetcher;
