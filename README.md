# FairOS-js

API Client for FairOS API written in Typescript



## Features

- Built-in Typescript support



## Documentation

browse [Documentation](https://soheil555.github.io/fairOS-js).



## Installation

```bash
npm i fairos-js
```



## Example Usage

```typescript
import FairOS from "fairos-js";

//fairOS object is able to call routes that do not require authentication cookie
const fairOS = new FairOS({
    providerUrl: "https://fairos.fairdatasociety.org/v1",
});

//user object is able to call all routes that require authentication cookie
const user = await fairOS.userLogin({
    user_name: "test_user",
    password: "123456",
});

const userStat = await user.stat();

console.log(
    `user stat. username: ${userStat.user_name}, address: ${userStat.address}`
);

const pod = await user.podNew({
    pod_name: "test_pod",
    password: "123456",
});

//these two are the same. but calling makeDir from pod object doesn't require you to set pod_name every time.
const dir = await pod.makeDir({
    dir_path: "test_dir",
});

const sameDir = await user.fsMakeDir({
    pod_name: "test_pod",
    dir_path: "test_dir"
}) 

//upload a file
const buffer = Buffer.from("test file", "utf-8")

const file = await dir.uploadFile({
      file_buffer: buffer,
      file_name: "test.txt",
      dfs_compression: "gzip",
      block_size: "1Mb",
    });
```



You can directly import User, FSDirectory, FSFile, Pod, KVTable and DocumentTable but using them requires you to set cookies.

For example:

```typescript
import {
  FairOS,
  User,
  FSDirectory,
  FSFile,
  Pod,
  KVTable,
  DocumentTable,
} from "fairos-js";


const pod = new Pod({
    providerUrl: "https://fairos.fairdatasociety.org/v1",
    name: "test_pod",
    cookies: "fairOS-dfs=MTYxMjUwNDI5NnxSMmFYcUphY...."
  });

const table = await pod.docCreateDB({
    table_name: "test_table",
    si: "first_name=string",
    mutable: true,
});

await table.open();

const result = await pod.docCount({
    table_name: "test_table",
});
console.log(result.message);
```





## Testing

```bash
cp .env.example .env
```

Set `FAIROS_API` on `.env` file.

```bash
npm run test
```



## License

Available under the MIT license. See the `LICENSE` file for more info.

