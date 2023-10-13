## 프로젝트 진행 기간

2023.08.21(월) ~ 2023.10.06(금)

SSAFY 9기 2학기 특화 프로젝트-OASYS

## OASYS 배경
디지털 전환으로 인해 금융업무는 점차적으로 IT 기기로 대체되고 있습니다.
그러나 금융 취약 계층은 이러한 IT기기를 사용하기 어려울 것으로 예상되어, 이러한 고객층을 지원하고자 One-stop Aid System for Senior People (A.K.A OASYS) 프로젝트를 기획하게 되었습니다.

## 현장 조사 및 인터뷰

## OASYS 개요
OASYS는 얼굴 인식과 음성 인식 기술을 활용한 AI 컨시어지 키오스크 서비스입니다. 얼굴 인식을 기반으로 어르신분들이 더 편리하게 이용할 수 있도록 UI가 변환됩니다. 또한, 음성 인식을 통해 고객의 방문 의도를 파악하고 원하는 창구 업무로 연결됩니다. 음성 출력 서비스를 통해 더욱 서비스를 편리하게 이용할 수 있습니다. 더불어 번호표 용지를 최소화하기 위해 문자 및 전화 서비스를 제공하며 고객의 대기 시간을 줄일 수 있습니다.

## OASYS 목표
이 프로젝트는 금융 서비스의 접근성을 높이고, 취약한 고객층이 은행 업무를 훨씬 더 편리하게 이용할 수 있도록 주요 목표로 하고 있습니다.

## 주요 기능


## 영상

## 사용한 버전관리

#### <i>OS</i>
OS : Ubuntu 20.04 LTS

---

#### <i>Servers</i>
Nginx : nginx/1.25.2

JVM : openjdk 11.0.16 2022-07-19 / OpenJDK Runtime Environment 18.9 (build 11.0.16+8) / OpenJDK 64-Bit Server VM 18.9 (build 11.0.16+8, mixed mode, sharing)

Spring boot : 2.7.15

React : 18.2.0

NodeJS : 18.17.1

---

#### <i>Build</i>
Maven : Apache Maven 3.6.4

NPM : 9.8.0

---

#### <i>DB</i>


MariaDB : 11.1.2-MariaDB, client 15.2 for debian-linux-gnu (x86_64) using  EditLine wrapper

Redis : 7.2.1


---

#### <i>extra</i>

Docker : Docker version 24.0.5, build 24.0.5-0ubuntu1~20.04.1

Jenkins : 2.414.1

prometheus : 2.47.0

Grafana : 10.1.4

---

#### <i>IDE</i>

Intellij IDEA 2023.1.3 (Ultimate Edition)

Visual Studio Code 1.82.2

---

#### <i>외부 서비스</i>
얼굴 인식 : sk open api ( NUGU facecan ) 버전 : v1

문자 알림 : coolsms , 버전: 4.3.0

전화 알림 : twilio, 버전 : 9.9.1

GPT API : gpt-3.5-turbo

TTS : google Cloud Text-to-Speech API v1

참고) STT : react speech kit 3.0.1



## 프로젝트 구조

- 전체 프로젝트 구조
![최종_아키텍처](/uploads/ea879e2e120d5c9dfb587a48bbbbd489/최종_아키텍처.png)

- 파일 구조
    - Back
    
        manager-service
        ```
        Back-End (서버에 있는 manager-service)
            ├── Dockerfile
            ├── pom.xml
            ├── src
            │   └── main
            │       ├── java
            │       │   └── com
            │       │       └── dolfin
            │       │           └── oasys
            │       │               ├── OasysApplication.java
            │       │               ├── config
            │       │               │   └── RedisConfig.java
            │       │               ├── controller
            │       │               │   └── ManagerController.java
            │       │               ├── model
            │       │               │   ├── dto
            │       │               │   │   ├── MemberDto.java
            │       │               │   │   └── TellerStatusDTO.java
            │       │               │   └── entity
            │       │               │       ├── Member.java
            │       │               │       └── TellerType.java
            │       │               ├── repository
            │       │               │   ├── MemberRepository.java
            │       │               │   └── TellerTypeRepository.java
            │       │               ├── service
            │       │               │   ├── ManagerService.java
            │       │               │   └── ManagerServiceImpl.java
            │       │               └── util
            │       │                   └── SendMessage.java
            │       └── resources
            │           └── application.yml
            └── target
        ```

        kiosk-service

        ```
        Back-End_AI
            ├── mvnw
            ├── mvnw.cmd
            ├── pom.xml
            └── src
                ├── main
                │   ├── java
                │   │   └── com
                │   │       └── dolfin
                │   │           └── oasys
                │   │               ├── OasysApplication.java
                │   │               ├── config
                │   │               │   └── WebConfigurer.java
                │   │               ├── domain
                │   │               │   ├── face
                │   │               │   │   ├── controller
                │   │               │   │   │   └── FaceController.java
                │   │               │   │   ├── exception
                │   │               │   │   │   ├── APIConnectException.java
                │   │               │   │   │   ├── CommunicationLimitException.java
                │   │               │   │   │   └── InvalidImageException.java
                │   │               │   │   ├── model
                │   │               │   │   │   └── dto
                │   │               │   │   │       ├── DeleteDto.java
                │   │               │   │   │       ├── ExpressionRaw.java
                │   │               │   │   │       ├── FaceBox.java
                │   │               │   │   │       ├── FaceDetect.java
                │   │               │   │   │       ├── FaceRecognize.java
                │   │               │   │   │       ├── FaceResponse.java
                │   │               │   │   │       ├── FaceSaveResponse.java
                │   │               │   │   │       ├── Faces.java
                │   │               │   │   │       └── SubCreate.java
                │   │               │   │   └── service
                │   │               │   │       ├── FaceService.java
                │   │               │   │       └── FaceServiceImpl.java
                │   │               │   ├── gpt
                │   │               │   │   ├── controller
                │   │               │   │   │   └── GptController.java
                │   │               │   │   └── service
                │   │               │   │       ├── GPTService.java
                │   │               │   │       └── PlayerMP3.java
                │   │               │   ├── member
                │   │               │   │   ├── model
                │   │               │   │   │   ├── dto
                │   │               │   │   │   │   └── MemberDto.java
                │   │               │   │   │   └── entity
                │   │               │   │   │       ├── Gender.java
                │   │               │   │   │       ├── Member.java
                │   │               │   │   │       └── Role.java
                │   │               │   │   └── repository
                │   │               │   │       └── MemberRepository.java
                │   │               │   ├── notification
                │   │               │   │   ├── controller
                │   │               │   │   │   └── NotificationController.java
                │   │               │   │   ├── dto
                │   │               │   │   │   └── SMSNotificationRequest.java
                │   │               │   │   └── service
                │   │               │   │       ├── NotificationService.java
                │   │               │   │       └── NotificationServiceImpl.java
                │   │               │   ├── stt
                │   │               │   │   └── controller
                │   │               │   │       ├── NaverCloud.java
                │   │               │   │       ├── NaverController.java
                │   │               │   │       ├── VideoController.java
                │   │               │   │       └── VoiceController.java
                │   │               │   ├── tellertype
                │   │               │   │   └── model
                │   │               │   │       └── entity
                │   │               │   │           └── TellerType.java
                │   │               │   └── tts
                │   │               │       └── TtsController.java
                │   │               └── exception
                │   │                   ├── ControllerAdvice.java
                │   │                   ├── CustomException.java
                │   │                   ├── ErrorCode.java
                │   │                   └── ErrorResponse.java
                │   └── resources
                │       ├── application.yml
                │       ├── confirm.jsonl
                │       ├── ftOasys.jsonl
                │       └── mp3
                └── test
        ```

    - Frontend
        ```
        frontend/oasys
                ├── Dockerfile
                ├── README.md
                ├── index.html
                ├── nginx.conf
                ├── nginx.conf.bak2
                ├── package-lock.json
                ├── package.json
                ├── public
                │   └── favicon.ico
                ├── src
                │   ├── App.tsx
                │   ├── api
                │   │   ├── faces.ts
                │   │   ├── instance.ts
                │   │   ├── manager.ts
                │   │   ├── members.ts
                │   │   ├── notification.ts
                │   │   └── voice.ts
                │   ├── assets
                │   │   ├── fonts
                │   │   ├── icons
                │   │   ├── images
                │   │   ├── sounds
                │   │   └── styles
                │   │       ├── emotion.d.ts
                │   │       ├── global.ts
                │   │       └── theme.ts
                │   ├── components
                │   │   ├── common
                │   │   │   ├── animation
                │   │   │   ├── button
                │   │   │   ├── dropdown
                │   │   │   ├── footer
                │   │   │   ├── header
                │   │   │   ├── input
                │   │   │   └── overlay
                │   │   ├── modal
                │   │   │   ├── Modal.tsx
                │   │   │   └── index.ts
                │   │   └── numpad
                │   │       ├── Numpad.tsx
                │   │       └── index.ts
                │   ├── config
                │   │   └── bankingConfig.ts
                │   ├── customTypes
                │   │   ├── apiTypes.ts
                │   │   ├── componentTypes.ts
                │   │   ├── routerTypes.ts
                │   │   └── storeTypes.ts
                │   ├── hooks
                │   │   └── useRouter.tsx
                │   ├── main.tsx
                │   ├── pages
                │   │   ├── admin
                │   │   │   ├── Admin.tsx
                │   │   │   ├── AdminLogin.tsx
                │   │   │   ├── AdminMain.tsx
                │   │   │   └── index.ts
                │   │   ├── error
                │   │   │   ├── ErrorNotFound.tsx
                │   │   │   └── index.ts
                │   │   ├── home
                │   │   │   ├── Home.tsx
                │   │   │   ├── Test1.tsx
                │   │   │   └── index.ts
                │   │   ├── junior
                │   │   │   ├── Junior.tsx
                │   │   │   └── index.ts
                │   │   └── senior
                │   │       ├── Senior.tsx
                │   │       └── index.ts
                │   ├── router.tsx
                │   ├── store.tsx
                │   ├── utils
                │   │   ├── api.ts
                │   │   └── format.tsx
                │   └── vite-env.d.ts
                ├── tsconfig.json
                ├── tsconfig.node.json
                └── vite.config.ts
        ```
    - ARDUINO
        ```
        arduino
            └── UltraSonic
                └── UltraSonic.ino

        socket/socket-io-server
                ├── app.js
                ├── package-lock.json
                ├── package.json
                └── routes
                    └── index.js
        ```


### 협업 정보
---
#### <i>협업 툴</i>

    이슈 관리 : JIRA

    형상 관리 : GITLAB

    커뮤니케이션 : Notion, Mattermost

    디자인 : figma

---

#### <i>협업 환경</i>
- JIRA
    - 매 주 목표량을 설정하여 Sprint 진행
    - 업무 할당량을 정하여 Story Point 설정
- GITLAB
    - Git-flow전략을 통하여 효율적인 브랜치 관리
    - 코드 검토 및 피드백
- NOTION
    - 데일리 스크럼(일일 스탠드업 미팅) 기록
        - 매일 아침마다 현재 진행 상황과 그 날의 목표 공유
        - 어려움이나 문제점을 공유
        - 특이사항 및 변경사항 공유
    - 일일 회고 기록
        - 하루 동안의 완료한 작업 기록
    - 스프린트 세션 기록
        - 매 주 금요일 오후 5시에 일주일 간의 프로젝트 진행 상황 점검 및 피드백
        - 프로젝트 회고를 진행하며 팀의 성과와 개선점을 공유
    - 회의 기록
        - 회의가 있을 때마다 회의록을 기록하여 보관
    - 그라운드 룰 기록
        - 프로젝트 수칙, 생활 수칙, 마인드셋 수칙 기록
    - 컨벤션 기록
        - 코딩 컨벤션, 브랜치 컨벤션, 커밋 컨벤션, 지라 컨벤션 기록
    - 문서 관리
        - 기능 명세서, ERD, 스토리보드 등 모두가 공유해야하는 문서 관리
        

## 팀 소개
### 팀명의 의미
- 저희 팀명 돌핀은 ‘돌격! 핀테크’의 약자로 핀테크를 주제로 특화 프로젝트를 거침없이 진행하자는 의미를 담았습니다.
### 팀 로고
![돌핀소개](/uploads/524ad5e7f71066003d324bd998e6b64d/돌핀소개.PNG)

- 저희 프로젝트 팀의 로고는 돌고래(Dolphin)가 돈을 들고 있는 모습을 형상화하였습니다. 돈은 특화 프로젝트 주제인 핀테크(FinTech)를 의미하고, 돌고래는 저희 팀명인 ‘돌핀’을 상징하며, 누구나 다가가기 쉬운 귀여운 모습으로 접근성이 좋은 앱을 개발하자는 의미를 담았습니다.
### 팀원 정보
![서울_1반_A106](/uploads/cab52fb04e8e554481bbe1eab20344a9/서울_1반_A106.png)

## 팀 역할 분배

![백엔드_소개](/uploads/02ed51c023cc274dddcd8205ef534574/백엔드_소개.PNG)
- 정연수(BackEnd) : GPT API를 활용한 고객 요청 업무 분류, Google Cloud TTS API를 활용한 서비스 음성 구현, 서비스 데이터셋 구현 및 GPT 파인 튜닝 


![프론트소개](/uploads/a6b0736999f062f2f11611eda68ea8e3/프론트소개.PNG)

## 프로젝트 산출물

## 프로젝트 결과물

## OASYS 링크
- <i><b>OASYS</b></i> : 
https://j9a106.p.ssafy.io/
에서 확인할 수 있습니다.
    
    아래 [시연 영상](#oasys-시연-영상) 또는 [서비스 화면](#oasys-서비스-화면)에서 볼 수 있습니다.
- <i><b>Jenkins</b></i> : 
http://j9a106.p.ssafy.io:8088
에서 <admin> / <zxcv1234> 로 로그인 후에 젠킨스 웹사이트를 확인할 수 있습니다.

    ![jenkins_화면](/uploads/6ad984e82a90a32dd910a24332997db0/jenkins_화면.png)

- <i><b>Prometheus</b></i> : 
http://j9a106.p.ssafy.io:9090/targets?search=
에서 서버의 상태를 확인할 수 있습니다.

    ![prometheus_화면](/uploads/085d41d555ce2f6e642c871358927da9/prometheus_화면.png)

- <i><b>Grafana</b></i> : 
http://j9a106.p.ssafy.io:3000
에서 <admin> / <zxcv1234> 로 로그인 후에 서버의 상태를 확인할 수 있습니다.

    ![grafana_화면](/uploads/cbdb54300b1d477d1b0247206824c316/grafana_화면.png)

    


## OASYS 시연 영상

## OASYS 서비스 화면
- <i><b> 일반 사용자 얼굴 인식 시 제공되는 서비스 화면</b></i>
<img src="/uploads/8c189b45c254a06886062772f5414c01/junior_page.PNG"  width="500" height="370">


- <i><b> 어르신 얼굴 인식 시 제공되는 서비스 화면 (음성 인식)</b></i>
<img src="/uploads/662f558652ef8286d000999471be1546/senior_page.PNG"  width="600" height="370">


- <i><b> 고객 요청 사항 업무 분류 후 접수 처리 화면 및 전화번호 입력 화면</b></i>
<img src="/uploads/c502bba149ec5705d0cd36840c1b3c77/senior_page2.PNG"  width="600" height="370">

- <i><b> 전화번호 입력 후 최종 화면</b></i>
<img src="/uploads/67f952a95cb6ad07db52acbab50e7938/senior_page3.PNG"  width="500" height="370">


- <i><b> 창구 관리 화면</b></i>
<img src="/uploads/bf546467bb3242d02f462c40bf33217b/admin_page.PNG"  width="600" height="370">

