---
layout: post
title: Leetcode[3] Longest Substring Without Repeating Characters
subtitle: 리트코드 문제풀이
categories: Algorithm_solve
tags: [Leetcode, Algorithm]
---

## LeetCode Longest Substring Without Repeating Characters - 3번

### 문제 이해
1. 같은 문자가 2번 이상 나오면 안된다.
2. 연속된 문자열만 카운팅 해야한다.

처음에 변수 2개를 선언하고 for문을 돌려 maxLength를 카운팅 했으나 연속된 문자열을 카운팅하지 못하는 경우의 수가 발생하여 while문으로 선회하여 해결하였다.

또한 주어진 String s 값이 "" 값일 경우 예외처리도 해줘야 한다.

~~~ java
import java.io.IOException;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) throws IOException {

        String s = "";

        System.out.println(lengthOfLongestSubstring(s));
    }

    public static int lengthOfLongestSubstring(String s) {
        HashSet<String> set = new HashSet<>();
        String[] arrStr = s.split("");
        int maxLength = 0;
        int savIdx = 0, delIdx = 0;

        while (savIdx < arrStr.length) {
            if (delIdx > savIdx || arrStr[savIdx].equals("")) {
                break;
            }

            if (!set.contains(arrStr[savIdx])) {
                set.add(arrStr[savIdx++]);
                maxLength = Math.max(maxLength, savIdx - delIdx);
                continue;
            }
            set.remove(arrStr[delIdx++]);
        }

        return maxLength;
    }
}
~~~

