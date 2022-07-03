// Creator: WebInspector 537.36

import { sleep, group,check } from 'k6'
import http from 'k6/http'

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '2m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: { http_req_duration: ['avg<1500', 'p(95)<200'] },
  //noConnectionReuse: true,
  userAgent: 'MyK6UserAgentString/1.0',
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
