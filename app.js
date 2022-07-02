// Creator: WebInspector 537.36

import { sleep, group,check } from 'k6'
import http from 'k6/http'

export const options = {
  vus: 3000,
  duration: '100s',
}

export default function main() {
  let response

  group('graph api', function () {
    let data = {
      "query":"query {\n  \n  demoapp {\n    id\n    name\n  }\n}"
    };
    response = http.post(
      'http://localhost:8080/v1/graphql',
      JSON.stringify(data),
      {
        headers: {
          Accept: '*/*',
          "content-type": "application/json",
          Host: 'localhost:8080',
          Origin: 'http://localhost:8080',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          'content-type': 'application/json',
        },
      }
    )
    const checkRes = check(response, {
      'status is 200': (r) => r.status === 200
    });

  })
  sleep(0.1)

}
