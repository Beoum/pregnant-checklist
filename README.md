## 프로젝트 설명

* Nest.js, GraphQL, TypeORM을 사용하여 개발
* Layered Architecture를 적용하여 각 Layer가 독립적으로 작동
  * 관심사와 역할이 명확하게 분리
  * 이로써 코드 베이스가 간결하며 유지보수가 용이하도록 구성

## 폴더/파일 구조
```lua
|-- src
| |-- presentation
| | |-- graphql
| |-- application
| |-- domain
| | |-- user
| | | |-- user.service.ts
| | |-- checklist
| | | |-- checklist.service.ts
| |-- util
| | |-- date.util.ts
...
```
- **src**: 소스 코드가 위치하는 디렉토리입니다.
    - **presentation**: 표현 계층에 해당하는 디렉토리입니다.
    - **application**: 도메인의 유즈 케이스를 이용해 실제 어플리케이션을 구성하는 계층에 해당하는 디렉토리입니다.
    - **domain**: 도메인 계층에 해당하는 디렉토리입니다.
         - ***.service.ts**: 도메인의 유즈 케이스들을 구현한 파일입니다. 
         - ***.entity.ts**: 도메인을 표현 및 영속화를 위한 파일입니다.
    - **exception**: 계층들에서 사용할 수 있는 공용 Exception들의 디렉토리입니다.
    - **util**: 다른 계층에 속하지 않으며 util 기능을 제공하는 디렉토리입니다.
        - **date.util.ts**: 날짜 관련 라이브러리가 프로젝트 전반에 침투하는 상황을 방지하고 사용처에서 구현체보다 행위 자체 집중할 수 있도록 만들어진 date util 입니다.

## 코드 작성 시 마주친 문제와 해결 과정
### 문제: Entity 설계시 TypeORM과 함께 사용할 때 생성자의 모든 필드를 optional 처리해야하는 문제.
생성자를 이용해 유효성검증이 끝난, 견고한 Entity를 생성하고 싶었으나. TypeORM과 함께 이용시 모든 필드를 optional 처리해야하는 문제.
#### 해결 과정:
생성자를 호출하지 않고 생성자 역할을 해줄 수 있는 static create 함수 작성
```typescript
  static create(nickname: string, dueDate: string): User {
    if (typeof nickname !== 'string' || nickname.length === 0) {
      throw new IllegalArgumentException('check nickname');
    }
    if (!DateUtil.validateDateWithFormat(dueDate)) {
      throw new IllegalArgumentException('check dueDate');
    }
    const user = new this();
    user.nickname = nickname;
    user.dueDate = dueDate;
    return user;
  }
```

## 미흡한점
1. interceptor를 이용한 authorize 과정
2. 공용 Exception 사용시 사용자에게 500에러로 내려가는 점
3. Entity 제외 다른 코드들의 Test Code 부재
4. @nest/config 미적용
5. Symbol을 이용한 Custom Provider 활용