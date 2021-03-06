---
layout: post
title: 영속성 컨텍스트 에 대해서
subtitle: Spring JPA
categories: JPA
tags: [JPA, Spring, Persistence Context]
---

## Persistence Context 에 대해서

JPA가 제공하는 기능은 크게 엔티티와 데이터베이스 테이블을 매핑하는 설계 부분과 매핑한 엔티티를 실제 사용하는 부분으로 나눌 수 있다. 매핑한 엔티티는 EntityManager를 통해 사용되는데 
이 Entitymanager class 에 대해 공식 문서를 살펴보면 첫 문장에 다음과 같은 설명으로 시작된다.
> _**Interface used to interact with the persistence context.**_  
>  "영속성 컨텍스트와 상호작용 하는 데 사용되는 인터페이스"

즉, EntityManager 에 대해 알기 위해서는 영속성 컨텍스트에 대한 깊은 이해가 필요하다는 것을 알 수 있다.
이번 기회를 통해 영속성 컨텍스트에 대해 제대로 알고가자.
이 개념을 제대로 알고가야 나중에 Spring boot + Spring Data JPA + Hibernate 프레임워크를 구성해보는 데 어려움이 없을 것이다.

### 영속성 컨텍스트 란?

영속성 컨텍스트란 엔티티를 영구히 저장하는 환경으로 논리적인 개념이다. 애플리케이션과 데이터베이스 사이에서 객체를 보관하는 가상의 데이터베이스 같은 역할을 한다.
엔티티 매니저를 통해 엔티티를 저장하거나 조회하면 엔티티 매니저는 영속성 컨텍스트에 엔티티를 보관하고 관리한다.

Spring Data JPA를 사용하지 않는다고 가정했을 때 다음과 같은 표현으로 엔티티를 영속성 컨텍스트에 저장할 수 있다.

~~~java
Member member = new Member();
em.persist(member);
~~~

persist() 메소드는 엔티티 매니저를 사용해 member 엔티티를 영속성 컨텍스트에 저장한다는 의미이다. 지금은 단순한 코드로 영속성 컨텍스트에 엔티티를 저장했지만 Spring Data JPA를
사용하면 좀 더 추상화된 코드를 통해 저장할 수 있다.


이제 영속성 컨텍스트와 관련된 엔티티의 생명주기를 알아보자.

### 엔티티의 생명주기

엔티티의 생명주기를 나누면 다음과 같다.
- 비영속(new/transient) : 영속성 컨텍스트와 전혀 관계가 없는 상태
- 영속(managed) : 영속성 컨텍스트에 저장된 상태
- 준영속(detached) : 영속성 컨텍스트에 저장되었다가 분리된 상태
- 삭제(removed) : 삭제된 상태

![jpa_entityLifeCycle](/assets/images/etc/jpa_entityLifeCycle.png)

#### 비영속

엔테테 객체를 생성했지만 아직 영속성 컨텍스트에 저장하지 않은 상태를 비영속 상태라 한다.
~~~java
Member member = new Member();
~~~

#### 영속

EntityManager 를 통해서 엔티티를 영속성 컨텍스트에 저장한 상태를 말하며 영속성 컨텍스트에 의해 관리된다는 뜻이다.
~~~java
em.persiste(member);
~~~

#### 준영속

영속성 컨텍스트가 관리하던 영속 상태의 엔티티가 더 이상 관리되지 않으면 준영속 상태가 된다. 특정 엔티티를 준영속 상태로 만들려면 `em.detach()` 를 호출하면 된다.

#### 삭제

엔티티를 영속성 컨텍스트와 데이터베이스에서 삭제한다.

---

### 영속성 컨텍스트 특징과 장점

영속성 컨텍스트의 특징으로는 다음과 같다.

- 영속성 컨텍스트는 엔티티를 식별자 값으로 구분한다. 따라서 영속 상태는 식별자 값이 반드시 있어야 한다.
- JPA는 보통 트랜잭션을 커밋하는 순간 영속성 컨텍스트에 새로 저장된 엔티티를 데이터베이스에 반영하는 데 이를 `flush` 라 한다.

영속성 컨텍스트의 장점으로는 다음과 같다.

- 1차 캐시
- 동일성 보장
- 트랜잭션을 지원하는 쓰기 지연
- 변경 감지
- 지연 로딩

#### 1차 캐시

영속성 컨텍스트 내부에는 캐시가 있는데 이를 1차 캐시라 한다. 영속 상태의 엔티티를 이곳에 저장한다. 1차 캐시의 키는 식별자 값(데이터베이스의 기본 키) 이고 값은 엔티티 인스턴스이다.

엔티티를 호출했을 때 1차캐시 관련 동작은 다음과 같다.

1. 1차 캐시에서 엔티티를 찾는다.
2. 있으면 메모리에 있는 1차 캐시에서 엔티티를 조회한다.
3. 없으면 데이터베이스에서 조회한다.
4. 조회한 데이터로 엔티티를 생성해 1차 캐시에 저장한다. (엔티티를 영속상태로 만든다.)
5. 조회한 엔티티를 반환한다.


#### 영속 엔티티의 동일성 보장

영속성 컨텍스트는 엔티티의 동일성을 보장한다. 실제 인스턴스가 같아 `==` 을 사용해 비교할 수 있다.


#### 트랜잭션을 지원하는 쓰기 지연

EntityManager를 사용해 member를 저장해도 바로 Insert SQL이 DB에 보내지는 것이 아니다. EntityManager는 트랜잭션을 커밋하기 직전까지 내부 쿼리 저장소에 Insert SQL을 모아둔다.
그리고 트랜잭션을 커밋할 때 모아둔 쿼리를 DB에 보낸다.

#### 변경 감지

JPA로 엔티티를 수정할 때는 단순히 엔티티를 조회해서 데이터를 변경하면 된다.

엔티티를 변경할 때 관련 동작은 다음과 같다.

1. 트랜잭션을 커밋하면 엔티티 매니저가 내부에서 먼저 플러시가 호출된다.
2. 엔티티와 스냅샷을 비교하여 변경된 엔티티를 찾는다.
3. 변경된 엔티티가 있으면 수정 쿼리를 생성하여 쓰기 지연 SQL 저장소에 저장한다.
4. 쓰기 지연 저장소의 SQL을 플러시한다.
5. 데이터베이스 트랜잭션을 커밋한다.

변경 감지는 영속성 컨텍스트가 관리하는 영속 상태의 엔티티만 적용된다.


---
### flush

플러시는 영속성 컨택스트의 변경 내용을 데이터베이스에 반영한다. 영속성 컨텍스트의 엔티티를 지우는 게 아니라 변경 내용을 데이터베이스에 동기화하는 것이다.

다음은 플러시가 동작되는 흐름이다.
1. 변경 감지가 동작해서 스냅샷과 비교해 수정된 엔티티를 찾는다.
2. 수정된 엔티티에 대해서 수정 쿼리를 만들어 SQL 저장소에 등록한다.
3. 쓰기 지연 SQL 저장소의 쿼리를 데이터베이스에 전송한다.


다음은 플러시가 실행되는 순간이다.
1. EntityManager 메소드 flsut() 호출
2. 트랜잭션 커밋 시 자동 호출
3. JPQL 쿼리 실행 시 자동 호출


