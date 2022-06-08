---
layout: post
title: Leetcode[2] Add Two Numbers
subtitle: 리트코드 문제풀이
categories: Algorithm_solve
tags: [Leetcode, Algorithm]
---

## LeetCode Add Two Numbers - 2번

문제에 숫자가 역순으로 저장되어 계산하고, 결과값도 역순으로 저장되어 출력된다.
즉, 두 노드의 순서만 맞추어 덧셈을 하면 쉽게 해결할 수 있다는 얘기이다.
나는 sum 변수를 활용하여 덧셈 시 10의 자리가 넘어가는 값을 다음 노드로 넘겨주었다.


~~~java
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        // example code


    }

    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode node = new ListNode(0);
        ListNode result = node;

        int sum = 0;
        while (l1 != null || l2 != null || sum > 0) {
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            node.next = new ListNode(sum % 10);
            sum /= 10;
            node = node.next;

        }
        return result.next;

    }
}

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) {this.val = val;}
    ListNode(int val, ListNode next) {this.val = val; this.next = next;}
}
~~~