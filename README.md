# Frontend

## 실행 커멘드

1. npm i ⇒ repo 설치
2. npm run serve ⇒ 개발용 라이브 페이지

## 기술 스택

1. JavaScript
2. Vue.js
3. Socket.io
4. Peer.js

## 화면정의서

![스크린샷 2023-05-31 오후 2.55.55.png](Frontend%20266d588701c04ded9ee46ce199a61cd3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-05-31_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.55.55.png)

![스크린샷 2023-05-31 오후 2.56.08.png](Frontend%20266d588701c04ded9ee46ce199a61cd3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-05-31_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.56.08.png)

![IMG_1203.jpeg](Frontend%20266d588701c04ded9ee46ce199a61cd3/IMG_1203.jpeg)

## 기본 설계

1. Vue.js를 통해 각 Page별 component 제작
2. 각 Page를 router를 통해 유기적인 웹 페이지로 구성
3. vuex의 store를 통해 로그인 정보를 저장
4. socket.io의 state를 통해 채팅방의 채널 정보와 메세지 정보를 저장
5. axios를 통해 HTTPS Request 전송 및 Respons 수신
6. Peer.js를 통해 영상 회의와 음성 회의는 P2P 통신으로 구현

## 라우터 구성

<aside>
💡 {  path: '/',  name: 'login,',  component: ***LoginPage***},

{  path: '/find',  name: 'find,',  component: ***PwFind***},

{  path: '/create',  name: 'SignUp',  component: ***SignUp***},

{  path: '/main',  name: 'main',  component: ***MainPage***},

{  path: '/chat',  name: 'chat',  component: ***ChatPage***}

</aside>

## 각 페이지 별 구성

### LoginPage

**역할: 웹페이지의 첫 페이지이자 로그인을 위한 화면**

![Untitled](Frontend%20266d588701c04ded9ee46ce199a61cd3/Untitled.png)

> <header/>
<main/>
<nav/>
> 

### <header>

- 상단의 로그인 글씨를 위한 공간

### <main>

- 중앙의 로그인을 위한 id 입력창, pw 입력창, 체크 img, 그리고 로그인 버튼을 위한 공간
- id의 길이가 4이상, pw의 길이가 6이상일 때에만 체크 이미지 표시
- id의 type은 `text`, pw의 type은 `password`로 설정하여 id는 보이게, pw는 보이지않게 설정
- pw의 `input` 에 `@keyup.enter` 이벤트를 추가하여 엔터키를 누를 때 로그인 함수 호출
- 로그인 버튼에 `@click` 이벤트를 추가하여 클릭할 때 로그인 함수 호출

### <nav>

- 회원가입 Page인 `SignUp` 페이지로 이동시켜 주는 router-link
- 비밀번호 찾기 Page인 `PwFind` 페이지로 이동시켜주는 router-link

### Script

- `login()` : serverURL을 불러와서 `axios.get()`를 통해 HTTP Requset를 `serverURL+’/login’` 에 보내 Response에 따라 실패한다면 `alert` 발생, 성공한다면 해당 정보를 웹에 저장하고 ***`router***.push("/main")` 으로 `MainPage`로 진입
- `connect()` : serverURL을 불러와서 socket.io를 통해 Socket 연결, `console.log()`

### PwFind

**역할: ID의 PW를 찾기 위한 페이지**

![Untitled](Frontend%20266d588701c04ded9ee46ce199a61cd3/Untitled%201.png)

> <div id=find>
> 

### <div id=find>

- 아이디 찾기를 위한 id 입력창, 찾기 버튼을 위한 공간
- id의 `input` 에 `@keyup.enter` 이벤트를 추가하여 엔터키를 누를 때 pw 찾기 함수 호출
- 찾기 버튼에 `@click` 이벤트를 추가하여 클릭할 때 pw 찾기 함수 호출
- `alert` 통해 해당 아이디가 존재하지 않음과 입력한 아이디의 비밀번호를 표시
- `router.push(’/’)` 를 통해 로그인 페이지로 이동

### Script

- `find()`: `axios.get()` 을 통해 HTTP Requset를 `serverURL+’/login/find’` 에 보내 Response에 따라 `alert` 발생 후 `LoginPage`로 진입

### SignUp

**역할: 회원가입을 위한 화면**

![스크린샷 2023-06-08 오전 12.15.18.png](Frontend%20266d588701c04ded9ee46ce199a61cd3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-06-08_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.15.18.png)

### Script

- `create()` : id 길이 4 이상, pw 길이 6 이상, 닉네임 길이 3 이상 이라면 `axios.post()` 를 통해 HTTP Requset를 `serverURL+’/login/create’` 에 보내 Response의 `state`에 따라 `alert` 발생 후 `LoginPage`로 진입

### MainPage

![Untitled](Frontend%20266d588701c04ded9ee46ce199a61cd3/Untitled%202.png)

> <div id="upperbar/>
<div class=”channellist/>
<div class=”channellist v-for=”item in this.getChannelInfo”/>
<ChannelCreateModal/>
<ChannelJoinModal/>
> 

### <upperbar>

- 사용자의 정보와 테스트 방 생성 및 참가, Logout 버튼을 위한 공간

### <channellist>

- 채널리스트의 최상단 줄을 위한 공간
- 방 번호, 채널 이름, 방 생성 버튼 배치
- 방 생성 버튼 클릭시 ChannelCreateModal 창 호출

### <channellist v-for>

- 채팅방의 리스트를 동적 생성하기 위한 공간
- v-for를 통해 서버에서 받아온 채팅방 리스트에 대해서 객체를 생성
- 해당 칸을 클릭하면 clickEvent 함수 호출

### <ChannelCreateModal>

- 채널 생성을 위한 정보를 입력하기 위한 팝업창
- 채널 이름, 잠금 여부, 비밀번호를 입력
- 팝업창 외부를 클릭하면 closeCreateModal 함수 호출
- 채널 정보를 입력하고 Enter키를 치거나 버튼을 클릭하면 CreateChannel 호출

### <ChannelJoinModal>

- 채널 입장을 위해 비밀번호를 입력하기 위한 팝업창
- 채널이 잠겨있을 경우 clickEvent에 의해서 호출
- 비밀 번호를 입력하고 Enter키를 치거나 버튼을 클릭하면 JoinChannel 호출

### Script

- `async logout()` : 웹페이지에 저장된 사용자 정보를 초기화하고 LoginPage로 `router.push(”/”)` 를 통해 이동
- `async clickEvent(item)` : 해당 페이지에서 자동으로 새로고침하는 `refresh` 를 제거하고 클릭한 채널이 잠겨 있는 경우 `this.onJoinModal=true` 로 하여 `ChannelJoinModal` 팝업창을 호출한다.
- `openCreateModal()` : `this.onCreateModal= true` 로 하여 `ChannelCreateModal` 팝업창을 호출한다.

### ChatPage

![스크린샷 2023-06-12 오후 4.24.38.png](Frontend%20266d588701c04ded9ee46ce199a61cd3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-06-12_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.24.38.png)

> <div class="video-chat-remote-list">
    <div id="video-chat-remote-users" v-for="user in this.getUserList"/>
</div>
<div class="video-chat-local">
<div class="chat">
> 
> 
> <button @click="switchVideoCall">비디오 On/Off</button>
> <button @click="startVideoCall">화상/음성 채팅 시작</button>
> 

### <video-chat-remote-list>

- 해당 채팅방의 사용자들의 닉네임과 화상채팅창을 표현하는 창
- 각 채팅방 참가자들의 닉네임을 `video` 태그의 id로 삼아 `MideaStream` 재생
- 하단에 닉네임을 `label` 태그를 만들어 삽입

### <video-chat-local>

- 사용자의 비디오인 `localvideo` 를 재생하는 창
- `stream` 이벤트 혹은 `startStream` 함수에서 `getUserMedia` 를 통해 받아온 `MediaStream` 을 재생한다.

### <chat>

- 해당 채팅방의 채팅을 표현하는 창
- `input` 을 통해 메세지를 입력받아 `sendMessage` 함수를 통해 Socket.io로 채팅방 서버에 전송한다.

### <button>

- 화상 채팅할 때, video를 키거나 끄는 `switchVideoCall` 함수를 호출한다.
- 화상 채팅 혹은 음성채팅을 시작하는 `startVideoCall` 함수를 호출한다.

### Script

- `sendMessage(msg)` : 해당 메세지를 `socket.js`에 있는 `sendMessageToServer()` 를 호출하고 `this.newMessage`를 초기화 한다.
- `switchVideoCall()` : `socket.js`의 `constraints.video` 를 toggle하며 `alert`를 통해 video의 상태를 표현한다.
- `startVideoCall()` : `endStream()`을 통해 기존 영상이 송출중이라면 이를 종료하고 `socket.js`의 `startStream()` 을 통해 영상통화를 시작한다.

### 이슈 발생

- **화상 채팅 도중 음성 채팅 혹은 음성 채팅 도중 화상채팅 전환이 잘 안되거나 참가자의 영상 표출 제한**
    - ChatPage.vue의 Script 부분 `switchVideoCall()` , `switchAudioCall()` 의 수정이 필요
    - ⇒ `switchVideoCall()` 을 통해 영상 혹은 음성을 선택하도록 하며 `startVideoCall()` 을 분리하여 화상 채팅 시작 기능을 별도로 구현한다.
    - 화상채팅 수신시 `confirm()` 을 통해 화상채팅에 참가할 것인지 물어본다.
    - 테스트 당시 동시 3명까지 되는 것을 확인

## 참고 문헌

1. [https://velog.io/@jsb100800/개발-WebRTC-SpringBoot-Vue.js를-활용한-Group-Video-Call-2-구현](https://velog.io/@jsb100800/%EA%B0%9C%EB%B0%9C-WebRTC-SpringBoot-Vue.js%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Group-Video-Call-2-%EA%B5%AC%ED%98%84)
2. [https://fomaios.tistory.com/entry/Nodejs-실시간-채팅앱-만들어보기-1-Websocket-이용하여-백엔드-구현하기-feat-Websocket-Build-a-real-time-chatapp-1-Implement-backend-with-websocket](https://fomaios.tistory.com/entry/Nodejs-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85%EC%95%B1-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0-1-Websocket-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat-Websocket-Build-a-real-time-chatapp-1-Implement-backend-with-websocket)