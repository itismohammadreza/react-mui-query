import { RequestConfig } from "@models/common";

export const RequestsConfig: Readonly<RequestConfig[]> = [
  // {pathTemplate: /photos/g},
  // {pathTemplate: 'your/*/custom/*/path/*/template'},
  {
    pathTemplate: '/api/v1/login',
    method: 'POST',
    successMessage: false,
    failureMessage: null,
    loading: false,
    isCustomApi: false
  },
  {
    pathTemplate: '/api/v1/products',
    method: 'GET',
    successMessage: (req, res) => {
      return 'موفقیت آمیز بود'
    },
    failureMessage: (req, res) => {
      return 'با موفقیت شکست خورد'
    },
    loading: true,
    isCustomApi: false
  },
  {
    pathTemplate: 'https://jsonplaceholder.typicode.com/photos*',
    method: 'GET',
    successMessage: (req, res) => {
      return 'موفقیت آمیز بود'
    },
    failureMessage: null,
    loading: true,
    isCustomApi: true // when set to true, pathTemplate compared with complete request url with its params, otherwise compared with endpoint
  },
];
