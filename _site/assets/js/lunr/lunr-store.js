var store = [{
        "title": "[Spring Security] Spring Security 란 ?",
        "excerpt":"Spring Security 란 ? Spring Security 란 Spring 기반의 애플리케이션 보안(인증과 권한, 인가 등) 을 담당해 관련 설정을 쉽게 할 수 있게 도와주는 스프링의 하위 프레임워크이다. Spring Security 는 ‘인증’ 과 ‘권한’ 에 대한 부분을 “Filter“의 흐름 에 따라 처리하고 있다. 인증(Authentication): 해당 사용자가 본인이 맞는지를 확인하는 절차 인가(Authorization): 인증된...","categories": ["Spring Security"],
        "tags": ["Spring Security"],
        "url": "/spring%20security/ch0/",
        "teaser": null
      },{
        "title": "[JVM] JVM 총정리 - 클래스 로더(1)",
        "excerpt":"JVM 은 사용자 컴퓨터 운영체제에 맞는 JRE 에 포함되어 있는 소프트웨어로, 바이트 코드로 변환된 자바 코드를 실행시켜주는 역할을 한다. 또한 자바 프로그램을 실행함에 있어 .class 파일에 대한 유효성 검사와 메모리 관리, GC 등의 작업을 수행하기 때문에 매우 중요한 소프트웨어라고 할 수 있다. 먼저 JVM 내부 구조를 살펴보자. 1. JVM 내부구조...","categories": ["JVM"],
        "tags": ["Java","JVM"],
        "url": "/jvm/ch0/",
        "teaser": null
      },{
        "title": "[JVM] JVM 총정리 - 런타임 영역(2)",
        "excerpt":"런타임 영역 은 JVM 이 런타임 환경에서 자바 프로그램을 수행할 때 OS 로부터 할당받는 메모리 영역이다. 이 메모리 영역은 논리적으로 다음과 같이 5가지 영역으로 구분한다. Method Area Heap Area PC Register Native Method Stack JVM Stack Method Area Method Area 는 JVM 벤더마다 다르게 구현되어 있다. 그러나 거의 모든 운영체제에서는...","categories": ["JVM"],
        "tags": ["Java","JVM"],
        "url": "/jvm/ch1/",
        "teaser": null
      },{
        "title": "[JVM] JVM 총정리 - 실행 엔진(3)",
        "excerpt":"실행 엔진은 Runtime Data Area 에 적재된 바이트코드들을 실행하고 사용되지 않는 데이터들을 제거하는 역할을 하며 세 가지 장치로 구분된다. 인터프리터(Interpreter) JIT Compiler Garbage Collector 인터프리터(Interpreter) JVM 인터프리터는 런타임 환경에서 바이트코드를 한 라인씩 읽고 Native Code 로 변환하는 작업을 수행한다. 한 줄씩 기계어로 번역하는 만큼 번역속도는 빠르지만 전체 실행속도는 느리다. 또한...","categories": ["JVM"],
        "tags": ["Java","JVM"],
        "url": "/jvm/ch2/",
        "teaser": null
      },{
        "title": "[Java] 리플렉션(Reflection) 알아보기",
        "excerpt":"리플렉션(Reflection) 이란 ? 리플렉션 은 구체적인 클래스 타입을 알지 못하더라도 그 클래스의 메서드, 타입, 변수들에 접근할 수 있도록 도와주는 자바 API를 말한다. 이 프로그래밍 기법은 런타임 시점에 동적으로 특정 클래스의 정보를 추출할 수 있게 도와줘 프로그램에 유연성을 더해준다. 다만, 런타임 시점에 인스턴스를 생성하기 때문에 구체적인 동작 흐름을 파악하기 어려울 수...","categories": ["Reflection"],
        "tags": ["Java","Reflection"],
        "url": "/reflection/ch0/",
        "teaser": null
      },{
        "title": "[Spring Security] Spring Security + JWT 구현",
        "excerpt":"개인 프로젝트 진행을 위해 세팅한 환경 일부를 기록한 글이다. JWT(JSON Web Token) 란 ? JWT 란 JSON 객체를 사용해서 토큰 자체에 정보를 저장하는 Web Token 이다. Header, Payload, Signature 3 개의 부분으로 구성되어 있으며, 쿠키나 세션을 이용한 인증보다 안전하고 효율적이다. 다만, 서버에서 관리하지 않다보니 탈취당한 경우 대처가 어려운 단점이 존재한다....","categories": ["Spring Security"],
        "tags": ["Spring Security"],
        "url": "/spring%20security/ch1/",
        "teaser": null
      }]
