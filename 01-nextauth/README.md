## 🗒️ 문제 : 토큰인증하는 로그인 폼 구현하기

- authjs를 이용하여 token 인증을 하는 로직을 구현
- 기존코드(adopter:firebase+db:firestore)에서 adopter을 제거하고, 인증 기능만 구현
- 요구사항:

```
irestore 제거 필요 (firebase adapter를 사용했다면 이 또한 제거)
로그인하면 firebase-admin 라이브러리 통해 인증 체크해야 함
SNS 계정 로그인 시, firebase-admin 으로 체크해야하는 firebase ui는 각각
-- 카카오: /users/me 요청 이후 내려오는 값의 result.data.id (uid)
-- 네이버: /nid/me 요청 이후 내려오는 값의 result.data.response.id (uid)
-- 구글로그인, 애플로그인은 Firebase 이용해서 token인증

(위 API URL은 각각 SNS서비스 oauth api입니다)

-credentials은 firebase auth 에 emailwithpassword 함수를 사용해주세요
```

## 📢 시도 & 실패

- clint-side 와 server-side에서의 auth.js사용을 이해하지 못해 에러가 발생했다.

`Error: (0 , next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession) is not a function `

원인은 next-auth/react의 hook이였던 useSession을 사용할 때, 'use client'선언을 하지 않은 것이다.

- firebase-admin을 사용하기 위해 firebase페이지에서 키를 새로 생성했다. 그러나 firebase를 제거한다면서 firebase-admin을 사용하기 위해 firebase를 사용한다는 그 과정이 이해가 가지 않았다. 이 과정을 이해하지 못했기 때문에, callback error (configure error) 가 무수히 발생해도 해결할 수 없었다. [next-auth.js(callback) 공식문서](https://next-auth.js.org/v3/configuration/callbacks)
- 사용자정보가 없는데 어떻게 token 인증을 할 수 있는지 그것부터 이해가 가지 않았다.

## ✍️ 어떻게 나아갈 수 있을까?

- cookie, session, token와 같은 클라이언트-서버 간의 인증방식을 공부한다.
- auth.js의 기능을 회원관리로만 한정지어 보았기 때문에 로직을 구현할 수 없었다. auth.js의 configure에 대해 알아본다.
