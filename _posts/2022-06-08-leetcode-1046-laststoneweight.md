---
layout: post
title: Leetcode[1046] Last Stone Weight
subtitle: 그리디 문제풀이
categories: Algorithm_solve
tags: [Greedy, Algorithm]
---

## LeetCode Last Stone Weight - 1046번

이 문제를 풀기 위해서 stack 자료구조를 사용해 풀었으나, 알고리즘이 너무 무거워지는 감이 있어 다른 자료구조를 찾아보았다.  
검색해보니 우선순위 큐(Priority Queue) 라는 자료구조 발견.  
해당 자료구조는 Queue와 달리 먼저 들어온 순서대로 데이터가 나가는 것이 아닌 우선순위를 결정하고 그 우선순위가 높은 데이터가 먼저 나가는 자료구조이다.
(https://coding-factory.tistory.com/603)
=> 내부 구조가 Heap으로 되어있기 때문에 시간 복잡도는 O(NlogN) 이다.

알고리즘 자체는 단순하므로 패스.


~~~java
import java.io.IOException;
import java.util.Collections;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) throws IOException {
        int[] example = new int[]{2, 7, 4, 1, 8, 1};
        Solution.lastStoneWeight(example);

    }
}

class Solution {
    public static int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>(Collections.reverseOrder());
        for (int i : stones) {
            priorityQueue.add(i);
        }

        while (priorityQueue.size() > 1) {
            int x = priorityQueue.poll();
            int y = priorityQueue.poll();

            if (x - y > 0) {
                priorityQueue.add(x - y);
            }
        }


        return priorityQueue.isEmpty() ? 0 : priorityQueue.poll();
    }
}
~~~