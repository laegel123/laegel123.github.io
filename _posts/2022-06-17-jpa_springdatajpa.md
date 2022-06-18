---
layout: post
title: Spring Data JPA 란?
subtitle: Spring Data JPA
categories: JPA, Spring Data JPA
tags: [JPA, Spring]
---

## Spring Data JPA 란?

Spring Data JPA는 Spring Framework 에서 Spring Data 프로젝트 중 하나로 JPA를 편리하게 사용할 수 있도록 지원하는 프로젝트이다.
공식 문서에 방문해 보면 Spring Data JPA 뿐만 아니라 Spring Data에 대한 다른 프로젝트도 있는 것을 확인할 수 있다.
([https://spring.io/projects/spring-data-jpa#overview](https://spring.io/projects/spring-data-jpa#overview))

Spring Data JPA 가 지원하는 기능들을 보면 다음과 같다.

1. CRUD 처리를 위한 공통 인터페이스 제공
2. repository 개발 시 인터페이스만 작성하면 실행 시점에 스프링 데이터 JPA가 구현 객체를 동적으로 생성해서 주입
3. 데이터 접근 계층을 개발할 때 구현 클래스 없이 인터페이스만 작성해도 개발을 완료할 수 있도록 지원

참고로 공통 메소드는 Spring Data JPA가 제공하는
[https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html)
에서 찾아볼 수 있다.

