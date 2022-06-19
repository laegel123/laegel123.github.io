---
layout: post
title: JPA 에 대한 소개
subtitle: JPA 란?
categories: JPA
tags: [JPA, Spring]
---

## Spring JPA 란?

JPA 관련 서적을 읽을 때는 분명 EntityManager를 통해 entity CRUD 를 했는데, 
실제 현업에 들어가 보니 EntityManager는 찾아볼 수 없고 Repository 인터페이스만 쓰이고 있어 개념이 모호해 정리글을 쓴다.

JPA, Hibernate, 그리고 Spring Data JPA(Repository)의 차이점에 대해 알아보자.

--- 

### JPA 자체는 구현체가 아닌 기술 명세이다.

JPA는 Java Persistence API의 약자로, 자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스이다.  
여기서 중요한 점은 JPA는 말 그대로 '인터페이스' 로 특정 기능을 하는 라이브러리가 아니다.  
다시 말해서 JPA는 관계형 데이터베이스를 어떻게 사용해야 하는지를 정의하는 한 방법일 뿐이다.

JPA는 단순히 명세이기 때문에 구현이 없다. 

즉, 우리가 JPA를 사용한다고 하면 javax.persistence 패키지를 직접 다운로드 받아 jar 형태로 사용하거나 maven, gradle 등을 사용하여 실행하는데
이 패키지의 대부분은 interface, enum, Exception, 그리고 각종 Annotation으로 이루어져 있는 인터페이스라는 것이다.  

예를 들어, JPA의 핵심이 되는 EntityManager는 javax.persistence.EntityManager 라는 파일에 interface로 정의되어 있다.

우리는 이것을 사용하기 위해 직접 구현하거나 Hibernate, EclipseLink 등 구현체를 이용하여 실행한다.


### Hibernate 는 JPA의 구현체이다.

Hibernate는 JPA라는 명세의 구현체이다. 즉, 위에서 언급한 javax.persistence.EntityManager와 같은 인터페이스를 직접 구현한 라이브러리이다. 
JPA와 Hibernate는 마치 자바의 interface와 해당 interface를 구현한 class와 같은 관계이다.


### Spring Data JPA는 JPA를 쓰기 편하게 만들어놓은 모듈이다

나는 여태껏 현업에서 JPA를 활용한 프로젝트를 하면서 EntityManager를 직접 다뤄본 적이 없다.  
DB에 접근할 필요가 있는 대부분의 상황에서는 EntityManager 및 트랜잭션을 직접 사용하는 것이 아닌 Repository를 정의하여 사용했다.  
이 Repository가 바로 Spring Data JPA의 핵심이다.

Spring Data JPA는 Spring 에서 제공하는 모듈 중 하나로, 개발자가 JPA를 더 쉽고 편하게 사용할 수 있도록 도와준다.  
이는 JPA를 한 단계 추상화시킨 Repository라는 인터페이스를 제공함으로써 이루어진다. 
사용자가 Repository 인터페이스에 정해진 규칙대로 메소드를 입력하면, Spring이 알아서 해당 메소드 이름에 적합한 쿼리를 날리는 구현체를 만들어서 Bean으로 등록해준다.


Spring Data JPA가 JPA를 추상화했다는 말은, Spring Data JPA의 Repository의 구현에서 JPA를 사용하고 있다는 것이다. 
예를 들어, Repository 인터페이스의 기본 구현체인 SimpleJpaRepository의 코드를 보면 아래와 같이 내부적으로 EntityManager을 사용하고 있는 것을 볼 수 있다.


~~~ java
package org.springframework.data.jpa.repository.support;

import ...

public class SimpleJpaRepository<T, ID> implements JpaRepositoryImplementation<T, ID> {

    private final EntityManager em;

    public Optional<T> findById(ID id) {

        Assert.notNull(id, ID_MUST_NOT_BE_NULL);

        Class<T> domainType = getDomainClass();

        if (metadata == null) {
            return Optional.ofNullable(em.find(domainType, id));
        }

        LockModeType type = metadata.getLockModeType();

        Map<String, Object> hints = getQueryHints().withFetchGraphs(em).asMap();

        return Optional.ofNullable(type == null ? em.find(domainType, id, hints) : em.find(domainType, id, type, hints));
    }

    ...
}
~~~

정리하자면, 현업에서 내가 사용했던 환경은 JPA 구현체들을 좀 더 쉽게 사용할 수 있도록(ex. 데이터 접근의 추상화) Spring Data 프로젝트 중 하나인 Spring Data JPA 를 사용한 것이고  
JPA 구현체를 추가로 필요로 해 Hibernate를 사용한 것이다.  

아래 그림은 위의 내용을 요약하여 JPA, Hibernate, 그리고 Spring Data JPA의 전반적인 개념을 그림으로 표현한 이미지다.
![jpa_introduce](/assets/images/etc/jpa_introduce.png)

---

## JPA 클래스 수준 아키텍처 (javax.persistence)

아래의 이미지는 JPA의 클래스 레벨 아키텍처이다.  
여기서 중요한 클래스 밑 인터페이스, 개념만 집어서 살펴보자.


> 참고) javax.persistence 에 대한 더 많은 정보  
> [https://docs.oracle.com/javaee/7/api/javax/persistence/package-summary.html](https://docs.oracle.com/javaee/7/api/javax/persistence/package-summary.html)

![jpaClassArchitecture](/assets/images/etc/jpaClassArchitecture.png)

1. EntityManagerFactory
   - EntityManager 클래스의 팩토리 클래스이다. 이 클래스로 EntityManager 클래스의 인스턴스를 생성하고 관리할 수 있다.
   - 같은 EntityManagerFactory를 통해 생성되는 EntityManager 들은 같은 데이터베이스에 접속한다.
   - 한 번 생성한 후 어플리케이션 전체에 공유되며, thread safe 한 성질을 가진다.
2. EntityManager
   - 여러 Entity들을 관리하는 역할을 한다.
   - EntityManager는 자신이 관리해야하는 Entity 객체들을 영속 컨텍스트(Persistence Context)에 넣어 객체들의 LifeCycle을 관리한다.
   - 또한 thread safe 하지 않기 때문에 여러 스레드가 동시에 접근하면 동시성 문제가 발생한다.
3. Entity
   - 데이터베이스 상에서 데이터로 관리하는 대상을 의미한다.  
     JPA에서 하나의 Entity 타입을 생성한다는 것은 하나의 클래스를 작성하는 것을 의미한다.
4. EntityTransaction
   - EntityManager와 일대일 관계이다. 각각의 EntityManager들의 작업은 EntityTransaction 클래스에 의해 유지된다.
5. Persistence
   - EntityManagerFactory 를 가져오는 데 사용되는 부트스트랩 클래스이다.
6. Query
   - 인터페이스로서 각각의 JPA 벤더에 의해 구현되며 각 기준에 충족하는 관계형 객체를 얻는다.

> 영속 컨텍스트 (Persistence Context) 란?  
> JPA가 Entity 객체들을 모아두는 공간이다.  
> Entity를 영구 저장할 수 있는 환경이며 논리적인 개념이다.  
> EntityManager는 Entity를 저장하거나 조회할 때 Persistence Context에 Entity를 보관하고 관리한다.

---

## JPA 장단점

이제 JPA가 어떤 의미인지 알았다면, 장단점도 비교하며 알아보자.

### **JPA의 장점** 으로는
1. SQL위주의 기존 Mybatis 프로젝트와 비교하여 CRUD 쿼리를 일일이 작성할 필요가 없어 코드량이 줄어든다.
2. 객체 중심으로 코드가 작성되니 가독성이 좋고, 여러 가지 요구사항으로 기능수정이 발생하더라도 좀 더 간편하게 수정이 가능하다.  
   -> 유지보수 및 리팩토링에 유리하다는 엄청난 강점이 있다.
3. DB 벤더에 따라 조금씩 다른 SQL 문법 때문에 애플리케이션이 DB에 종속될 수밖에 없었는데, JPA는 직접 쿼리를 작성하는 것이 아니어서 DB 벤더에 독립적으로 개발이 가능하다.

### **JPA의 단점** 으로는
1. 프로젝트의 규모가 크고 복잡한데 설계가 잘못된 경우, 속도 저하 및 일관성을 무너뜨려 문제가 발생할 수 있다.
   -> 초기 설계가 매우 중요하다.
2. 복잡하고 무거운 Query는 속도를 위해 별도의 튜닝이 필요한 경우도 있어 결국 SQL을 써야할 때도 있다.
3. 학습비용이 비싸다.


> 이렇듯 장점도 많은 JPA를 잘 사용하기 위해서는 JPA에 대해 확실한 학습이 되어있고 프로젝트에 들어갔을 때 초기 설계(db 테이블과 객체간의 매핑 등)를 신경써야 한다는 것을 알 수 있다.


---




