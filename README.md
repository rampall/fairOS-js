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

```



## License

Available under the MIT license. See the `LICENSE` file for more info.

