//запрос на сервер с готправкой данных
export const setData = (data) => {
  return fetch(`${config.baseUrl}/some/query`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res))
    .then((result) => {
      console.log(result);
    }); 
};
